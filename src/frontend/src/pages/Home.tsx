import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Save,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";
import AdBanner from "../components/layout/AdBanner";
import ToolCard from "../components/tools/ToolCard";
import ToolModal from "../components/tools/ToolModal";
import { TOOLS } from "../data/tools";
import type { ToolMeta } from "../data/tools";

const TESTIMONIALS = [
  {
    name: "Jasmine Torres",
    handle: "@jasmine.creates",
    avatar: "JT",
    text: "Viral Pilot completely transformed how I create content. My Instagram engagement went up 340% in the first month. The caption generator alone is worth 10x the price.",
    role: "Lifestyle Creator",
    stars: 5,
  },
  {
    name: "Marcus Williams",
    handle: "@marcuswfit",
    avatar: "MW",
    text: "I used to spend hours crafting hashtag strategies. Now the AI does it in seconds and the results are genuinely better. My reach doubled in 6 weeks.",
    role: "Fitness Coach",
    stars: 5,
  },
  {
    name: "Sofia Chen",
    handle: "@sofiaontech",
    avatar: "SC",
    text: "The YouTube title generator helped me break past 100K views on a single video. The titles are punchy, SEO-optimized, and actually get clicks. Incredible tool.",
    role: "Tech YouTuber",
    stars: 5,
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "8 AI-Powered Tools",
    description:
      "From captions to hashtags to reel ideas — every tool you need to dominate social media, all in one place.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Save,
    title: "Save Your Best Content",
    description:
      "Build a personal library of your best captions, titles, and ideas. Access them anytime from your dashboard.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: BarChart3,
    title: "Track Your Analytics",
    description:
      "See which tools you use most, monitor your content output, and optimize your social media workflow.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Shield,
    title: "Secure on ICP",
    description:
      "Your data lives on the Internet Computer blockchain. No servers, no data harvesting, fully sovereign.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

export default function Home() {
  const [activeTool, setActiveTool] = useState<ToolMeta | null>(null);
  const previewTools = TOOLS.slice(0, 4);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 pointer-events-none" />
        <div className="container py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 animate-fade-in">
              <Zap className="h-3 w-3 mr-1" /> Powered by AI
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Create <span className="gradient-text">Viral Content</span>{" "}
              <br className="hidden md:block" />
              in Seconds
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up delay-100">
              8 AI-powered tools to generate captions, hashtags, reel ideas,
              YouTube titles, bios, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
              <Button
                size="lg"
                className="text-base px-8 shadow-glow"
                asChild
                data-ocid="hero.primary_button"
              >
                <Link to="/signup">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8"
                asChild
                data-ocid="hero.secondary_button"
              >
                <Link to="/tools">View All Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mb-8">
        <AdBanner variant="horizontal" />
      </div>

      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Grow</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A complete toolkit built for modern creators who want to scale
            without burning out.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.bg} mx-auto mb-4`}
              >
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold mb-4">
            Our <span className="gradient-text">AI Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Pick a tool. Fill in the details. Get results instantly.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {previewTools.map((tool, i) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              index={i + 1}
              onTryNow={setActiveTool}
            />
          ))}
        </div>
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/tools">
              View All 8 Tools <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="gradient-bg py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Creators</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of creators growing their audience with Viral
              Pilot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star
                      key={`${t.name}-star-${s}`}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.handle} &bull; {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 text-center">
        <h2 className="font-display text-4xl font-bold mb-4">
          Start <span className="gradient-text">Free</span>, Scale Later
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Try Viral Pilot for free. Upgrade when you&apos;re ready to unlock
          unlimited access.
        </p>
        <Button size="lg" asChild className="shadow-glow">
          <Link to="/pricing">View Pricing Plans</Link>
        </Button>
      </section>

      <section className="gradient-bg py-16">
        <div className="container text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Start Creating{" "}
            <span className="gradient-text">Amazing Content</span> Today
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Join 10,000+ creators already using Viral Pilot to build their
            audience faster.
          </p>
          <Button size="lg" asChild className="shadow-glow text-base px-10">
            <Link to="/signup">Get Started — It&apos;s Free</Link>
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
