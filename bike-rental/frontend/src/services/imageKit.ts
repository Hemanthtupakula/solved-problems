/**
 * ImageKit Media Service for TBH Rentals
 * Account: hemanthhkt
 * URL-endpoint: https://ik.imagekit.io/hemanthhkt
 */

export const IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/hemanthhkt';

export type ImageKitPreset = 'thumbnail' | 'gallery' | 'frame360' | 'full';

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg';
  cropMode?: 'extract' | 'pad_resize' | 'fo-auto';
}

const PRESET_CONFIGS: Record<ImageKitPreset, ImageTransformOptions> = {
  thumbnail: { width: 480, height: 320, quality: 80, format: 'auto', cropMode: 'fo-auto' },
  gallery: { width: 1280, height: 853, quality: 85, format: 'auto', cropMode: 'fo-auto' },
  frame360: { width: 800, height: 533, quality: 80, format: 'auto', cropMode: 'fo-auto' },
  full: { width: 1920, height: 1080, quality: 90, format: 'auto', cropMode: 'fo-auto' }
};

/**
 * Builds an ImageKit CDN URL with optimal real-time transformations.
 */
export function buildImageKitUrl(pathOrUrl: string, options?: ImageTransformOptions): string {
  if (!pathOrUrl || pathOrUrl.trim() === '') {
    return '/images/placeholder-vehicle.webp';
  }

  const opts: ImageTransformOptions = {
    quality: 80,
    format: 'auto',
    cropMode: 'fo-auto',
    ...options
  };

  const transformParts: string[] = [];
  if (opts.width) transformParts.push(`w-${opts.width}`);
  if (opts.height) transformParts.push(`h-${opts.height}`);
  if (opts.cropMode) transformParts.push(opts.cropMode);
  if (opts.quality) transformParts.push(`q-${opts.quality}`);
  if (opts.format) transformParts.push(`f-${opts.format}`);

  const transformQuery = `tr=${transformParts.join(',')}`;

  // If already an absolute ImageKit URL
  if (pathOrUrl.includes('ik.imagekit.io')) {
    const separator = pathOrUrl.includes('?') ? '&' : '?';
    return `${pathOrUrl}${separator}${transformQuery}`;
  }

  // If local asset path, return local path
  if (pathOrUrl.startsWith('/') || pathOrUrl.startsWith('http://localhost') || pathOrUrl.startsWith('data:')) {
    return pathOrUrl;
  }

  // Otherwise treat as relative path on ImageKit
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl.substring(1) : pathOrUrl;
  return `${IMAGEKIT_ENDPOINT}/${cleanPath}?${transformQuery}`;
}

/**
 * Convenience helper resolving an image with a specific responsive preset.
 */
export function getVehicleMediaUrl(url: string | undefined | null, preset: ImageKitPreset = 'thumbnail'): string {
  if (!url) {
    return '/images/placeholder-vehicle.webp';
  }
  return buildImageKitUrl(url, PRESET_CONFIGS[preset]);
}

/**
 * Generates an array of canonical 360-degree frame URLs for an EV/vehicle model.
 */
export function get360FrameUrls(modelSlug: string, totalFrames: number = 36): string[] {
  const frames: string[] = [];
  for (let i = 1; i <= totalFrames; i++) {
    const frameIndex = String(i).padStart(2, '0');
    frames.push(`${IMAGEKIT_ENDPOINT}/tbh/vehicles/${modelSlug}/360/frame_${frameIndex}.webp?tr=w-800,q-80,f-auto`);
  }
  return frames;
}