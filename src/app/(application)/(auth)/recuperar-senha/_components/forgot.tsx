'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconLoader2 } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiMail, FiRefreshCw } from 'react-icons/fi'
import { z } from 'zod'

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
})

export default function Recover() {
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSuccessMessage(null)
    setErrorMessage(null)
    setLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/email/${values.email}/reset/password`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )

      const data = await res.json()

      if (res.ok) {
        const message = data.message || 'Enviamos um e-mail de recuperação.'
        toast.success(message)
        setSuccessMessage(message)
      } else {
        const message = data.message.includes('query results')
          ? 'Não existe cadastro neste e-mail'
          : data.message || 'Falha ao tentar recuperar. Verifique o e-mail inserido.'
        toast.error(message)
        setErrorMessage(message)
      }
    } catch (err) {
      console.error(err)
      toast.error('Erro ao tentar se conectar ao servidor. Tente novamente.')
      setErrorMessage('Erro ao tentar se conectar ao servidor. Tente novamente.')
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
          <h2 className="text-2xl sm:text-3xl font-bold text-grafite">
            Recupere sua senha
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Insira seu e-mail e enviaremos instruções para redefinir sua senha
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FiMail size={16} className="text-muted-foreground" />
                      <Input placeholder="Informe seu e-mail" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <EnhancedButton
              type="submit"
              className="w-full"
              loading={loading}
              loadingText="Recuperando..."
            >
              <EnhancedButtonLeft>
                <FiRefreshCw size={18} />
              </EnhancedButtonLeft>
              <EnhancedButtonContent>
                Recuperar
              </EnhancedButtonContent>
            </EnhancedButton>
          </form>
        </Form>

        {successMessage && (
          <p className="mt-2 text-center text-green-600 text-sm">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-2 text-center text-red-600 text-sm">{errorMessage}</p>
        )}

        <div className="mt-6">
          <Separator />
        </div>

        <p className="mt-4 text-sm text-center">
          Voltar para{' '}
          <Link
            href="/entrar"
            className="text-released-7 hover:text-released-8 font-medium transition-colors"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
