import { cn } from "@/lib/utils";

export const PageBlocks = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn(" overflow-hidden rounded-lg border border-border bg-card shadow-sm block mb-4", className)}>
            {children}
        </div>
    );
}

export const PageBlocksHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="border-b border-border bg-muted/50 px-5 py-4">
            {children}
        </div>
    );
}

export const PageBlocksTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <h3 className={cn("flex items-center text-sm font-semibold", className)}>
            {children}
        </h3>
    );
}

export const PageBlocksDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <p className={cn("text-sm text-muted-foreground", className)}>
            {children}
        </p>
    );
}

export const PageBlocksContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-5">
            <div className="space-y-2">
                {children}
            </div>
        </div>
    );
}

