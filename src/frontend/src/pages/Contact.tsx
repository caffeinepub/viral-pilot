import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Mail, MapPin, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <main className="container py-16">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="font-display text-5xl font-bold mb-4">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Have a question, feedback, or partnership idea? We&apos;d love to hear
          from you. Just send us an email!
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Main Email CTA */}
        <div className="glass-card rounded-2xl p-8 text-center animate-fade-in-up delay-100">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-semibold mb-2">
            Email Us Directly
          </h2>
          <p className="text-muted-foreground mb-6">
            Click the button below to open your email app and send us a message.
            We reply within 24 hours.
          </p>
          <a href="mailto:aurexsupport666@gmail.com?subject=Viral Pilot Support">
            <Button
              size="lg"
              className="shadow-glow transition-all duration-200 hover:scale-105 gap-2"
            >
              <Mail className="h-4 w-4" />
              aurexsupport666@gmail.com
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up delay-200">
          <div className="glass-card rounded-xl p-5 text-center transition-transform duration-200 hover:-translate-y-1">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Response Time</p>
            <p className="text-xs text-muted-foreground mt-1">
              Within 24 hours
            </p>
          </div>

          <div className="glass-card rounded-xl p-5 text-center transition-transform duration-200 hover:-translate-y-1">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Support</p>
            <p className="text-xs text-muted-foreground mt-1">
              Free for all users
            </p>
          </div>

          <div className="glass-card rounded-xl p-5 text-center transition-transform duration-200 hover:-translate-y-1">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Platform</p>
            <p className="text-xs text-muted-foreground mt-1">
              Internet Computer
            </p>
          </div>
        </div>

        {/* FAQ hint */}
        <div className="glass-card rounded-xl p-5 animate-fade-in-up delay-300">
          <p className="text-sm text-muted-foreground text-center">
            Before writing, check if your question is about{" "}
            <span className="text-primary font-medium">login issues</span>,{" "}
            <span className="text-primary font-medium">payment/UPI</span>, or{" "}
            <span className="text-primary font-medium">tool access</span> —
            these are our most common topics!
          </p>
        </div>
      </div>
    </main>
  );
}
