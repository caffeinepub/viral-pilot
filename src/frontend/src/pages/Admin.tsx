import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  useAdminContacts,
  useAdminUsers,
  usePlatformStats,
  useTotalUsageStats,
  useTotalUserCount,
} from "../hooks/useQueries";

const ADMIN_ID = "iasim78666@gmail.com";
const ADMIN_PASS = "Arooj143666";
const STORAGE_KEY = "vp_admin_auth";

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email.trim() === ADMIN_ID && password === ADMIN_PASS) {
        localStorage.setItem(STORAGE_KEY, "1");
        onLogin();
      } else {
        setError("ID ya password galat hai. Dobara try karo.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="glass-card rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col items-center mb-6">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Viral Pilot Admin Panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email ID</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Checking..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

function AdminDashboard() {
  const { data: users, isLoading: loadingUsers } = useAdminUsers();
  const { data: contacts, isLoading: loadingContacts } = useAdminContacts();
  const { data: platformStats } = usePlatformStats();
  const { data: totalUsers } = useTotalUserCount();
  const { data: usageStats } = useTotalUsageStats();

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  const maxStat =
    platformStats?.reduce((m, s) => Math.max(m, Number(s.count)), 0) || 1;

  const totalUsersNum = totalUsers !== undefined ? Number(totalUsers) : 0;
  const estimatedRevenue = totalUsersNum * 100;
  const revenueFormatted = estimatedRevenue.toLocaleString("en-IN");

  const adminStats = [
    {
      label: "Total Users",
      value: totalUsersNum.toString(),
      icon: Users,
      color: "text-violet-500",
    },
    {
      label: "Total Tool Uses",
      value:
        usageStats?.totalUses !== undefined
          ? Number(usageStats.totalUses).toString()
          : "0",
      icon: Zap,
      color: "text-blue-500",
    },
    {
      label: "Saved Items",
      value:
        users
          ?.reduce((a, u) => a + Number(u.savedContentCount), 0)
          .toString() || "0",
      icon: BarChart3,
      color: "text-green-500",
    },
    {
      label: "Contact Messages",
      value: (contacts?.length || 0).toString(),
      icon: MessageSquare,
      color: "text-pink-500",
    },
  ];

  return (
    <main className="container py-12">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-4xl font-bold">
          Admin <span className="gradient-text">Panel</span>
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      <p className="text-muted-foreground mb-10">
        Platform overview and management.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {adminStats.map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-xs text-muted-foreground">
              Estimated Revenue
            </span>
          </div>
          <p className="font-display text-2xl font-bold text-green-500">
            ₹{revenueFormatted}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Based on ₹100/user average
          </p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground">
              Platform Status
            </span>
          </div>
          <p className="font-display text-2xl font-bold">🟢 Live 24x7</p>
          <p className="text-xs text-muted-foreground mt-1">
            Hosted on Internet Computer — 100% uptime
          </p>
        </div>
      </div>

      <section className="glass-card rounded-xl p-6 mb-8">
        <h2 className="font-display text-xl font-semibold mb-5">
          Revenue Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">{totalUsersNum}</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-500">
              ₹{revenueFormatted}
            </p>
            <p className="text-sm text-muted-foreground">Potential Revenue</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">₹100</p>
            <p className="text-sm text-muted-foreground">Per User Value</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary/10 to-green-500/10 rounded-lg p-4 text-center">
          <p className="text-sm font-medium">
            🚀 Keep growing! Every new user = ₹100 potential. Share Viral Pilot
            to grow your revenue!
          </p>
        </div>
      </section>

      {platformStats && platformStats.length > 0 && (
        <section className="glass-card rounded-xl p-6 mb-8">
          <h2 className="font-display text-xl font-semibold mb-5">
            Tool Usage Breakdown
          </h2>
          <div className="space-y-3">
            {platformStats
              .sort((a, b) => Number(b.count) - Number(a.count))
              .map((stat) => (
                <div key={stat.toolName} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {stat.toolName}
                    </span>
                    <span className="font-medium">{Number(stat.count)}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{
                        width: `${(Number(stat.count) / maxStat) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      <section className="glass-card rounded-xl p-6 mb-8">
        <h2 className="font-display text-xl font-semibold mb-5">All Users</h2>
        {loadingUsers ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Tool Uses</TableHead>
                <TableHead>Saved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-8"
                  >
                    No users yet
                  </TableCell>
                </TableRow>
              )}
              {users?.map((u, i) => (
                <TableRow key={u.profile.username || `user-${i}`}>
                  <TableCell>{u.profile.username || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {u.profile.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>{Number(u.totalUsage)}</TableCell>
                  <TableCell>{Number(u.savedContentCount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>

      <section className="glass-card rounded-xl p-6 mb-8">
        <h2 className="font-display text-xl font-semibold mb-5">
          Contact Submissions
        </h2>
        {loadingContacts ? (
          <div className="space-y-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <div className="space-y-3">
            {contacts?.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">
                No contact submissions yet.
              </p>
            )}
            {contacts?.map((c) => (
              <div
                key={`${c.name}-${c.email}`}
                className="p-4 rounded-lg bg-muted/50"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                </div>
                <p className="text-sm text-muted-foreground">{c.message}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="glass-card rounded-xl p-6">
        <h2 className="font-display text-xl font-semibold mb-3">
          Admin Support
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Support Email</p>
            <a
              href="mailto:aurexsupport666@gmail.com"
              className="text-sm text-primary hover:underline"
            >
              aurexsupport666@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "1",
  );

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return <AdminDashboard />;
}
