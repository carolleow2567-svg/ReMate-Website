export const MATERIAL_GALLERIES: Record<string, string[]> = {
  Timber: [
    "/images/materials/timber-detail-1.jpg",
    "/images/materials/timber-detail-2.jpg",
    "/images/materials/timber-detail-3.jpg",
    "/images/materials/timber-detail-4.jpg",
    "/images/materials/timber-detail-5.jpg",
  ],
  Metal: [
    "/images/materials/metal-detail-1.jpg",
    "/images/materials/metal-detail-2.jpg",
    "/images/materials/metal-detail-3.jpg",
    "/images/materials/metal-detail-4.jpg",
    "/images/materials/metal-detail-5.jpg",
  ],
  Plastics: [
    "/images/materials/plastic-detail-1.jpg",
    "/images/materials/plastic-detail-2.jpg",
    "/images/materials/plastic-detail-3.jpg",
    "/images/materials/plastic-detail-4.jpg",
    "/images/materials/plastic-detail-5.jpg",
  ],
};

export function getMaterialGallery(category: string): string[] {
  return MATERIAL_GALLERIES[category] ?? MATERIAL_GALLERIES.Timber;
}
