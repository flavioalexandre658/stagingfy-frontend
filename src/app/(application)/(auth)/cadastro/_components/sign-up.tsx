'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconLoader2 } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiLock, FiMail, FiPhone, FiUser, FiUserCheck } from 'react-icons/fi'
import { boolean, z } from 'zod'

import { signUpEmailAction } from '@/actions/auth/sign-up'
import Logo from '@/components/branding/logo'
import { Checkbox } from '@/components/ui/checkbox'
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
  name: z.string().min(1, 'Insira um nome e sobrenome'),
  email: z.string().email('E-mail inválido'),
  phone: z
    .string()
    .refine(
      (val) => /^\(\d{2}\)\s?\d{5}-\d{4}$/.test(val),
      'Telefone inválido'
    ),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .refine(
      (val) =>
        /[A-Z]/.test(val) && /[0-9]/.test(val) && /[!@#$%^&*(),.?":{}|<>]/.test(val),
      'A senha deve conter letra maiúscula, número e caractere especial'
    ),
  terms: z.boolean().refine((val) => val, {
    message: 'Você deve concordar com os termos.',
  }),
})

export default function Signup() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState<string | null>(null)
  const [source, setSource] = useState<string | null>(null)
  const [ip, setIp] = useState<string | null>(null)
  const [sourceUrl, setSourceUrl] = useState<string | null>(null)
  const [planId, setPlanId] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      terms: false,
    },
  })

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json')
        const data = await res.json()
        setIp(data.ip)
      } catch (err) {
        console.error('Erro ao obter IP:', err)
      }
    }
    fetchIp()
  }, [])

  useEffect(() => {
    const qRedirect = searchParams.get('redirect') || ''
    const qSource = searchParams.get('source') || ''
    const qPlanId = searchParams.get('plan_id') || null
    setRedirect(qRedirect)
    setSourceUrl(qSource)
    setPlanId(qPlanId)

    if (qSource.includes('gclid')) setSource('google_ads')
    else if (qSource.includes('fbclid')) setSource('meta_ads')
    else if (qSource.includes('ttclid')) setSource('tiktok_ads')
    else if (qSource.includes('pinid')) setSource('pinterest_ads')
    else setSource('organic')
  }, [searchParams])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 11) val = val.slice(0, 11)
    if (val.length <= 2) val = val
    else if (val.length <= 7) val = `(${val.slice(0, 2)}) ${val.slice(2)}`
    else val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`
    form.setValue('phone', val)
  }

  const { executeAsync } = useAction(signUpEmailAction)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone.replace(/\D/g, ''),
      }
      const resp = await executeAsync(payload)
      const { data, serverError, validationErrors } = resp as any
      if (data && !serverError && !validationErrors) {
        const loginResp = await signIn('credentials', { email: values.email, password: values.password, redirect: false })
        if (loginResp?.ok) {
          toast.success('Seja bem-vindo(a)!')
          window.location.href = redirect || '/'
        } else {
          toast.error('Falha ao realizar login após cadastro.')
        }
      } else {
        toast.error(serverError?.message || 'Falha ao realizar cadastro.')
      }
    } catch (error) {
      toast.error('Erro ao tentar se conectar ao servidor.')
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FiUser size={16} className="text-muted-foreground" />
                      <Input placeholder="Digite seu nome completo" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FiMail size={16} className="text-muted-foreground" />
                      <Input placeholder="Digite seu melhor e-mail" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FiPhone size={16} className="text-muted-foreground" />
                      <Input
                        placeholder="(99) 99999-9999"
                        {...field}
                        onChange={handlePhoneChange}
                        value={form.watch('phone')}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FiLock size={16} className="text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Mínimo de 8 caracteres, com letra maiúscula e número"
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
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="terms"
                      />
                    </FormControl>
                    <FormLabel htmlFor="terms" className="text-sm font-normal">
                      Concordo com os{' '}
                      <a
                        href="https://chatagentes.com/termos-de-uso"
                        className="text-released-7"
                        target="_blank"
                      >
                        Termos de Uso
                      </a>{' '}
                      e as{' '}
                      <a
                        href="https://chatagentes.com/politica-de-privacidade/"
                        className="text-released-7"
                        target="_blank"
                      >
                        Políticas de Privacidade
                      </a>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <EnhancedButton
              type="submit"
              className="w-full"
              loading={loading}
              loadingText="Cadastrando..."
            >
              <EnhancedButtonLeft>
                <FiUserCheck size={18} />
              </EnhancedButtonLeft>
              <EnhancedButtonContent>
                Cadastrar
              </EnhancedButtonContent>
            </EnhancedButton>
          </form>
        </Form>

        <div className="mt-6">
          <Separator />
        </div>

        <p className="mt-4 text-sm text-center">
          Já tem uma conta?{' '}
          <button
            onClick={() => window.location.href = `/entrar?redirect=${redirect}`}
            className="text-released-7 hover:text-released-8 font-medium transition-colors"
          >
            Faça login agora
          </button>
        </p>
      </motion.div>
    </div>
  )
}
