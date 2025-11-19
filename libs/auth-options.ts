import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { me } from "@/actions/users/me";
import { login } from "@/app/(application)/api/auth/login";

// Função auxiliar para integrar com a API existente
async function loginWithSocialProvider(email: string, name: string) {
  try {
    // Usar o endpoint de login existente com os dados do Google
    const loginData = await login({
      email,
      provider: 'google',
      provider_data: {
        name
      }
    });

    if (!loginData?.access_token) {
      throw new Error('Token não retornado pela API');
    }

    // Buscar dados do usuário com o token
    const userData = await me(loginData.access_token);

    if (!userData?.data) {
      throw new Error('Dados do usuário não encontrados');
    }

    return {
      ...userData.data,
      access_token: loginData.access_token
    };
  } catch (error) {
    console.error('Erro ao autenticar:', error);
    throw error;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials) return null;
        try {
          const loginData = await login(credentials);
          const token = loginData.access_token;
          if (!token) {
            console.error("Não foi possível realizar o login:", loginData);
            return null;
          }

          const user = await me(token);

          return {
            id: user.data?.id,
            userName: user.data?.userName,
            mobileNumber: user.data?.mobileNumber,
            email: user.data?.email,
            access_token: token,
          };
        } catch (error) {
          console.error("Erro na autorização:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === 'google' && profile) {
          // Usar o email e nome do Google para autenticar
          const userData = await loginWithSocialProvider(
            profile.email as string,
            profile.name as string
          );

          // Atualizar o objeto user com os dados da nossa API
          user.id = userData.id;
          user.email = userData.email;
          user.userName = userData.userName;
          user.mobileNumber = userData.mobileNumber;
          user.access_token = userData.access_token;

          return true;
        }
        return true;
      } catch (error) {
        console.error("Erro no signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.userName || user.name;
        token.mobileNumber = user.mobileNumber;
        token.email = user.email;
        token.access_token = user.access_token;
        token.plan = user.plan;
        token.subscription = user.subscription;
      }

      // Atualizar dados do usuário a cada requisição para garantir informações atualizadas
      if (token.access_token && token.id) {
        try {
          const userData = await me(token.access_token as string);

          // Verificar se houve erro (incluindo TOKEN_EXPIRED)
          if (!userData.success) {
            console.error("Erro ao atualizar dados do usuário no JWT:", userData.error);

            // Se o token expirou, limpar o token para forçar logout
            if (userData.error?.status === 401) {
              console.log("Token expirado, limpando dados da sessão...");
              // Limpar dados sensíveis do token para forçar logout
              token.access_token = '';
              token.id = '';
              token.email = '';
              token.name = '';
              token.mobileNumber = '';
              token.plan = undefined;
              token.subscription = undefined;
              // Marcar como expirado para o hook detectar
              token.expired = true;
            }
            // Manter os dados existentes em caso de outros erros
          } else if (userData.data) {
            // Atualizar dados se sucesso
            token.plan = userData.data.plan;
            token.subscription = userData.data.subscription;
            token.name = userData.data.userName;
            token.email = userData.data.email;
            token.mobileNumber = userData.data.mobileNumber;
          }
        } catch (error: any) {
          console.error("Erro inesperado ao atualizar dados do usuário no JWT:", error);
          // Manter os dados existentes em caso de erros inesperados
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = String(token.id || '');
      session.user.userName = String(token.name || '');
      session.user.mobileNumber = String(token.mobileNumber || '');
      session.user.email = String(token.email || '');
      session.user.access_token = String(token.access_token || '');
      session.user.plan = token.plan;
      session.user.subscription = token.subscription;
      // Passar flag de expiração para a sessão
      (session as any).expired = token.expired;
      return session;
    },
  },
  pages: {
    signIn: '/entrar',
    error: '/entrar',
  },
  debug: process.env.NODE_ENV === 'development',
};
