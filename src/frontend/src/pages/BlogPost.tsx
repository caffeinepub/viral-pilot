import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, User } from "lucide-react";
import { BLOG_POSTS } from "../data/blogPosts";

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2);
      return <strong key={`b-${content}`}>{content}</strong>;
    }
    return part;
  });
}

function renderBlock(block: string, blockKey: string): React.ReactNode {
  if (block.startsWith("## ")) {
    return (
      <h2 key={blockKey} className="font-display text-2xl font-bold mt-8 mb-4">
        {block.replace("## ", "")}
      </h2>
    );
  }
  if (block.startsWith("**") && block.includes("\u2014")) {
    const parts = block.split("\n");
    return (
      <div key={blockKey} className="space-y-2 mb-4">
        {parts.map((p) => (
          <p key={p.slice(0, 30)} className="text-muted-foreground">
            {renderInline(p)}
          </p>
        ))}
      </div>
    );
  }
  return (
    <p key={blockKey} className="text-muted-foreground leading-relaxed mb-4">
      {renderInline(block)}
    </p>
  );
}

export default function BlogPost() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" />;

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="container py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <article className="lg:col-span-2">
          <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
          </Button>

          <div
            className={`h-1.5 w-full rounded-full bg-gradient-to-r ${post.coverColor} mb-8`}
          />

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {post.readTime}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" /> {post.author}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-muted-foreground mb-2 text-sm">{post.date}</p>

          <div className="h-px bg-border my-8" />

          <div className="space-y-4">
            {post.content
              .split("\n\n")
              .map((block, blockIdx) =>
                renderBlock(block, `block-${blockIdx}`),
              )}
          </div>
        </article>

        <aside className="space-y-6">
          <div className="glass-card rounded-xl p-5 sticky top-24">
            <h3 className="font-display font-semibold mb-4">Related Posts</h3>
            <div className="space-y-4">
              {related.map((p) => (
                <div key={p.slug}>
                  <div
                    className={`h-0.5 w-8 bg-gradient-to-r ${p.coverColor} mb-2 rounded-full`}
                  />
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="text-sm font-medium hover:text-primary transition-colors block mb-1"
                  >
                    {p.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{p.readTime}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
