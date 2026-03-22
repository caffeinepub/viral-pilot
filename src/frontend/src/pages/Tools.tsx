import { Sparkles } from "lucide-react";
import { useState } from "react";
import ToolCard from "../components/tools/ToolCard";
import ToolModal from "../components/tools/ToolModal";
import { TOOLS } from "../data/tools";
import type { ToolMeta } from "../data/tools";

const CATEGORIES = [
  "All",
  ...Array.from(new Set(TOOLS.map((t) => t.category))),
];

export default function Tools() {
  const [activeTool, setActiveTool] = useState<ToolMeta | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? TOOLS
      : TOOLS.filter((t) => t.category === activeCategory);

  return (
    <main className="container py-16">
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" /> 20 AI-Powered Tools
        </div>
        <h1 className="font-display text-5xl font-bold mb-4">
          Your Social Media <span className="gradient-text">Toolkit</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Every tool you need to create, optimize, and grow your social presence
          — powered by smart AI generation.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10 animate-fade-in-up delay-100">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-glow scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((tool, i) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            index={i + 1}
            onTryNow={setActiveTool}
          />
        ))}
      </div>

      <ToolModal
        tool={activeTool}
        open={!!activeTool}
        onClose={() => setActiveTool(null)}
      />
    </main>
  );
}
