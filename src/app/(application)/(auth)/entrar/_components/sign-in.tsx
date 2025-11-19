'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconLoader2 } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import { z } from 'zod'

import Logo from '@/components/branding/logo'
import { EnhancedButton, EnhancedButtonContent, EnhancedButtonLeft } from '@/components/ui/enhanced-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().trim().min(1, { message: 'A senha é obrigatória' }),
})

export default function Signin() {
  const searchParams = useSearchParams()
  const [redirect, setRedirect] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const queryRedirect = searchParams.get('redirect') || ''
    setRedirect(queryRedirect)
  }, [searchParams])

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true)
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: redirect || '/agents'
      })

      if (result?.error) {
        toast.error('Erro ao realizar login com Google')
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (error) {
      toast.error('Erro ao conectar com Google')
    } finally {
      setGoogleLoading(false)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const response = await signIn('credentials', { ...values, redirect: false })
      if (response?.ok) {
        toast.success('Seja bem-vindo(a).')
        window.location.href = redirect || '/agents'
      } else {
        toast.error('Login falhou. Verifique suas credenciais.')
      }
    } catch (err) {
      toast.error('Erro ao realizar login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-lg shadow-xl p-8"
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center">
            <Logo width={34} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Crie agentes de IA que realmente entendem o seu negócio.
          </p>
        </div>
        {/*
        <EnhancedButton
          type="button"
          variant="outline"
          className="w-full mb-4"
          onClick={handleGoogleLogin}
          loading={googleLoading}
          loadingText="Conectando..."
        >
          <EnhancedButtonLeft>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </EnhancedButtonLeft>
          <EnhancedButtonContent>
            Continuar com Google
          </EnhancedButtonContent>
        </EnhancedButton>
        

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-muted-foreground">
            ou continue com e-mail
          </span>
        </div>
        */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FiMail size={16} className="text-muted-foreground" />
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FiLock size={16} className="text-muted-foreground" />
                      <Input type="password" placeholder="Digite sua senha" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right text-sm">
              <Link
                href="/recuperar-senha"
                className="text-released-7 hover:text-released-8 transition-colors"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <EnhancedButton
              type="submit"
              className="w-full"
              loading={loading}
              loadingText="Entrando..."
            >
              <EnhancedButtonLeft>
                <FiLogIn size={18} />
              </EnhancedButtonLeft>
              <EnhancedButtonContent>
                Entrar
              </EnhancedButtonContent>
            </EnhancedButton>
          </form>
        </Form>

        <div className="mt-6">
          <Separator />
        </div>

        <p className="mt-4 text-sm text-center">
          Ainda não tem uma conta?{' '}
          <button
            onClick={() =>
              window.location.href = `/cadastro?redirect=${redirect}`
            }
            className="text-released-7 hover:text-released-8 font-medium transition-colors"
          >
            Crie sua conta grátis
          </button>
        </p>
      </motion.div>
    </div>
  )
}
