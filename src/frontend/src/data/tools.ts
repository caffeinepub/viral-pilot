import {
  BarChart2,
  BookOpen,
  Calendar,
  Film,
  Hash,
  Instagram,
  Lightbulb,
  Linkedin,
  MessageCircle,
  Mic,
  Music,
  PenTool,
  Repeat,
  Send,
  Star,
  TrendingUp,
  Twitter,
  User,
  Youtube,
  Zap,
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
  badge?: string;
}

export const TOOLS: ToolMeta[] = [
  {
    id: "hashtag-generator",
    name: "Hashtag Generator Pro",
    description:
      "Generate 30–50 high-reach, niche-specific hashtags to maximize your post visibility across all platforms.",
    icon: Hash,
    category: "Hashtags",
    isPremium: false,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    badge: "Most Used",
  },
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
    badge: "Trending",
  },
  {
    id: "reel-ideas",
    name: "Reel Script Generator",
    description:
      "Get complete reel scripts with hook, content structure, voiceover, and CTA for maximum views.",
    icon: Film,
    category: "Reels",
    isPremium: false,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    badge: "Trending",
  },
  {
    id: "youtube-title",
    name: "YouTube Title & Description",
    description:
      "Generate SEO-optimized, click-worthy YouTube titles and full descriptions that rank and drive views.",
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
      "Craft a professional, personality-driven bio for Instagram, YouTube, LinkedIn, or Twitter in seconds.",
    icon: User,
    category: "Profile",
    isPremium: false,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "trending-hashtags",
    name: "Trending Hashtags Finder",
    description:
      "Discover what's trending right now across fashion, food, fitness, travel & more niches.",
    icon: TrendingUp,
    category: "Hashtags",
    isPremium: false,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "post-ideas",
    name: "Content Ideas Generator",
    description:
      "Get a week's worth of engaging content ideas with post angles, hooks, and formats for your niche.",
    icon: Lightbulb,
    category: "Content",
    isPremium: false,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    badge: "Pro Favorite",
  },
  {
    id: "viral-hook",
    name: "Viral Hook Generator",
    description:
      "Generate irresistible first lines for reels, stories, and posts that stop the scroll instantly.",
    icon: Zap,
    category: "Content",
    isPremium: false,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    badge: "New",
  },
  {
    id: "cta-generator",
    name: "CTA Generator",
    description:
      "Create powerful call-to-action lines that convert viewers into followers, leads, and customers.",
    icon: Send,
    category: "Engagement",
    isPremium: false,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    id: "thread-generator",
    name: "Thread / Tweet Generator",
    description:
      "Write engaging Twitter/X threads and viral tweets that grow your following and get massive retweets.",
    icon: Twitter,
    category: "Twitter",
    isPremium: true,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
  {
    id: "linkedin-post",
    name: "LinkedIn Post Generator",
    description:
      "Create professional, algorithm-friendly LinkedIn posts that build authority and drive engagement.",
    icon: Linkedin,
    category: "LinkedIn",
    isPremium: false,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    badge: "New",
  },
  {
    id: "story-ideas",
    name: "Instagram Story Ideas",
    description:
      "Get creative story sequences with polls, Q&As, and interactive ideas that boost your engagement rate.",
    icon: BookOpen,
    category: "Instagram",
    isPremium: false,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    id: "comment-reply",
    name: "AI Comment Reply Generator",
    description:
      "Generate thoughtful, on-brand replies to comments that boost engagement and build community.",
    icon: MessageCircle,
    category: "Engagement",
    isPremium: true,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
  {
    id: "content-calendar",
    name: "Content Calendar Generator",
    description:
      "Build a 30-day content calendar with themes, topics, and post types tailored to your niche.",
    icon: Calendar,
    category: "Content",
    isPremium: true,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    badge: "Pro Favorite",
  },
  {
    id: "tiktok-script",
    name: "TikTok Script Generator",
    description:
      "Create trending TikTok video scripts with hooks, talking points, and text overlays for viral content.",
    icon: Music,
    category: "TikTok",
    isPremium: false,
    color: "text-fuchsia-500",
    bgColor: "bg-fuchsia-500/10",
    badge: "Trending",
  },
  {
    id: "youtube-shorts",
    name: "YouTube Shorts Ideas",
    description:
      "Generate 10 Shorts video ideas with titles, hooks, and thumbnail concepts for maximum views.",
    icon: Repeat,
    category: "YouTube",
    isPremium: false,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    badge: "New",
  },
  {
    id: "influencer-pitch",
    name: "Influencer Pitch Email Writer",
    description:
      "Write professional pitch emails to brands and sponsors that get replies and collaborations.",
    icon: Star,
    category: "Business",
    isPremium: true,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    id: "engagement-calculator",
    name: "Engagement Rate Calculator",
    description:
      "Calculate your real engagement rate and get actionable tips to improve it across platforms.",
    icon: BarChart2,
    category: "Analytics",
    isPremium: false,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: "viral-poll",
    name: "Viral Poll Generator",
    description:
      "Create compelling polls and questions that spark debates, boost engagement, and grow your reach.",
    icon: PenTool,
    category: "Engagement",
    isPremium: false,
    color: "text-lime-500",
    bgColor: "bg-lime-500/10",
    badge: "New",
  },
  {
    id: "podcast-intro",
    name: "Podcast / Audio Intro Writer",
    description:
      "Write catchy podcast episode intros, descriptions, and show notes that attract listeners.",
    icon: Mic,
    category: "Audio",
    isPremium: true,
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
  },
];
