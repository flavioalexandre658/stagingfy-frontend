import { cn } from "@/lib/utils";

type PillProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "muted";
  className?: string;
};

export function Pill({ children, variant = "muted", className }: PillProps) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
  const styles =
    variant === "primary"
      ? "bg-primary-600 text-primary-foreground"
      : variant === "outline"
      ? "border border-gray-600 text-gray-100"
      : "bg-gray-800 text-gray-200";
  return <span className={cn(base, styles, className)}>{children}</span>;
}