import { Hash, Instagram, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ToolMeta {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  isPremium: boolean;
  color: string;
  bgColor: string;
  badge?: string;
}

export const TOOLS: ToolMeta[] = [
  {
    id: "instagram-caption",
    name: "AI Caption Generator",
    description:
      "Create scroll-stopping Instagram captions tailored to your topic and mood with emojis and CTAs.",
    icon: Instagram,
    category: "Captions",
    isPremium: false,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    badge: "Trending",
  },
  {
    id: "hashtag-generator",
    name: "Hashtag Generator",
    description:
      "Generate 30–50 high-reach niche-specific hashtags to maximize your post visibility.",
    icon: Hash,
    category: "Hashtags",
    isPremium: false,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    badge: "Most Used",
  },
  {
    id: "post-ideas",
    name: "Viral Content Ideas",
    description:
      "Get a week of engaging content ideas with post angles, hooks, and formats for your niche.",
    icon: Lightbulb,
    category: "Content",
    isPremium: false,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    badge: "Pro Favorite",
  },
];
