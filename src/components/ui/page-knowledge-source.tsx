import { cn } from "@/lib/utils"

export const PageKnowledgeSource = ({ children }: { children: React.ReactNode }) => {
    return <div className="min-h-screen bg-background">{children}</div>
}

export const PageKnowledgeSourceHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("border-b bg-card", className)}>
            <div className="container mx-auto px-4">
                {children}
            </div>
        </div>
    )
}

export const PageKnowledgeSourceSubHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex items-center justify-between py-4", className)}>
            {children}
        </div>
    )
}

export const PageKnowledgeSourceBack = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            {children}
        </div>
    )
}

export const PageKnowledgeSourceTitleSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex-1 min-w-0", className)}>
            {children}
        </div>
    )
}

export const PageKnowledgeSourceTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <h1 className={cn("text-xl font-semibold truncate", className)}>
            {children}
        </h1>
    )
}

export const PageKnowledgeSourceDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <p className={cn("text-sm text-muted-foreground", className)}>
            {children}
        </p>
    )
}

export const PageKnowledgeSourceActions = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex items-center gap-2">{children}</div>
}

export const PageKnowledgeSourceContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("container mx-auto px-4 py-6", className)}>
            {children}
        </div>
    )
} 