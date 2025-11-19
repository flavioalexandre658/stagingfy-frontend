import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Verificar se é uma rota protegida que precisa de plano
    const protectedRoutes = [
        '/agents',
        '/dashboard',
        '/knowledge-sources',
        '/settings'
    ];

    // Verificar se a rota atual precisa de validação de plano
    const needsPlanValidation = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Se não é uma rota protegida, continuar normalmente
    if (!needsPlanValidation) {
        return NextResponse.next();
    }

    // Verificar se o usuário está autenticado
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });
    // Se não está autenticado, redirecionar para login
    if (!token?.sub) {
        const loginUrl = new URL('/entrar', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Verificar se o usuário tem um plano ativo
    const hasActivePlan = token?.subscription?.status === 'active' && token?.plan;

    // Se não tem plano ativo e não está na página de planos, redirecionar
    if (!hasActivePlan && !pathname.startsWith('/adjustments/plans')) {
        const plansUrl = new URL('/adjustments/plans', request.url);
        return NextResponse.redirect(plansUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/agents/:path*',
        '/dashboard/:path*',
        '/chat/:path*',
        '/knowledge-sources/:path*',
        '/settings/:path*',
        '/etapas'
    ],
};
