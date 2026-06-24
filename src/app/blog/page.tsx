import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { assetPath } from "@/lib/base-path";
import { dataProvider } from "@/lib/data-provider";
import { SITE } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Blog & News",
  description: `Travel news, Umrah guides and tips from ${SITE.name}.`,
  path: "/blog/",
});

export default async function BlogPage() {
  const posts = await dataProvider.getBlogPosts();

  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Blog & News</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Travel tips, Umrah guides, and latest updates from Al Qibla Air Services.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading title="Latest Articles" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}/`}
                className="group overflow-hidden rounded-xl border border-border/60 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={assetPath(post.coverImage)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 font-heading text-lg font-semibold text-navy group-hover:text-gold">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString("en-PK", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
