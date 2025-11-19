import { cn } from "@/lib/utils"

export const ChatContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative flex-1 basis-full overflow-y-hidden scroll-smooth flex flex-col shadow-inner min-h-0">
            {children}
        </div>
    )
}

export const ChatHeader = ({
    children,
    className,
    style
}: {
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
}) => {
    return (
        <header
            className={cn("relative flex items-center justify-between px-5 text-black", className)}
            style={style}
        >
            {children}
        </header>
    )
}

export const ChatHeaderProfile = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center gap-2 h-[75px]">
            {children}
        </div>
    )
}

export const ChatHeaderActions = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center h-[75px]">
            {children}
        </div>
    )
}

export const ChatMessages = ({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div className={cn("flex w-full flex-1 flex-col space-y-3 overflow-y-auto px-5 pt-5 sm:overscroll-contain", className)}>
            <div className="flex-1 space-y-5">
                {children}
            </div>
        </div>
    )
}

export const ChatMessageItem = ({
    children,
    isUser,
    className
}: {
    children: React.ReactNode
    isUser?: boolean
    className?: string
}) => {
    return (
        <div className={cn(
            "relative flex w-full flex-col ",
            isUser ? "items-end" : "items-start",
            className
        )}>
            {children}
        </div>
    )
}

export const ChatMessageContent = ({
    children,
    style,
    className
}: {
    children: React.ReactNode
    style?: React.CSSProperties
    className?: string
}) => {
    return (
        <div
            className={cn(
                "px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap",
                className
            )}
            style={style}
        >
            {children}
        </div>
    )
}

export const ChatMessageActions = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center gap-2 ml-10 mt-1 text-muted-foreground">
            {children}
        </div>
    )
}

export const ChatSuggestedMessages = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-white p-2 text-right">
            {children}
        </div>
    )
}

export const ChatInput = ({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div className={cn("flex shrink-0 flex-col justify-end border-t px-1 pt-1 pb-4 pr-4", className)}>
            {children}
        </div>
    )
}

export const ChatInputContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-end gap-2">
            {children}
        </div>
    )
}

export const ChatFooterContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <footer className="flex min-h-10 w-full max-w-full shrink-0 items-center justify-center gap-2 overflow-hidden text-nowrap bg-primary-foreground px-4 py-2 text-muted-foreground text-xs">
            {children}
        </footer>
    )
}

export function ChatFooter({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("text-center text-xs text-muted-foreground flex items-center justify-center gap-2", className)}>
            {children}
        </div>
    );
}