import { cn } from "@/lib/utils";

interface AdBannerProps {
  variant: "horizontal" | "sidebar";
  className?: string;
}

export default function AdBanner({ variant, className }: AdBannerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg bg-muted/30 text-muted-foreground select-none",
        variant === "horizontal" ? "w-full h-24 py-4" : "w-full h-64",
        className,
      )}
    >
      <span className="text-xs uppercase tracking-widest font-semibold mb-1">
        Advertisement
      </span>
      <span className="text-xs">
        {variant === "horizontal"
          ? "728 × 90 — Leaderboard"
          : "300 × 250 — Medium Rectangle"}
      </span>
      <span className="text-[10px] mt-1 opacity-60">
        Google AdSense Placeholder
      </span>
    </div>
  );
}
