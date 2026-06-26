import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { dataProvider } from "@/lib/data-provider";
import { PageHero } from "@/components/shared/PageHero";
import { HERO_VIDEO } from "@/lib/assets";
import { ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await dataProvider.getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await dataProvider.getBlogPostBySlug(slug);
  if (!post) return {};
  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}/`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await dataProvider.getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <PageHero
        title={post.title}
        subtitle={`${post.author} · ${new Date(post.publishedAt).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}`}
        backgroundImage={post.coverImage}
        backgroundVideo={HERO_VIDEO}
        badge={post.tags[0]}
      />
      <div className="container-wide max-w-3xl pb-16 pt-4">
        <Link href="/blog/" className="mb-6 inline-flex items-center text-sm text-royal hover:text-gold">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Blog
        </Link>
        <div className="prose prose-navy max-w-none">
          {post.content.split("\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-8 font-heading text-2xl font-semibold text-navy">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.trim()) {
              return (
                <p key={i} className="mt-4 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              );
            }
            return null;
          })}
        </div>
      </div>
    </article>
  );
}
