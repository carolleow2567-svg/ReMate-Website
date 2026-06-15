// Local public asset paths for Vite - named to match product labels
const ASSET_PATHS = {
  timber: "/images/timber-material.jpg",
  metal: "/images/scrap-metal-material.jpg",
  container: "/images/recyclable-plastic-material.jpeg",
  bricks: "/images/salvaged-red-clay-bricks-smart-match.jpg",
  hdpeDrum: "/images/hdpe-drum-containers-smart-match.jpg",
  steelSheet: "/images/galvanized-steel-sheet-cutoffs-smart-match.jpg",
};

export type Listing = {
  id: string;
  title: string;
  category: "Timber" | "Metal" | "Plastics" | "Construction";
  qty: string;
  unit: string;
  location: string;
  distance: string;
  price: string;
  grade: "A" | "B" | "C";
  co2: string;
  bg: string;
  image?: string;
  provider: {
    name: string;
    type: string;
    rating: number;
    verified: boolean;
    since: string;
  };
  description: string;
  posted: string;
};

export const LISTINGS: Listing[] = [
  {
    id: "chengal-offcuts-001",
    image: ASSET_PATHS.timber,
    title: "Reclaimed Chengal Timber Offcuts",
    category: "Timber",
    qty: "320",
    unit: "kg",
    location: "Johor Bahru",
    distance: "4.2 km",
    price: "RM 1.80/kg",
    grade: "A",
    co2: "112",
    bg: "linear-gradient(135deg, oklch(0.78 0.06 60), oklch(0.55 0.09 50))",
    provider: {
      name: "Hafiz Bina Sdn Bhd",
      type: "Contractor",
      rating: 4.8,
      verified: true,
      since: "2024",
    },
    description:
      "Clean Chengal hardwood offcuts from a recent boutique hotel build. Lengths 30–80 cm, structurally sound, perfect for furniture, decking, or upcycled joinery. Dry, stored under cover.",
    posted: "2 days ago",
  },
  {
    id: "steel-sheet-002",
    image: ASSET_PATHS.steelSheet,
    title: "Galvanized Steel Sheet Cutoffs",
    category: "Metal",
    qty: "180",
    unit: "kg",
    location: "Skudai",
    distance: "6.8 km",
    price: "RM 3.20/kg",
    grade: "A",
    co2: "240",
    bg: "linear-gradient(135deg, oklch(0.82 0.02 240), oklch(0.55 0.03 250))",
    provider: {
      name: "Skudai Metalworks",
      type: "Fabricator",
      rating: 4.9,
      verified: true,
      since: "2023",
    },
    description:
      "Galvanized steel sheet cutoffs (1.2 mm), mixed sizes 200–600 mm. Suitable for ducting, light fabrication, or workshop prototyping. Stored indoors, no surface rust.",
    posted: "5 hours ago",
  },
  {
    id: "hdpe-drums-003",
    image: ASSET_PATHS.hdpeDrum,
    title: "HDPE Drum Containers (food-safe)",
    category: "Plastics",
    qty: "45",
    unit: "units",
    location: "Iskandar Puteri",
    distance: "12.0 km",
    price: "RM 18/unit",
    grade: "B",
    co2: "86",
    bg: "linear-gradient(135deg, oklch(0.85 0.05 200), oklch(0.55 0.09 195))",
    provider: {
      name: "Iskandar F&B Co-op",
      type: "Food processor",
      rating: 4.6,
      verified: true,
      since: "2024",
    },
    description:
      "200 L HDPE drums, previously used for food-grade palm oil. Cleaned, lids included. Ideal for rainwater harvesting, urban farms, or chemical-free storage.",
    posted: "1 day ago",
  },
  {
    id: "clay-bricks-004",
    image: ASSET_PATHS.bricks,
    title: "Salvaged Red Clay Bricks",
    category: "Construction",
    qty: "2400",
    unit: "pcs",
    location: "Kulai",
    distance: "9.1 km",
    price: "RM 0.45/pc",
    grade: "B",
    co2: "320",
    bg: "linear-gradient(135deg, oklch(0.7 0.08 35), oklch(0.45 0.1 30))",
    provider: {
      name: "Kulai Demolition Services",
      type: "Demolition",
      rating: 4.5,
      verified: true,
      since: "2022",
    },
    description:
      "Solid red clay bricks salvaged from a 1980s warehouse. Mortar mostly cleaned, characterful patina. Great for feature walls, landscaping, and heritage-style builds.",
    posted: "3 days ago",
  },
  {
    id: "pine-pallets-005",
    image: ASSET_PATHS.timber,
    title: "Pine Wood Pallets (heat-treated)",
    category: "Timber",
    qty: "120",
    unit: "units",
    location: "Pasir Gudang",
    distance: "14.5 km",
    price: "RM 8/unit",
    grade: "A",
    co2: "94",
    bg: "linear-gradient(135deg, oklch(0.82 0.07 70), oklch(0.6 0.08 55))",
    provider: {
      name: "PG Logistics Hub",
      type: "Logistics",
      rating: 4.7,
      verified: true,
      since: "2023",
    },
    description:
      "Standard 1200×1000 mm heat-treated pine pallets. Surplus from export operations. Sound stringers, reusable for shipping or upcycled furniture.",
    posted: "6 hours ago",
  },
  {
    id: "copper-wire-006",
    image: ASSET_PATHS.metal,
    title: "Stripped Copper Wire (Grade 1)",
    category: "Metal",
    qty: "62",
    unit: "kg",
    location: "Tampoi",
    distance: "5.4 km",
    price: "RM 28/kg",
    grade: "A",
    co2: "186",
    bg: "linear-gradient(135deg, oklch(0.78 0.1 50), oklch(0.5 0.12 40))",
    provider: {
      name: "Tampoi Electricals",
      type: "Electrical contractor",
      rating: 4.9,
      verified: true,
      since: "2022",
    },
    description:
      "Grade 1 bare bright copper wire, stripped and clean. From a commercial rewiring project. Sold by weight, certificate of origin available.",
    posted: "12 hours ago",
  },
  {
    id: "pet-flakes-007",
    image: ASSET_PATHS.container,
    title: "PET Bottle Flakes (clear)",
    category: "Plastics",
    qty: "540",
    unit: "kg",
    location: "Senai",
    distance: "18.2 km",
    price: "RM 2.10/kg",
    grade: "B",
    co2: "412",
    bg: "linear-gradient(135deg, oklch(0.88 0.04 210), oklch(0.6 0.08 200))",
    provider: {
      name: "GreenLoop Recyclers",
      type: "MRF",
      rating: 4.4,
      verified: true,
      since: "2021",
    },
    description:
      "Washed and shredded clear PET flakes, ready for extrusion. Baled in 30 kg sacks. Suitable for fibre or rPET preform manufacturing.",
    posted: "1 day ago",
  },
  {
    id: "concrete-blocks-008",
    image: ASSET_PATHS.bricks,
    title: "Reclaimed Concrete Blocks",
    category: "Construction",
    qty: "850",
    unit: "pcs",
    location: "Masai",
    distance: "11.7 km",
    price: "RM 1.20/pc",
    grade: "C",
    co2: "510",
    bg: "linear-gradient(135deg, oklch(0.8 0.01 250), oklch(0.5 0.02 245))",
    provider: {
      name: "Masai Civil Works",
      type: "Civil contractor",
      rating: 4.3,
      verified: false,
      since: "2024",
    },
    description:
      "Hollow concrete blocks 200×200×400 mm reclaimed from a boundary-wall demolition. Mixed condition, suitable for non-structural infill, landscaping, or temporary works.",
    posted: "4 days ago",
  },
];

export function getListing(id: string) {
  return LISTINGS.find((l) => l.id === id);
}
