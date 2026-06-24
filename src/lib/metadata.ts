import type { Metadata } from "next";
import { SITE } from "./constants";

export function createPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const fullTitle = title === SITE.name ? title : `${title} | ${SITE.name}`;
  const url = `${SITE.url}${path}`;

  return {
    title: fullTitle,
    description: description ?? SITE.description,
    openGraph: {
      title: fullTitle,
      description: description ?? SITE.description,
      url,
      siteName: SITE.name,
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description ?? SITE.description,
    },
  };
}
