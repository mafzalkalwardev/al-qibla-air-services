import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { dataProvider } from "@/lib/data-provider";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await dataProvider.getBlogPosts();
  const base = SITE.url;

  const staticPages = [
    "",
    "/about/",
    "/services/",
    "/flight-booking/",
    "/umrah-packages/",
    "/tour-packages/",
    "/available-tickets/",
    "/corporate-travel/",
    "/gallery/",
    "/blog/",
    "/destinations/",
    "/inquiry/",
    "/contact/",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}/`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
