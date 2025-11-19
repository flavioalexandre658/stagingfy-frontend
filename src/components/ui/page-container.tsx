import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="w-full space-y-4 py-[15px]">{children}</div>;
};

export const PageHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("flex w-full max-w-5xl mx-auto items-center justify-between", className)}>{children}</div>
    );
};

export const PageHeaderContent = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <div className="w-full space-y-1">{children}</div>;
};

export const PageTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return <h1 className={cn("text-2xl font-bold", className)}>{children}</h1>;
};

export const PageTooltip = ({ children, tooltip }: { children: React.ReactNode, tooltip: string }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild className="cursor-pointer">{children}</TooltipTrigger>
                <TooltipContent>
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export const PageDescription = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>;
};

export const PageActions = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex items-center gap-2">{children}</div>;
};

export const PageContent = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return <div className={cn("space-y-4 w-full max-w-5xl mx-auto", className)}>{children}</div>;
};