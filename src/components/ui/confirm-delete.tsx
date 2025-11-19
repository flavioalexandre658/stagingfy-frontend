import { IconAlertTriangle, IconTrash, IconX } from "@tabler/icons-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle
} from "@/components/ui/dialog"
import { EnhancedButton, EnhancedButtonContent, EnhancedButtonLeft } from "@/components/ui/enhanced-button"
import { cn } from "@/lib/utils"

interface ConfirmDeleteProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => Promise<void>
    title?: string
    description?: string
    isLoading?: boolean
    className?: string
}

export function ConfirmDelete({
    open,
    onOpenChange,
    onConfirm,
    title = "Você tem certeza?",
    description = "Esta ação não pode ser desfeita.",
    isLoading = false,
    className
}: ConfirmDeleteProps) {
    const handleConfirm = async () => {
        await onConfirm()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogOverlay className="bg-released-800/70" />
            <DialogContent className={cn(
                "bg-white",
                className
            )}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <IconAlertTriangle className="w-5 h-5" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <EnhancedButton
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        <EnhancedButtonLeft>
                            <IconX className="w-4 h-4" />
                        </EnhancedButtonLeft>
                        <EnhancedButtonContent>
                            Cancelar
                        </EnhancedButtonContent>
                    </EnhancedButton>
                    <EnhancedButton
                        variant="destructive"
                        onClick={handleConfirm}
                        loading={isLoading}
                        loadingText="Deletando..."
                    >
                        <EnhancedButtonLeft>
                            <IconTrash className="w-4 h-4" />
                        </EnhancedButtonLeft>
                        <EnhancedButtonContent>
                            Sim, deletar
                        </EnhancedButtonContent>
                    </EnhancedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 