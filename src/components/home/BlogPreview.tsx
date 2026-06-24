import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/base-path";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section className="section-padding bg-light-bg">
      <div className="container-wide">
        <SectionHeading title="Blog & News" subtitle="Travel tips, Umrah guides and industry updates" />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}/`} className="card-premium group overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={assetPath(post.coverImage)} alt={post.title} fill className="object-cover transition-transform group-hover:scale-105" unoptimized />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-navy group-hover:text-royal">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/blog/" className={cn(buttonVariants({ variant: "outline" }), "border-navy text-navy")}>
            Read All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
