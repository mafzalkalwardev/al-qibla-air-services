import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/base-path";
import { dataProvider } from "@/lib/data-provider";
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
      <section className="bg-navy py-16 text-white">
        <div className="container-wide max-w-3xl">
          <Link href="/blog/" className="inline-flex items-center text-sm text-gold-light hover:text-gold">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Blog
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">{post.title}</h1>
          <p className="mt-3 text-white/60">
            {post.author} ·{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-PK", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      <div className="container-wide max-w-3xl section-padding">
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src={assetPath(post.coverImage)}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
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
