import { cn } from "@/lib/utils"

interface Action {
    label: string
    icon: React.ReactNode
    onClick: () => void
    variant?: 'default' | 'destructive'
}

interface SelectionToolbarProps {
    selectedCount: number
    actions: Action[]
    className?: string
}

export function SelectionToolbar({ selectedCount, actions, className }: SelectionToolbarProps) {
    if (selectedCount === 0) return null

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 pointer-events-none">
            <div className={cn(
                "flex items-center justify-between px-4 py-2 mx-auto bg-released-800 text-white rounded-md shadow-lg pointer-events-auto max-w-2xl",
                className
            )}>
                <span className="text-sm">
                    {selectedCount} {selectedCount === 1 ? 'item' : 'itens'} selecionado{selectedCount !== 1 && 's'}
                </span>
                <div className="flex items-center gap-2">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.onClick}
                            className={cn(
                                "flex items-center gap-2 px-2 py-1 text-sm font-medium transition-colors rounded-md",
                                "hover:bg-white/10",
                                action.variant === 'destructive' && "text-red-400 hover:text-red-300"
                            )}
                        >
                            {action.icon}
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
} 