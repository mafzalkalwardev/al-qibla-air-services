import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/base-path";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
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
        <MotionSection>
          <SectionHeading title="Blog & News" subtitle="Travel tips, Umrah guides and industry updates" />
        </MotionSection>
        <MotionStagger className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <MotionStaggerItem key={post.id}>
            <Link href={`/blog/${post.slug}/`} className="card-premium group block overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={assetPath(post.coverImage)} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-navy group-hover:text-royal">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
            </Link>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
        <MotionSection delay={0.1} className="mt-8 text-center">
          <Link href="/blog/" className={cn(buttonVariants({ variant: "outlineDark" }))}>
            Read All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </MotionSection>
      </div>
    </section>
  );
}
