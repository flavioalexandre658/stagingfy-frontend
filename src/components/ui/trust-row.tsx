import { cn } from "@/lib/utils";

type Metric = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

export function TrustRow({ metrics, className }: { metrics: Metric[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3", className)}>
      {metrics.map((m, i) => (
        <div key={i} className="rounded-xl border border-gray-700 bg-gray-800/70 px-3 py-3 text-center">
          {m.icon && <div className="mb-1 flex justify-center">{m.icon}</div>}
          <p className="text-sm font-semibold text-gray-100">{m.title}</p>
          {m.subtitle && <p className="text-xs text-gray-300">{m.subtitle}</p>}
        </div>
      ))}
    </div>
  );
}