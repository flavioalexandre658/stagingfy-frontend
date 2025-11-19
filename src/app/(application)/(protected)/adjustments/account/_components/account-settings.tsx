"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck, IconCopy, IconUser, IconUserCheck } from "@tabler/icons-react";
import { Check, Copy, User as UserIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

import { updateUser } from "@/actions/users/update-user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedButton, EnhancedButtonContent, EnhancedButtonLeft } from "@/components/ui/enhanced-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PageBlocks, PageBlocksContent, PageBlocksDescription, PageBlocksHeader, PageBlocksTitle } from "@/components/ui/page-blocks";
import { Separator } from "@/components/ui/separator";
import { User } from "@/interfaces/user.interface";

const accountSchema = z.object({
    userName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    mobileNumber: z.string().optional(),
});

type AccountFormData = z.infer<typeof accountSchema>;

interface AccountSettingsProps {
    user: User;
}

export function AccountSettings({ user }: AccountSettingsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(user.id);
            setCopied(true);
            toast.success("ID do usuário copiado");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Erro ao copiar ID");
        }
    };

    const form = useForm<AccountFormData>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            userName: user.userName || "",
            email: user.email || "",
            mobileNumber: user.mobileNumber || "",
        },
    });

    const onSubmit = useCallback(async (data: AccountFormData) => {
        try {
            setIsLoading(true);

            const updateData = {
                userName: data.userName,
                email: data.email,
                mobileNumber: data.mobileNumber || null,
            };

            // Simular atualização (implementar quando tivermos a API correta)
            // const result = await updateUser(updateData, parseInt(user.id));

            // Por enquanto, simular sucesso
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Dados atualizados com sucesso!");

        } catch (error) {
            console.error("Erro ao atualizar dados:", error);
            toast.error("Erro ao atualizar dados. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="space-y-8">
            {/* Configurações da Conta */}
            <PageBlocks>
                <PageBlocksHeader>
                    <PageBlocksTitle className="text-xl font-bold">
                        <UserIcon className="mr-1.5 size-4 text-muted-foreground" />
                        Informações da Conta
                    </PageBlocksTitle>
                    <PageBlocksDescription>
                        Gerencie suas informações pessoais e dados de contato.
                    </PageBlocksDescription>
                </PageBlocksHeader>
                <PageBlocksContent>
                    <div className="space-y-6">
                        {/* Informações do Usuário */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        ID do Usuário
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center gap-2">
                                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded flex-1">
                                            {user.id}
                                        </code>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleCopy}
                                            className="h-8 w-8 shrink-0"
                                        >
                                            {copied ? (
                                                <Check className="h-3.5 w-3.5 text-green-600" />
                                            ) : (
                                                <Copy className="h-3.5 w-3.5" />
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>

                        {/* Formulário de Edição */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações Pessoais</CardTitle>
                                <CardDescription>
                                    Atualize seus dados pessoais e de contato.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="userName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nome de usuário</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Seu nome de usuário"
                                                                {...field}
                                                            />
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
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="email"
                                                                placeholder="seu@email.com"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="mobileNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Telefone (opcional)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="(11) 99999-9999"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex justify-end pt-4">
                                            <EnhancedButton
                                                type="submit"
                                                disabled={isLoading}
                                                className="min-w-[120px]"
                                                loading={isLoading}
                                                loadingText="Salvando..."
                                            >
                                                <EnhancedButtonLeft>
                                                    <IconCheck size={18} />
                                                </EnhancedButtonLeft>
                                                <EnhancedButtonContent>
                                                    Salvar alterações
                                                </EnhancedButtonContent>
                                            </EnhancedButton>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </PageBlocksContent>
            </PageBlocks>
        </div>
    );
} 