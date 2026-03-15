import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Bookmark, Copy, Crown, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import {
  generateBios,
  generateCommentReplies,
  generateHashtags,
  generateInstagramCaptions,
  generatePostIdeas,
  generateReelIdeas,
  generateYouTubeTitles,
  getTrendingHashtags,
} from "../../data/templateGenerators";
import type { ToolMeta } from "../../data/tools";
import { useRecordToolUsage, useSaveContent } from "../../hooks/useQueries";

interface ToolModalProps {
  tool: ToolMeta | null;
  open: boolean;
  onClose: () => void;
}

type ReelIdea = {
  title: string;
  hook: string;
  structure: string;
  audio: string;
};
type TrendingTag = { tag: string; posts: string; trend: string };

export default function ToolModal({ tool, open, onClose }: ToolModalProps) {
  const { isAuthenticated, plan, principal } = useAuth();
  const saveContentMutation = useSaveContent();
  const recordUsage = useRecordToolUsage();

  const [topic, setTopic] = useState("");
  const [mood, setMood] = useState("happy");
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [style, setStyle] = useState("educational");
  const [vidType, setVidType] = useState("tutorial");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [bioPlatform, setBioPlatform] = useState("instagram");
  const [category, setCategory] = useState("fashion");
  const [frequency, setFrequency] = useState("weekly");
  const [comment, setComment] = useState("");
  const [tone, setTone] = useState("friendly");

  const [results, setResults] = useState<
    string[] | ReelIdea[] | TrendingTag[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  const isPremiumLocked = tool?.isPremium && plan === "free";

  const handleGenerate = async () => {
    if (!tool) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    let output: string[] | ReelIdea[] | TrendingTag[] | null = null;
    switch (tool.id) {
      case "instagram-caption":
        output = generateInstagramCaptions(topic || "life", mood);
        break;
      case "hashtag-generator":
        output = generateHashtags(niche || "content creation", platform);
        break;
      case "reel-ideas":
        output = generateReelIdeas(niche || "content creation", style);
        break;
      case "youtube-title":
        output = generateYouTubeTitles(topic || "my topic", vidType);
        break;
      case "bio-generator":
        output = generateBios(
          name || "Your Name",
          profession || "Creator",
          bioPlatform,
        );
        break;
      case "trending-hashtags":
        output = getTrendingHashtags(category);
        break;
      case "post-ideas":
        output = generatePostIdeas(niche || "your niche", frequency);
        break;
      case "comment-reply":
        output = generateCommentReplies(comment || "Great post!", tone);
        break;
    }
    setResults(output);
    setLoading(false);

    if (isAuthenticated) {
      recordUsage.mutate(tool.id);
    }
  };

  const handleSave = async (content: string) => {
    if (!isAuthenticated || !tool || !principal) {
      toast.error("Please login to save content");
      return;
    }
    try {
      const { Principal } = await import("@icp-sdk/core/principal");
      await saveContentMutation.mutateAsync({
        id: `${tool.id}-${Date.now()}`,
        content,
        owner: Principal.fromText(principal),
        createdAt: BigInt(Date.now()) * 1000000n,
        tags: [tool.category],
        toolName: tool.id,
      });
      toast.success("Content saved to your profile!");
    } catch {
      toast.error("Failed to save content");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleClose = () => {
    setResults(null);
    setTopic("");
    setNiche("");
    setComment("");
    setName("");
    setProfession("");
    onClose();
  };

  if (!tool) return null;
  const Icon = tool.icon;

  const isStringArray = (arr: unknown[]): arr is string[] =>
    typeof arr[0] === "string";
  const isReelArray = (arr: unknown[]): arr is ReelIdea[] =>
    arr.length > 0 &&
    typeof (arr[0] as ReelIdea).title === "string" &&
    typeof (arr[0] as ReelIdea).hook === "string";
  const isTrendingArray = (arr: unknown[]): arr is TrendingTag[] =>
    arr.length > 0 && typeof (arr[0] as TrendingTag).tag === "string";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="tool_modal.dialog"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                tool.bgColor,
              )}
            >
              <Icon className={cn("h-5 w-5", tool.color)} />
            </div>
            <DialogTitle className="font-display text-xl">
              {tool.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        {isPremiumLocked ? (
          <div className="text-center py-8">
            <Crown className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">
              Pro Feature
            </h3>
            <p className="text-muted-foreground mb-6">
              Upgrade to Pro or Premium to unlock this tool.
            </p>
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <a href="/pricing">Upgrade Now</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            {tool.id === "instagram-caption" && (
              <>
                <div className="space-y-2">
                  <Label>Topic or Keyword</Label>
                  <Input
                    data-ocid="tool_modal.input"
                    placeholder="e.g. morning coffee, fitness, travel"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mood</Label>
                  <Select value={mood} onValueChange={setMood}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="happy">Happy &amp; Fun</SelectItem>
                      <SelectItem value="inspirational">
                        Inspirational
                      </SelectItem>
                      <SelectItem value="funny">Funny</SelectItem>
                      <SelectItem value="aesthetic">Aesthetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {tool.id === "hashtag-generator" && (
              <>
                <div className="space-y-2">
                  <Label>Your Niche</Label>
                  <Input
                    data-ocid="tool_modal.input"
                    placeholder="e.g. fitness, food blogging, tech"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {tool.id === "reel-ideas" && (
              <>
                <div className="space-y-2">
                  <Label>Your Niche</Label>
                  <Input
                    data-ocid="tool_modal.input"
                    placeholder="e.g. personal finance, beauty"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="entertaining">Entertaining</SelectItem>
                      <SelectItem value="inspiring">Inspiring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {tool.id === "youtube-title" && (
              <>
                <div className="space-y-2">
                  <Label>Video Topic</Label>
                  <Input
                    data-ocid="tool_modal.input"
                    placeholder="e.g. beginner budgeting"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Video Type</Label>
                  <Select value={vidType} onValueChange={setVidType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                      <SelectItem value="vlog">Vlog</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="listicle">Listicle / List</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {tool.id === "bio-generator" && (
              <>
                <div className="space-y-2">
                  <Label>Your Name</Label>
                  <Input
                    data-ocid="tool_modal.input"
                    placeholder="e.g. Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Your Profession / Role</Label>
                  <Input
                    placeholder="e.g. Fitness Coach, Travel Blogger"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={bioPlatform} onValueChange={setBioPlatform}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {tool.id === "trending-hashtags" && (
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {tool.id === "post-ideas" && (
              <>
                <div className="space-y-2">
                  <Label>Your Niche</Label>
                  <Input
                    data-ocid="tool_modal.input"
                    placeholder="e.g. plant-based cooking"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Posting Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {tool.id === "comment-reply" && (
              <>
                <div className="space-y-2">
                  <Label>Original Comment</Label>
                  <Textarea
                    data-ocid="tool_modal.input"
                    placeholder="Paste the comment you want to reply to"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reply Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="funny">Funny</SelectItem>
                      <SelectItem value="empathetic">Empathetic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full"
              data-ocid="tool_modal.submit_button"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {loading ? "Generating..." : "Generate ✨"}
            </Button>

            {results && results.length > 0 && (
              <div className="space-y-3 animate-scale-in">
                <div className="h-px bg-border" />
                <h4 className="font-semibold text-sm">Generated Results</h4>

                {tool.id === "trending-hashtags" &&
                  isTrendingArray(results) && (
                    <div className="grid grid-cols-2 gap-2">
                      {results.map((item) => (
                        <div
                          key={item.tag}
                          className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-sm"
                        >
                          <span className="font-medium text-primary">
                            {item.tag}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>{item.posts}</span>
                            <span>{item.trend}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {tool.id === "hashtag-generator" && isStringArray(results) && (
                  <div className="flex flex-wrap gap-2">
                    {results.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => copyToClipboard(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {tool.id === "reel-ideas" && isReelArray(results) && (
                  <div className="space-y-3">
                    {results.map((idea) => (
                      <div
                        key={idea.title}
                        className="p-4 rounded-lg bg-muted/50 space-y-1"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-sm">{idea.title}</p>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 shrink-0"
                            onClick={() => copyToClipboard(idea.title)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          🎣 Hook: {idea.hook}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          🎬 Structure: {idea.structure}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          🎵 Audio: {idea.audio}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {(tool.id === "instagram-caption" ||
                  tool.id === "bio-generator" ||
                  tool.id === "comment-reply") &&
                  isStringArray(results) && (
                    <div className="space-y-3">
                      {results.map((text) => (
                        <div key={text} className="p-4 rounded-lg bg-muted/50">
                          <p className="text-sm whitespace-pre-wrap mb-2">
                            {text}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(text)}
                            >
                              <Copy className="h-3 w-3 mr-1" /> Copy
                            </Button>
                            {isAuthenticated && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSave(text)}
                                disabled={saveContentMutation.isPending}
                                data-ocid="tool_modal.save_button"
                              >
                                <Bookmark className="h-3 w-3 mr-1" /> Save
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {(tool.id === "youtube-title" || tool.id === "post-ideas") &&
                  isStringArray(results) && (
                    <div className="space-y-2">
                      {results.map((text) => (
                        <div
                          key={text}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-2"
                        >
                          <p className="text-sm flex-1">{text}</p>
                          <div className="flex gap-1 shrink-0">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={() => copyToClipboard(text)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            {isAuthenticated && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7"
                                onClick={() => handleSave(text)}
                                data-ocid="tool_modal.save_button"
                              >
                                <Bookmark className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
