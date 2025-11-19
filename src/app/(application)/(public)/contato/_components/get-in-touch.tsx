'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { contactUs } from '@/actions/send-mail/contact-us'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CustomAnchor } from '@/components/ui/router/custom-anchor'
import { Textarea } from '@/components/ui/textarea'

import { ButtonWhatsapp } from './button-whatsapp'
import { ContactIconsList } from './contact-icons'

export function GetInTouch() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onSubmit = async (data: any) => {
        setLoading(true)
        setErrorMessage(null)

        try {
            const res = await contactUs(data)
            if (res.id) {
                toast.success(res.message)
                reset()
            } else {
                toast.error(res.error)
                setErrorMessage(res.error)
            }
        } catch (error) {
            console.error(error)
            toast.error('Erro ao enviar mensagem.')
            setErrorMessage('Erro ao enviar mensagem.')
        } finally {
            setLoading(false)
        }
    }

    const breadcrumbs = [
        { title: 'Início', href: '/' },
        { title: 'Fale conosco', href: '/contato' },
    ]

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <nav className="text-sm text-muted-foreground mb-4 space-x-2">
                {breadcrumbs.map((item, i) => (
                    <CustomAnchor key={i} href={item.href} props={{}}>
                        {item.title}
                    </CustomAnchor>
                ))}
            </nav>

            <h2 className="text-3xl font-bold text-center mb-2">
                Estamos aqui para ajudar!
            </h2>
            <p className="text-muted-foreground text-center mb-6 max-w-2xl mx-auto">
                Seja por e-mail, WhatsApp ou chat, nossa equipe está pronta para responder suas dúvidas sobre agentes de IA, chatbots personalizados e automação inteligente.
            </p>

            <ButtonWhatsapp />

            <h3 className="text-xl font-semibold text-center mt-12 mb-4">
                Prefere enviar uma mensagem?
            </h3>

            <Card className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                placeholder="Nome"
                                {...register('name', { required: 'O nome é obrigatório' })}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">{errors.name.message as string}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                placeholder="seu@email.com"
                                {...register('email', {
                                    required: 'O e-mail é obrigatório',
                                    pattern: {
                                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                        message: 'Email inválido',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email.message as string}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="subject">Assunto</Label>
                        <Input
                            id="subject"
                            placeholder="Assunto"
                            {...register('subject', { required: 'O assunto é obrigatório' })}
                        />
                        {errors.subject && (
                            <p className="text-sm text-red-500 mt-1">{errors.subject.message as string}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="message">Mensagem</Label>
                        <Textarea
                            id="message"
                            placeholder="Descreva sua dúvida sobre agentes de IA, chatbots ou automação..."
                            rows={4}
                            {...register('message', { required: 'A mensagem é obrigatória' })}
                        />
                        {errors.message && (
                            <p className="text-sm text-red-500 mt-1">{errors.message.message as string}</p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar mensagem'}
                        </Button>
                    </div>

                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                </form>
            </Card>

            <div className="mt-10">
                <h4 className="text-lg font-semibold mb-2 text-center">Informações de contato</h4>
                <ContactIconsList />
            </div>
        </div>
    )
}
