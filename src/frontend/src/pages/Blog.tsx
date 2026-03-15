import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, User } from "lucide-react";
import AdBanner from "../components/layout/AdBanner";
import { BLOG_POSTS } from "../data/blogPosts";

export default function Blog() {
  return (
    <main className="container py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-bold mb-4">
          The <span className="gradient-text">Viral Pilot Blog</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Expert guides, strategies, and insights to help you grow your social
          media presence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {BLOG_POSTS.map((post, i) => (
            <article
              key={post.slug}
              className="glass-card rounded-xl overflow-hidden hover-lift group"
            >
              <div
                className={`h-2 w-full bg-gradient-to-r ${post.coverColor}`}
              />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" /> {post.author} &bull;{" "}
                    {post.date}
                  </div>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="flex items-center gap-1 text-sm text-primary hover:underline font-medium"
                    data-ocid={`blog.item.${i + 1}`}
                  >
                    Read More <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-6">
          <AdBanner variant="sidebar" />
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-display font-semibold mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {["Instagram", "Copywriting", "Strategy", "YouTube", "Reels"].map(
                (cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    {cat}
                  </Badge>
                ),
              )}
            </div>
          </div>
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-display font-semibold mb-3">Popular Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/tools"
                  className="text-muted-foreground hover:text-primary"
                >
                  Instagram Caption Generator
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="text-muted-foreground hover:text-primary"
                >
                  Hashtag Generator
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="text-muted-foreground hover:text-primary"
                >
                  YouTube Title Generator
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="text-muted-foreground hover:text-primary"
                >
                  Viral Reel Ideas
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
