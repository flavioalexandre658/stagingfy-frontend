import { Icon } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { getInitials } from "@/utils/functions.util"

import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface CustomAvatarProps {
    src?: string | null
    fallback?: string
    icon?: Icon
    className?: string
    style?: React.CSSProperties
}

const CustomAvatar = ({ src, fallback, icon: Icon, className, style }: CustomAvatarProps) => {
    return (
        <Avatar className={cn(className)} style={style}>
            {src && <AvatarImage src={src} className={cn(className)} style={style} />}
            <AvatarFallback
                className={cn(
                    Icon ? "bg-muted flex items-center justify-center" : "text-[11px] font-bold",
                    className
                )}
                style={style}
            >
                {Icon ? <Icon className="w-4 h-4" /> : fallback ? getInitials(fallback) : null}
            </AvatarFallback>
        </Avatar>
    )
}

export default CustomAvatar