import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Loader2,
  Mail,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";
import {
  useAdminContacts,
  useAdminUsers,
  usePlatformStats,
  useTotalUsageStats,
  useTotalUserCount,
} from "../hooks/useQueries";

export default function Admin() {
  const { isAuthenticated } = useAuth();
  const { actor, isFetching } = useActor();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const { data: users, isLoading: loadingUsers } = useAdminUsers();
  const { data: contacts, isLoading: loadingContacts } = useAdminContacts();
  const { data: platformStats } = usePlatformStats();
  const { data: totalUsers } = useTotalUserCount();
  const { data: usageStats } = useTotalUsageStats();

  useEffect(() => {
    if (!actor || isFetching || !isAuthenticated) return;
    actor
      .isCallerAdmin()
      .then(setIsAdmin)
      .catch(() => setIsAdmin(false));
  }, [actor, isFetching, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) navigate({ to: "/login", replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAdmin === false) navigate({ to: "/dashboard", replace: true });
  }, [isAdmin, navigate]);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

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
      <h1 className="font-display text-4xl font-bold mb-2">
        Admin <span className="gradient-text">Panel</span>
      </h1>
      <p className="text-muted-foreground mb-10">
        Platform overview and management.
      </p>

      {/* Main Stats */}
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

      {/* Estimated Revenue + Platform Status */}
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

      {/* Revenue Overview */}
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
          <div className="space-y-2" data-ocid="admin.loading_state">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <Table data-ocid="admin.users_table">
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
                <TableRow
                  key={u.profile.username || `user-${i}`}
                  data-ocid={`admin.users_table.row.${i + 1}`}
                >
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
          <div className="space-y-3" data-ocid="admin.contact_list">
            {contacts?.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">
                No contact submissions yet.
              </p>
            )}
            {contacts?.map((c, i) => (
              <div
                key={`${c.name}-${c.email}`}
                className="p-4 rounded-lg bg-muted/50"
                data-ocid={`admin.contact_list.item.${i + 1}`}
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

      {/* Admin Support Email */}
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
