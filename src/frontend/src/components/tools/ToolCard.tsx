import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import type { ToolMeta } from "../../data/tools";

interface ToolCardProps {
  tool: ToolMeta;
  index: number;
  onTryNow: (tool: ToolMeta) => void;
}

export default function ToolCard({ tool, index, onTryNow }: ToolCardProps) {
  const Icon = tool.icon;
  return (
    <div
      data-ocid={`tools.item.${index}`}
      className="group relative glass-card rounded-xl p-6 hover-lift cursor-pointer transition-all duration-200 hover:border-primary/40 hover:shadow-glow-sm"
    >
      {tool.isPremium && (
        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs">
          <Crown className="h-3 w-3 mr-1" /> Pro
        </Badge>
      )}
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl mb-4",
          tool.bgColor,
        )}
      >
        <Icon className={cn("h-6 w-6", tool.color)} />
      </div>
      <h3 className="font-display font-semibold text-base mb-2">{tool.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {tool.description}
      </p>
      <Button
        onClick={() => onTryNow(tool)}
        variant="outline"
        size="sm"
        className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
      >
        Try Now →
      </Button>
    </div>
  );
}
