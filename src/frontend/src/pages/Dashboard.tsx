import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  Crown,
  LayoutDashboard,
  Star,
  Trash2,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import AdBanner from "../components/layout/AdBanner";
import { useAuth } from "../context/AuthContext";
import { TOOLS } from "../data/tools";
import {
  useDeleteContent,
  useFavoriteTools,
  useSavedContent,
  useSavedContentCount,
} from "../hooks/useQueries";

export default function Dashboard() {
  const { profile, plan, principal } = useAuth();
  const { data: savedContent, isLoading: loadingContent } = useSavedContent();
  const { data: savedCount } = useSavedContentCount();
  const { data: favoriteToolIds } = useFavoriteTools();
  const deleteContent = useDeleteContent();

  const username = profile?.username || principal?.slice(0, 8) || "Creator";
  const favoriteTools = TOOLS.filter((t) => favoriteToolIds?.includes(t.id));
  const recentContent = savedContent?.slice(0, 5) || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteContent.mutateAsync(id);
      toast.success("Content deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const planBadge: Record<string, { label: string; className: string }> = {
    free: { label: "Free", className: "bg-muted text-muted-foreground" },
    pro: { label: "Pro", className: "bg-primary/20 text-primary" },
    premium: { label: "Premium", className: "bg-accent/20 text-accent" },
  };

  const stats = [
    {
      label: "Saved Content",
      value: savedCount !== undefined ? Number(savedCount).toString() : "0",
      icon: Bookmark,
      color: "text-violet-500",
    },
    {
      label: "Tools Available",
      value: plan === "free" ? "4" : "8",
      icon: Zap,
      color: "text-blue-500",
    },
    {
      label: "Favorite Tools",
      value: (favoriteToolIds?.length || 0).toString(),
      icon: Star,
      color: "text-yellow-500",
    },
    {
      label: "Current Plan",
      value: plan.charAt(0).toUpperCase() + plan.slice(1),
      icon: LayoutDashboard,
      color: "text-green-500",
    },
  ];

  return (
    <main className="container py-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold mb-1">
            Welcome back, <span className="gradient-text">{username}</span>! 👋
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s your content creation overview.
          </p>
        </div>
        <Badge className={planBadge[plan]?.className}>
          {plan === "premium" && <Crown className="h-3 w-3 mr-1" />}
          {planBadge[plan]?.label} Plan
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <p className="font-display text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-semibold">
                Recent Saved Content
              </h2>
              {recentContent.length > 0 && (
                <Badge variant="secondary">{recentContent.length} items</Badge>
              )}
            </div>
            {loadingContent ? (
              <div className="space-y-3" data-ocid="dashboard.loading_state">
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            ) : recentContent.length === 0 ? (
              <div
                className="text-center py-8 text-muted-foreground"
                data-ocid="dashboard.saved_content.empty_state"
              >
                <Bookmark className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">
                  No saved content yet. Try a tool and save your results!
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <Link to="/tools">Explore Tools</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentContent.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-3 rounded-lg bg-muted/50 gap-3"
                    data-ocid={`dashboard.saved_content.item.${i + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.toolName}
                      </p>
                      <p className="text-sm truncate">{item.content}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(item.id)}
                      data-ocid={`dashboard.delete_button.${i + 1}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="glass-card rounded-xl p-6">
            <h2 className="font-display text-xl font-semibold mb-5">
              Favorite Tools
            </h2>
            {favoriteTools.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No favorites yet. Star your most-used tools for quick access.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {favoriteTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Button
                      key={tool.id}
                      variant="outline"
                      className="justify-start gap-2 h-auto py-3"
                      asChild
                    >
                      <Link to="/tools">
                        <Icon className={`h-4 w-4 ${tool.color}`} />
                        <span className="text-sm">{tool.name}</span>
                      </Link>
                    </Button>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/tools">
                  <Zap className="h-4 w-4 mr-2" />
                  Use a Tool
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/profile">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
              {plan === "free" && (
                <Button className="w-full justify-start shadow-glow-sm" asChild>
                  <Link to="/pricing">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Pro
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <AdBanner variant="sidebar" />
        </aside>
      </div>
    </main>
  );
}
