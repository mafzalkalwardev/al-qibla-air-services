"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { assetPath } from "@/lib/base-path";
import { FALLBACK_IMAGES, normalizeImageUrl } from "@/lib/image-utils";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
  fallbackSrc?: string;
};

export function SafeImage({
  src,
  fallbackSrc = FALLBACK_IMAGES.generic,
  alt,
  onError,
  ...props
}: SafeImageProps) {
  const fallback = normalizeImageUrl(fallbackSrc, FALLBACK_IMAGES.generic);
  const [currentSrc, setCurrentSrc] = useState(() => normalizeImageUrl(src, fallback));

  return (
    <Image
      {...props}
      src={assetPath(currentSrc)}
      alt={alt}
      unoptimized
      onError={(event) => {
        if (currentSrc !== fallback) setCurrentSrc(fallback);
        onError?.(event);
      }}
    />
  );
}
