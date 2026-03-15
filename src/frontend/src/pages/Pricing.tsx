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
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Check, CheckCircle2, Copy, Loader2, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { PlanType } from "../backend";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect to get started and explore AI content tools.",
    features: [
      "5 generations per day",
      "4 basic tools",
      "Copy to clipboard",
      "No account required",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹100",
    period: "per month",
    description: "For serious creators who need unlimited content generation.",
    features: [
      "Unlimited generations",
      "All 8 AI tools",
      "Save content to profile",
      "Favorite tools shortcuts",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹299",
    period: "per month",
    description: "For power users and teams who demand the best.",
    features: [
      "Everything in Pro",
      "Advanced analytics",
      "Usage breakdown charts",
      "Team collaboration",
      "White-label exports",
      "Dedicated support",
    ],
    cta: "Upgrade to Premium",
    popular: false,
  },
];

const UPI_ID = "iasim4321-3@okicici";

export default function Pricing() {
  const { isAuthenticated, plan } = useAuth();
  const { actor } = useActor();
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState<(typeof PLANS)[0] | null>(
    null,
  );
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleUpgradeClick = (planData: (typeof PLANS)[0]) => {
    if (planData.id === "free") {
      if (!isAuthenticated) {
        navigate({ to: "/signup" });
      }
      return;
    }
    if (!isAuthenticated) {
      toast.error("Pehle login karein plan upgrade ke liye");
      return;
    }
    setSelectedPlan(planData);
    setTransactionId("");
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("UPI ID copied!");
  };

  const handleSubmitPayment = async () => {
    if (!transactionId.trim()) {
      toast.error("Transaction ID daalna zaroori hai");
      return;
    }
    if (!actor || !selectedPlan) return;

    setIsSubmitting(true);
    try {
      await actor.updatePlan(selectedPlan.id as PlanType);
      setSelectedPlan(null);
      setTransactionId("");
      setShowSuccess(true);
    } catch {
      toast.error("Payment submit karne mein problem aayi. Dobara try karein.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="container py-16">
        <div className="text-center mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl font-bold mb-4"
          >
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Shuru karo free mein, jab ready ho tab upgrade karo. Koi hidden fees
            nahi.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((p, i) => {
            const isCurrent = isAuthenticated && plan === p.id;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className={cn(
                  "glass-card rounded-2xl p-8 relative flex flex-col",
                  p.popular &&
                    "border-primary/50 shadow-glow-sm ring-1 ring-primary/30",
                )}
              >
                {p.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    <Zap className="h-3 w-3 mr-1" /> Most Popular
                  </Badge>
                )}
                {isCurrent && (
                  <Badge
                    variant="secondary"
                    className="absolute top-4 right-4 text-xs"
                  >
                    Current Plan
                  </Badge>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold mb-1">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-display text-4xl font-bold">
                      {p.price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      /{p.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {p.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn("w-full", p.popular && "shadow-glow-sm")}
                  variant={p.popular ? "default" : "outline"}
                  disabled={isCurrent}
                  onClick={() => handleUpgradeClick(p)}
                  data-ocid={`pricing.${p.id}.button`}
                >
                  {isCurrent ? "Current Plan" : p.cta}
                </Button>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12 text-sm text-muted-foreground">
          Sabhi plans mein 7-day free trial included hai. Koi credit card
          required nahi.
        </div>
      </main>

      {/* Payment Modal */}
      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="max-w-md" data-ocid="pricing.dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {selectedPlan?.name} Plan Upgrade
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {/* Plan summary */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  {selectedPlan?.name} Plan
                </p>
                <p className="text-sm text-muted-foreground">
                  Monthly subscription
                </p>
              </div>
              <span className="font-display text-3xl font-bold text-primary">
                {selectedPlan?.price}
              </span>
            </div>

            {/* UPI Payment */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                UPI se Payment Karein
              </Label>
              <p className="text-sm text-muted-foreground">
                Niche diye UPI ID par {selectedPlan?.price} transfer karein:
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-lg px-4 py-3 font-mono text-sm font-medium">
                  {UPI_ID}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyUPI}
                  data-ocid="pricing.payment.button"
                  className="shrink-0"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Google Pay, PhonePe, Paytm, ya koi bhi UPI app use kar sakte
                hain.
              </p>
            </div>

            {/* Transaction ID */}
            <div className="space-y-2">
              <Label htmlFor="txn-id" className="text-base font-semibold">
                Apna UPI Screenshot ya Transaction ID yahan bhejein
              </Label>
              <Input
                id="txn-id"
                placeholder="e.g. 123456789012"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                data-ocid="pricing.payment.input"
              />
              <p className="text-xs text-muted-foreground">
                Transaction ID payment history mein milega.
              </p>
            </div>

            {/* Submit */}
            <Button
              className="w-full"
              onClick={handleSubmitPayment}
              disabled={isSubmitting || !transactionId.trim()}
              data-ocid="pricing.payment.submit_button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Payment Submit Karein"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tools Unlock Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
            data-ocid="pricing.success_state"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="glass-card rounded-3xl p-12 max-w-md w-full mx-4 text-center shadow-glow"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="text-7xl mb-6"
              >
                🎉
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-3xl font-bold mb-3"
              >
                Tools Unlock Ho Gaye!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground mb-3"
              >
                Aapke sabhi premium tools ab available hain
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-muted-foreground bg-muted/50 rounded-xl p-3 mb-8"
              >
                Payment verification ke baad aapke tools unlock ho jayenge!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="w-full shadow-glow-sm"
                  onClick={() => {
                    setShowSuccess(false);
                    navigate({ to: "/dashboard" });
                  }}
                  data-ocid="pricing.success.primary_button"
                >
                  Dashboard pe Jao
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
