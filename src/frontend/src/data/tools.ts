import {
  Film,
  Hash,
  Instagram,
  Lightbulb,
  MessageCircle,
  TrendingUp,
  User,
  Youtube,
} from "lucide-react";
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
}

export const TOOLS: ToolMeta[] = [
  {
    id: "instagram-caption",
    name: "Instagram Caption Generator",
    description:
      "Create scroll-stopping Instagram captions tailored to your topic and mood with emojis and CTAs.",
    icon: Instagram,
    category: "Instagram",
    isPremium: false,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    id: "hashtag-generator",
    name: "AI Hashtag Generator",
    description:
      "Generate 15–20 high-reach, niche-specific hashtags to maximize your post visibility.",
    icon: Hash,
    category: "Hashtags",
    isPremium: false,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    id: "reel-ideas",
    name: "Viral Reel Ideas Generator",
    description:
      "Get 5 trending reel concepts with hooks, structure, and viral potential for your niche.",
    icon: Film,
    category: "Reels",
    isPremium: false,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "youtube-title",
    name: "YouTube Title Generator",
    description:
      "Generate SEO-optimized, click-worthy YouTube titles that rank and drive views.",
    icon: Youtube,
    category: "YouTube",
    isPremium: false,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: "bio-generator",
    name: "Social Media Bio Generator",
    description:
      "Craft a professional, personality-driven bio for any platform in seconds.",
    icon: User,
    category: "Profile",
    isPremium: true,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "trending-hashtags",
    name: "Trending Hashtags Finder",
    description:
      "Discover what's trending right now across fashion, food, fitness, travel & more.",
    icon: TrendingUp,
    category: "Hashtags",
    isPremium: false,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "post-ideas",
    name: "Post Idea Generator",
    description:
      "Never run out of ideas — get a week's worth of engaging content ideas for your niche.",
    icon: Lightbulb,
    category: "Content",
    isPremium: true,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: "comment-reply",
    name: "AI Comment Reply Generator",
    description:
      "Generate thoughtful, on-brand replies to comments that boost engagement.",
    icon: MessageCircle,
    category: "Engagement",
    isPremium: true,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
];
