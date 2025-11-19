import { cn } from "@/lib/utils"

export const PageSetupChannel = ({ children }: { children: React.ReactNode }) => {
    return <div className="min-h-screen bg-background">{children}</div>
}

export const PageSetupChannelHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("border-b bg-card", className)}>
            <div className="container mx-auto px-4">
                {children}
            </div>
        </div>
    )
}

export const PageSetupChannelSubHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex items-center justify-between py-4", className)}>
            {children}
        </div>
    )
}

export const PageSetupChannelBack = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            {children}
        </div>
    )
}

export const PageSetupChannelTitleSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex-1 min-w-0", className)}>
            {children}
        </div>
    )
}

export const PageSetupChannelTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <h1 className={cn("text-xl font-semibold truncate", className)}>
            {children}
        </h1>
    )
}

export const PageSetupChannelDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <p className={cn("text-sm text-muted-foreground", className)}>
            {children}
        </p>
    )
}

export const PageSetupChannelActions = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex items-center gap-2">{children}</div>
}

export const PageSetupChannelContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("container mx-auto px-4 py-6", className)}>
            {children}
        </div>
    )
}

export const PageSetupChannelTutorial = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("bg-card rounded-lg border p-6 mb-6", className)}>
            {children}
        </div>
    )
}

export const PageSetupChannelQRSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("bg-card rounded-lg border p-6 flex flex-col items-center justify-center", className)}>
            {children}
        </div>
    )
}