import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { Crown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useUpdateProfile } from "../hooks/useQueries";

export default function Profile() {
  const { profile, refreshProfile, plan } = useAuth();
  const updateProfile = useUpdateProfile();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setEmail(profile.email || "");
      setBio(profile.bio || "");
      setAvatarUrl(profile.avatarUrl || "");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Username is required");
      return;
    }
    try {
      await updateProfile.mutateAsync({
        username,
        email,
        bio,
        avatarUrl,
        plan: (plan as any) || "free",
        createdAt: profile?.createdAt ?? BigInt(Date.now()) * 1000000n,
      });
      await refreshProfile();
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <main className="container py-12 max-w-2xl">
      <h1 className="font-display text-4xl font-bold mb-2">
        Profile <span className="gradient-text">Settings</span>
      </h1>
      <p className="text-muted-foreground mb-8">
        Manage your account information and preferences.
      </p>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="glass-card rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-semibold text-lg">
              Account Details
            </h2>
            <Badge variant="secondary" className="capitalize">
              {plan === "premium" && <Crown className="h-3 w-3 mr-1" />}
              {plan} Plan
            </Badge>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              data-ocid="profile.username_input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your_username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              data-ocid="profile.email_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              data-ocid="profile.bio_textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
        </div>

        {plan === "free" && (
          <div className="glass-card rounded-xl p-5 border-primary/20 bg-primary/5">
            <p className="text-sm font-medium mb-2">Want unlimited access?</p>
            <p className="text-sm text-muted-foreground mb-3">
              Upgrade to Pro to unlock all 8 tools and save unlimited content.
            </p>
            <Button size="sm" asChild className="shadow-glow-sm">
              <Link to="/pricing">
                <Crown className="h-3 w-3 mr-1" /> Upgrade to Pro
              </Link>
            </Button>
          </div>
        )}

        <Button
          type="submit"
          className="w-full shadow-glow"
          disabled={updateProfile.isPending}
          data-ocid="profile.save_button"
        >
          {updateProfile.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {updateProfile.isPending ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </main>
  );
}
