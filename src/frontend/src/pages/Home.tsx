import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Hash,
  Instagram,
  Lightbulb,
  Rocket,
  Zap,
} from "lucide-react";
import { useState } from "react";
import ToolModal from "../components/tools/ToolModal";
import { TOOLS } from "../data/tools";
import type { ToolMeta } from "../data/tools";

const TOOL_ICONS = {
  "instagram-caption": Instagram,
  "hashtag-generator": Hash,
  "post-ideas": Lightbulb,
};

export default function Home() {
  const [activeTool, setActiveTool] = useState<ToolMeta | null>(null);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="hero-gradient absolute inset-0 pointer-events-none" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.65 0.22 290) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.22 290) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-6 animate-fade-in inline-flex items-center gap-1.5 px-4 py-1.5 text-sm"
            >
              <Rocket className="h-3.5 w-3.5" />
              AI-Powered Social Media Tools
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Grow Your Social Media{" "}
              <span className="gradient-text">Faster with AI</span> 🚀
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up delay-100">
              Generate captions, hashtags, and viral ideas instantly
            </p>
            <div className="animate-fade-in-up delay-200">
              <Button
                size="lg"
                className="text-lg px-10 py-6 shadow-glow rounded-full"
                asChild
                data-ocid="hero.primary_button"
              >
                <Link to="/tools">
                  Try Now <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                No login required · Free to use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Feature Cards */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Three tools that{" "}
            <span className="gradient-text">do the heavy lifting</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Pick a tool, enter your topic, and get results in seconds.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOOLS.map((tool, i) => {
            const Icon = TOOL_ICONS[tool.id as keyof typeof TOOL_ICONS];
            return (
              <div
                key={tool.id}
                className="glass-card rounded-2xl p-8 flex flex-col gap-4 animate-fade-in-up hover-lift"
                style={{ animationDelay: `${i * 0.1}s` }}
                data-ocid={`tools.item.${i + 1}`}
              >
                {tool.badge && (
                  <span className="self-start text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {tool.badge === "Trending" && "🔥 "}
                    {tool.badge === "Most Used" && "⭐ "}
                    {tool.badge === "Pro Favorite" && "💎 "}
                    {tool.badge}
                  </span>
                )}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tool.bgColor}`}
                >
                  {Icon && <Icon className={`h-7 w-7 ${tool.color}`} />}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  <Button
                    variant="outline"
                    className="w-full group"
                    onClick={() => setActiveTool(tool)}
                    data-ocid={`tools.primary_button.${i + 1}`}
                  >
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer CTA Strip */}
      <section className="gradient-bg py-14">
        <div className="container text-center">
          <p className="text-lg md:text-xl font-medium text-foreground/80 mb-6">
            No login required. Start creating in seconds.
          </p>
          <Button
            size="lg"
            className="shadow-glow rounded-full px-8"
            asChild
            data-ocid="cta.primary_button"
          >
            <Link to="/tools">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <ToolModal
        tool={activeTool}
        open={!!activeTool}
        onClose={() => setActiveTool(null)}
      />
    </main>
  );
}
