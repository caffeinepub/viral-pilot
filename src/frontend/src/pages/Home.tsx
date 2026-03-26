import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Copy,
  Hash,
  Instagram,
  Lightbulb,
  Loader2,
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

const SAMPLE_OUTPUT = {
  caption:
    "Every rep counts. Every set matters. Your fitness journey is yours alone — embrace the grind and trust the process. 💪 #FitnessMotivation",
  hashtags:
    "#fitness #workout #gym #motivation #fitlife #healthylifestyle #gains #fitnessmotivation #bodygoals #grind",
};

export default function Home() {
  const [activeTool, setActiveTool] = useState<ToolMeta | null>(null);
  const [demoInput, setDemoInput] = useState("");
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoOutput, setDemoOutput] = useState<typeof SAMPLE_OUTPUT | null>(
    null,
  );
  const [copied, setCopied] = useState(false);

  function handleScrollToDemo() {
    document
      .getElementById("demo-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleGenerateSample() {
    setDemoLoading(true);
    setDemoOutput(null);
    await new Promise((r) => setTimeout(r, 800));
    setDemoOutput(SAMPLE_OUTPUT);
    setDemoLoading(false);
  }

  function handleCopy() {
    if (!demoOutput) return;
    navigator.clipboard.writeText(
      `${demoOutput.caption}\n\n${demoOutput.hashtags}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="hero-gradient absolute inset-0 pointer-events-none" />
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
              Grow Your Instagram{" "}
              <span className="gradient-text">Faster with AI</span> 🚀
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-in-up delay-100">
              Create viral captions, hashtags, and ideas in seconds
            </p>
            <p className="text-base text-muted-foreground/70 mb-10 animate-fade-in-up delay-200">
              ✨ Used by creators worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200">
              <Button
                size="lg"
                className="text-lg px-10 py-6 shadow-glow rounded-full w-full sm:w-auto"
                asChild
                data-ocid="hero.primary_button"
              >
                <Link to="/tools">
                  Try Free Now <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 rounded-full w-full sm:w-auto"
                onClick={handleScrollToDemo}
                data-ocid="hero.secondary_button"
              >
                See Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground animate-fade-in-up delay-300">
              No login required · 100% Free
            </p>
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
            const displayName =
              tool.id === "post-ideas" ? "Viral Reel Ideas 🔥" : tool.name;
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
                    {displayName}
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

      {/* How It Works */}
      <section className="gradient-bg py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              How it <span className="gradient-text">works</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From idea to post in under 30 seconds
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                icon: "📝",
                title: "Enter topic",
                desc: "Type your niche or post idea into the tool — e.g. fitness, food, travel.",
              },
              {
                step: 2,
                icon: "✨",
                title: "Get AI result",
                desc: "Our AI instantly generates captions, hashtags, or content ideas tailored to you.",
              },
              {
                step: 3,
                icon: "🚀",
                title: "Copy & post",
                desc: "Copy the result with one click and paste it straight into Instagram.",
              },
            ].map(({ step, icon, title, desc }, i) => (
              <div
                key={step}
                className="glass-card rounded-2xl p-7 flex flex-col items-center text-center gap-3 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                data-ocid={`howto.item.${i + 1}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary font-display font-bold text-lg border border-primary/30">
                  {step}
                </div>
                <span className="text-3xl">{icon}</span>
                <h3 className="font-display text-lg font-bold">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo-section" className="container py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              See it <span className="gradient-text">in action</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Try a sample — no login needed
            </p>
          </div>
          <div
            className="glass-card rounded-2xl p-8 flex flex-col gap-5"
            data-ocid="demo.panel"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                className="flex-1 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="Enter your niche (e.g. fitness, food, travel)"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerateSample()}
                data-ocid="demo.input"
              />
              <Button
                onClick={handleGenerateSample}
                disabled={demoLoading}
                className="rounded-xl px-6 shadow-glow shrink-0"
                data-ocid="demo.primary_button"
              >
                {demoLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Sample <Zap className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {demoLoading && (
              <div
                className="flex items-center justify-center py-8 text-muted-foreground gap-2"
                data-ocid="demo.loading_state"
              >
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">AI is crafting your content...</span>
              </div>
            )}

            {demoOutput && !demoLoading && (
              <div
                className="flex flex-col gap-4 animate-fade-in-up"
                data-ocid="demo.success_state"
              >
                <div className="rounded-xl border border-border bg-muted/30 p-5">
                  <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                    📸 Caption
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {demoOutput.caption}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-muted/30 p-5">
                  <p className="text-xs font-semibold text-violet-400 mb-2 uppercase tracking-wider">
                    # Hashtags
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {demoOutput.hashtags}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={handleCopy}
                    data-ocid="demo.secondary_button"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied! ✅" : "Copy All"}
                  </Button>
                  <Button
                    className="flex-1 shadow-glow gap-2"
                    asChild
                    data-ocid="demo.submit_button"
                  >
                    <Link to="/tools">
                      Try Now for Real <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer CTA Strip */}
      <section className="gradient-bg py-14">
        <div className="container text-center">
          <p className="text-lg md:text-xl font-medium text-foreground/80 mb-6">
            Start creating for free — no login required
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
