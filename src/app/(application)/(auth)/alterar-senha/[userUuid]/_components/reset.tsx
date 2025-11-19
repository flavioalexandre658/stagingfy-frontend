'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconLoader2 } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiCheck, FiLock } from 'react-icons/fi'
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
import { useCustomRouter } from '@/lib/use-custom-router'

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/

const formSchema = z
  .object({
    checkPassword: z
      .string()
      .regex(passwordRegex, {
        message:
          'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.',
      }),
    newPassword: z
      .string()
      .regex(passwordRegex, {
        message:
          'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.',
      }),
  })
  .refine((data) => data.checkPassword === data.newPassword, {
    path: ['newPassword'],
    message: 'As senhas devem ser idênticas',
  })

export default function Reset({ userUuid }: { userUuid: string }) {
  const router = useCustomRouter()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkPassword: '',
      newPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrorMessage(null)
    setSuccessMessage(null)
    setLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            uuid: userUuid,
            password: values.newPassword,
          }),
        }
      )

      const data = await response.json()

      if (data.message) {
        toast.success(data.message)
        setSuccessMessage(data.message)
        router.push('/entrar')
      } else {
        toast.error('Falha ao alterar senha.')
        setErrorMessage('Falha ao alterar senha.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro ao tentar se conectar ao servidor.')
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
            Insira uma nova senha
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Crie uma senha segura para acessar o {process.env.NEXT_PUBLIC_NAME_PROJECT}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="checkPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FiLock size={16} className="text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="8+ caracteres, 1 letra maiúscula e números"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repetir senha</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FiLock size={16} className="text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="8+ caracteres, 1 letra maiúscula e números"
                        {...field}
                      />
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
              loadingText="Salvando..."
            >
              <EnhancedButtonLeft>
                <FiCheck size={18} />
              </EnhancedButtonLeft>
              <EnhancedButtonContent>
                Salvar
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
          Já conseguiu alterar?{' '}
          <Link
            href="/entrar"
            className="text-released-7 hover:text-released-8 font-medium transition-colors"
          >
            Entrar
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
