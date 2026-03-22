import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Save,
  Shield,
  Sparkles,
  Star,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
    title: "20+ AI-Powered Tools",
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

const TOOL_BADGES = [
  {
    label: "🔥 Trending",
    className: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
  {
    label: "⭐ Most Used",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  {
    label: "🚀 New",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    label: "💎 Pro Favorite",
    className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
];

const STATS = [
  {
    end: 2000000,
    suffix: "+",
    label: "Hashtags Generated",
    display: "20,00,000+",
  },
  { end: 150000, suffix: "+", label: "Happy Creators", display: "1,50,000+" },
  { end: 50, suffix: "+", label: "AI Tools & Features", display: "50+" },
  {
    end: 4.9,
    suffix: "/5",
    label: "Creator Rating",
    display: "4.9/5",
    isFloat: true,
  },
];

const TICKER_MESSAGES = [
  "🔥 @rahul_creates just generated 100 hashtags",
  "⭐ @priya.social unlocked Pro plan",
  "🚀 @techblogger generated a viral reel script",
  "💎 @fashionista_k got 340% more reach",
  "🎯 @amit_vlogs created 30 YouTube titles in seconds",
  "🌟 @neha.lifestyle doubled her engagement overnight",
  "🔥 @fitness_raj got 10K new followers this week",
  "💡 @startup_sid wrote 50 captions in 2 minutes",
  "🚀 @travel_pooja viral reel got 1M views",
  "⭐ @chef_arjun's food content blew up overnight",
  "💎 @beauty_meera gained 5K followers in 3 days",
  "🎉 @dance_divya's reel reached 2M people",
];

const HASHTAG_DATA: Record<string, string[]> = {
  fitness: [
    "#fitness",
    "#workout",
    "#gym",
    "#fitnessmotivation",
    "#fit",
    "#health",
    "#training",
    "#bodybuilding",
    "#exercise",
    "#weightloss",
    "#healthylifestyle",
    "#motivation",
    "#fitlife",
    "#personaltrainer",
    "#cardio",
    "#gains",
    "#fitfam",
    "#muscle",
    "#crossfit",
    "#wellness",
    "#yoga",
    "#running",
    "#lifting",
    "#strengthtraining",
    "#gymlife",
  ],
  food: [
    "#food",
    "#foodie",
    "#foodphotography",
    "#instafood",
    "#yummy",
    "#delicious",
    "#foodstagram",
    "#cooking",
    "#homecooking",
    "#recipe",
    "#healthyfood",
    "#foodlover",
    "#tasty",
    "#dinner",
    "#lunch",
    "#breakfast",
    "#vegan",
    "#vegetarian",
    "#streetfood",
    "#chef",
    "#baking",
    "#dessert",
    "#pizza",
    "#foodblogger",
    "#eatwell",
  ],
  travel: [
    "#travel",
    "#wanderlust",
    "#travelgram",
    "#instatravel",
    "#travelblogger",
    "#adventure",
    "#explore",
    "#vacation",
    "#holiday",
    "#travelphotography",
    "#backpacker",
    "#roadtrip",
    "#nature",
    "#mountains",
    "#beach",
    "#sunset",
    "#worldtravel",
    "#nomad",
    "#travelholic",
    "#passport",
    "#trip",
    "#destination",
    "#travellife",
    "#tourism",
    "#journey",
  ],
  fashion: [
    "#fashion",
    "#style",
    "#ootd",
    "#fashionista",
    "#outfit",
    "#streetstyle",
    "#trendy",
    "#clothing",
    "#instafashion",
    "#fashionblogger",
    "#model",
    "#beauty",
    "#makeup",
    "#accessories",
    "#luxury",
    "#designer",
    "#vintage",
    "#shoplocal",
    "#stylish",
    "#looks",
    "#glamour",
    "#chic",
    "#womensfashion",
    "#mensfashion",
    "#clothes",
  ],
  tech: [
    "#technology",
    "#tech",
    "#innovation",
    "#coding",
    "#programming",
    "#developer",
    "#software",
    "#AI",
    "#machinelearning",
    "#startup",
    "#entrepreneur",
    "#digital",
    "#cybersecurity",
    "#cloud",
    "#datascience",
    "#python",
    "#javascript",
    "#webdev",
    "#mobile",
    "#gadgets",
    "#iot",
    "#blockchain",
    "#future",
    "#automation",
    "#deeplearning",
  ],
  beauty: [
    "#beauty",
    "#makeup",
    "#skincare",
    "#beautytips",
    "#selfcare",
    "#glam",
    "#cosmetics",
    "#beautyinfluencer",
    "#skincareroutine",
    "#foundation",
    "#eyeshadow",
    "#lipstick",
    "#contour",
    "#highlighter",
    "#beautyproducts",
    "#naturalmakeup",
    "#glowing",
    "#antiaging",
    "#beautyblogger",
    "#makeuptutorial",
    "#glow",
    "#luxuryskincare",
    "#cleanskin",
    "#beautycare",
    "#makeuplooks",
  ],
};

function generateHashtags(niche: string): string[] {
  const lower = niche.toLowerCase().trim();
  for (const key of Object.keys(HASHTAG_DATA)) {
    if (lower.includes(key) || key.includes(lower)) {
      return HASHTAG_DATA[key];
    }
  }
  // Generic fallback
  return [
    `#${lower.replace(/\s+/g, "")}`,
    `#${lower.replace(/\s+/g, "")}creator`,
    `#${lower.replace(/\s+/g, "")}life`,
    "#content",
    "#viral",
    "#trending",
    "#socialmedia",
    "#instagram",
    "#reels",
    "#explore",
    "#instagood",
    "#follow",
    "#like",
    "#share",
    "#creator",
    "#influencer",
    "#growth",
    "#engagement",
    "#digital",
    "#marketing",
    "#brand",
    "#community",
    "#creative",
    "#lifestyle",
    "#inspiration",
    "#motivation",
    "#success",
  ];
}

function useCountUp(end: number, isFloat = false, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const steps = duration / step;
    const increment = end / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(isFloat ? Math.round(start * 10) / 10 : Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [end, isFloat, started]);
  return count;
}

function StatCard({
  stat,
  started,
}: { stat: (typeof STATS)[0]; started: boolean }) {
  const count = useCountUp(stat.end, stat.isFloat, started);
  const formattedDisplay = started
    ? stat.isFloat
      ? `${count.toFixed(1)}/5`
      : stat.suffix === "+"
        ? `${count.toLocaleString("en-IN")}+`
        : `${count}${stat.suffix}`
    : stat.display;

  return (
    <div className="glass-card rounded-xl p-6 text-center">
      <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
        {formattedDisplay}
      </div>
      <div className="text-muted-foreground text-sm font-medium">
        {stat.label}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTool, setActiveTool] = useState<ToolMeta | null>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Demo hashtag tool state
  const [demoNiche, setDemoNiche] = useState("");
  const [demoHashtags, setDemoHashtags] = useState<string[]>([]);
  const [demoGenerated, setDemoGenerated] = useState(false);

  const previewTools = TOOLS.slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  function handleDemoGenerate() {
    if (!demoNiche.trim()) return;
    const tags = generateHashtags(demoNiche);
    setDemoHashtags(tags);
    setDemoGenerated(true);
  }

  return (
    <main>
      {/* Hero */}
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
              20+ AI-powered tools to generate captions, hashtags, reel ideas,
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
                <Link to="/tools">View All 20+ Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <div className="overflow-hidden border-y border-border/50 bg-muted/20 py-3">
        <div
          className="flex"
          style={{ animation: "marquee 40s linear infinite" }}
        >
          {TICKER_MESSAGES.concat(TICKER_MESSAGES.map((m) => `${m} `)).map(
            (msg) => (
              <span
                key={msg}
                className="whitespace-nowrap px-8 text-sm text-muted-foreground font-medium"
              >
                {msg.trim()}
                <span className="mx-6 opacity-30">•</span>
              </span>
            ),
          )}
        </div>
      </div>

      <div className="container mb-8 mt-8">
        <AdBanner variant="horizontal" />
      </div>

      {/* Animated Stats */}
      <section className="container py-16" ref={statsRef}>
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold mb-2">
            Trusted by <span className="gradient-text">Millions</span> of
            Creators
          </h2>
          <p className="text-muted-foreground">Real numbers. Real growth.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} started={statsStarted} />
          ))}
        </div>
      </section>

      {/* Free Demo Tool */}
      <section className="gradient-bg py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" /> Try For Free — No Signup
              Needed
            </Badge>
            <h2 className="font-display text-4xl font-bold mb-4">
              Generate Hashtags <span className="gradient-text">Instantly</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Enter your niche below and get 25 powerful hashtags in seconds.
              Zero login required.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex gap-3 mb-6">
              <Input
                placeholder="Enter your niche (e.g. fitness, food, travel...)"
                value={demoNiche}
                onChange={(e) => setDemoNiche(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleDemoGenerate()}
                className="text-base"
                data-ocid="demo.input"
              />
              <Button
                onClick={handleDemoGenerate}
                className="shadow-glow shrink-0"
                data-ocid="demo.primary_button"
                disabled={!demoNiche.trim()}
              >
                Generate <Zap className="ml-2 h-4 w-4" />
              </Button>
            </div>
            {demoGenerated && demoHashtags.length > 0 && (
              <div className="space-y-4" data-ocid="demo.success_state">
                <div className="flex flex-wrap gap-2">
                  {demoHashtags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
                      onClick={() => navigator.clipboard?.writeText(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Click any hashtag to copy • Unlock 100+ hashtags by signing up
                  free
                </p>
                <div className="text-center pt-2">
                  <Button asChild className="shadow-glow">
                    <Link to="/signup">
                      Get Full Access — It&apos;s Free{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
            {!demoGenerated && (
              <div className="flex gap-2 flex-wrap justify-center">
                {["fitness", "food", "travel", "fashion", "tech"].map(
                  (niche) => (
                    <button
                      key={niche}
                      type="button"
                      onClick={() => {
                        setDemoNiche(niche);
                        setDemoHashtags(generateHashtags(niche));
                        setDemoGenerated(true);
                      }}
                      className="px-3 py-1 rounded-full border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      #{niche}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
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

      {/* AI Tools Preview with Badges */}
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
            <div key={tool.id} className="relative">
              {TOOL_BADGES[i] && (
                <div className="absolute -top-2 left-4 z-10">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border ${TOOL_BADGES[i].className}`}
                  >
                    {TOOL_BADGES[i].label}
                  </span>
                </div>
              )}
              <ToolCard tool={tool} index={i + 1} onTryNow={setActiveTool} />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/tools">
              View All 20+ Tools <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Before / After */}
      <section className="gradient-bg py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold mb-4">
              Why Creators <span className="gradient-text">Love Us</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              See the difference Viral Pilot makes in your content journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Without */}
            <div className="glass-card rounded-2xl p-6 border border-red-500/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="font-display font-bold text-lg text-red-400">
                  Without Viral Pilot
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Spend 2 hours writing captions",
                  "Get 50 likes on average",
                  "Struggle with hashtags daily",
                  "Run out of content ideas",
                  "Miss trending topics",
                  "Low reach & engagement",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* With */}
            <div className="glass-card rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="font-display font-bold text-lg text-green-400">
                  With Viral Pilot ✨
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Generate in 5 seconds flat",
                  "Get 5,000+ likes consistently",
                  "100 perfect hashtags instantly",
                  "30-day content calendar ready",
                  "Always on top of trends",
                  "10x reach & viral growth",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold mb-4">
            Loved by <span className="gradient-text">Creators</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of creators growing their audience with Viral Pilot.
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
      </section>

      {/* Pricing CTA */}
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

      {/* Final CTA */}
      <section className="gradient-bg py-16">
        <div className="container text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Start Creating{" "}
            <span className="gradient-text">Amazing Content</span> Today
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Join 1,50,000+ creators already using Viral Pilot to build their
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

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
