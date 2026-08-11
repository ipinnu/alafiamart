import type { CategorySlug, DietaryTag, Product } from "../types";

export const DIETARY_NEEDS: { id: DietaryTag; label: string; letter: string }[] = [
  { id: "gluten-free", label: "Gluten-Free", letter: "G" },
  { id: "low-gi", label: "Low-GI", letter: "L" },
  { id: "diabetic-friendly", label: "Diabetic-Friendly", letter: "D" },
  { id: "vegan", label: "Vegan", letter: "V" },
  { id: "dairy-free", label: "Dairy-Free", letter: "F" },
  { id: "nut-free", label: "Nut-Free", letter: "N" },
  { id: "keto", label: "Keto", letter: "K" },
];

export const CATEGORIES: {
  slug: CategorySlug;
  label: string;
  letter: string;
}[] = [
  { slug: "foods-pantry", label: "Foods & Pantry", letter: "F" },
  { slug: "snacks", label: "Snacks", letter: "S" },
  { slug: "beverages", label: "Beverages", letter: "B" },
  { slug: "supplements-vitamins", label: "Supplements & Vitamins", letter: "V" },
  { slug: "household", label: "Household Essentials", letter: "H" },
  { slug: "personal-care", label: "Personal Care", letter: "P" },
  { slug: "baby-kids", label: "Baby & Kids", letter: "K" },
];

export const FREE_DELIVERY_THRESHOLD = 22900;
export const SAME_DAY_FEE = 1500;
export const SCHEDULED_FEE = 900;
export const CUTOFF_HOUR = 14;
export const WHATSAPP_NUMBER = "2348000000000";

export const products: Product[] = [
  {
    id: "p1",
    slug: "gluten-free-flour-blend-1kg",
    name: "Gluten-Free Flour Blend",
    brand: "Honeywell",
    size: "1kg",
    price: 4200,
    rating: 4.4,
    reviewCount: 96,
    category: "foods-pantry",
    dietary: ["gluten-free"],
    allergens: [],
    inStock: true,
    stockUnits: 120,
    sameDayEligible: true,
    nafdacVerified: false,
    imageHue: 42,
  },
  {
    id: "p2",
    slug: "low-gi-rolled-oats-500g",
    name: "Low-GI Rolled Oats",
    brand: "Grand Cereals",
    size: "500g",
    price: 2800,
    rating: 4.8,
    reviewCount: 214,
    category: "foods-pantry",
    dietary: ["low-gi", "diabetic-friendly"],
    allergens: ["gluten"],
    inStock: true,
    stockUnits: 80,
    sameDayEligible: true,
    nafdacVerified: false,
    imageHue: 85,
  },
  {
    id: "p3",
    slug: "vitamin-d3-softgels-1000iu",
    name: "Vitamin D3 Softgels 1000IU",
    brand: "NutriHealth",
    size: "60 softgels",
    price: 6500,
    rating: 4.5,
    reviewCount: 128,
    category: "supplements-vitamins",
    dietary: ["gluten-free"],
    allergens: ["soy"],
    inStock: true,
    stockUnits: 42,
    sameDayEligible: true,
    nafdacVerified: true,
    nafdacRegNo: "A7-1234L",
    manufacturer: "NutriHealth Nigeria Ltd.",
    batch: "NH-2026-0472",
    expiry: "Jun 2027",
    imageHue: 210,
    nutrition: [
      { label: "Serving Size", value: "1 softgel" },
      { label: "Calories", value: "5 kcal" },
      { label: "Carbohydrate", value: "0.5 g" },
      { label: "Sugar", value: "0 g" },
      { label: "Fat", value: "0.5 g" },
      { label: "GI Score", value: "Not applicable" },
    ],
    ingredients:
      "Cholecalciferol (Vitamin D3), Soybean Oil, Gelatin, Glycerin, Purified Water.",
    contains: "Soy · Gelatin (bovine)",
    mayContain: "Traces of tree nuts",
    giScore: "Not applicable",
  },
  {
    id: "p4",
    slug: "lactose-free-milk-1l",
    name: "Lactose-Free Milk",
    brand: "Fresh Dairies",
    size: "1L",
    price: 1900,
    rating: 4.3,
    reviewCount: 57,
    category: "beverages",
    dietary: ["dairy-free"],
    allergens: [],
    inStock: true,
    stockUnits: 200,
    sameDayEligible: true,
    nafdacVerified: false,
    imageHue: 200,
  },
  {
    id: "p5",
    slug: "keto-almond-flour-500g",
    name: "Keto Almond Flour",
    brand: "GoodFood",
    size: "500g",
    price: 4505,
    compareAt: 5300,
    rating: 4.7,
    reviewCount: 81,
    category: "foods-pantry",
    dietary: ["keto", "gluten-free"],
    allergens: ["nuts"],
    inStock: true,
    stockUnits: 55,
    sameDayEligible: true,
    nafdacVerified: false,
    imageHue: 55,
  },
  {
    id: "p6",
    slug: "multivitamin-capsules-60ct",
    name: "Multivitamin Capsules",
    brand: "PureLife",
    size: "60ct",
    price: 6120,
    compareAt: 7200,
    rating: 4.4,
    reviewCount: 128,
    category: "supplements-vitamins",
    dietary: [],
    allergens: [],
    inStock: true,
    stockUnits: 90,
    sameDayEligible: true,
    nafdacVerified: true,
    nafdacRegNo: "B2-8841K",
    manufacturer: "PureLife Pharma",
    batch: "PL-2026-1102",
    expiry: "Mar 2028",
    imageHue: 280,
  },
  {
    id: "p7",
    slug: "vegan-protein-powder-900g",
    name: "Vegan Protein Powder",
    brand: "PlantBase",
    size: "900g",
    price: 12000,
    rating: 4.2,
    reviewCount: 39,
    category: "supplements-vitamins",
    dietary: ["vegan", "dairy-free"],
    allergens: ["soy"],
    inStock: true,
    stockUnits: 33,
    sameDayEligible: false,
    nafdacVerified: false,
    imageHue: 140,
  },
  {
    id: "p8",
    slug: "nut-free-granola-400g",
    name: "Nut-Free Granola",
    brand: "HealthyHome",
    size: "400g",
    price: 3100,
    rating: 4.9,
    reviewCount: 64,
    category: "snacks",
    dietary: ["nut-free"],
    allergens: ["gluten"],
    inStock: true,
    stockUnits: 70,
    sameDayEligible: true,
    nafdacVerified: false,
    imageHue: 70,
  },
  {
    id: "p9",
    slug: "omega-3-fish-oil-1000mg",
    name: "Omega-3 Fish Oil 1000mg",
    brand: "VitaCore",
    size: "60 softgels",
    price: 8900,
    rating: 4.6,
    reviewCount: 102,
    category: "supplements-vitamins",
    dietary: [],
    allergens: ["fish"],
    inStock: true,
    stockUnits: 48,
    sameDayEligible: true,
    nafdacVerified: true,
    nafdacRegNo: "C1-2201M",
    manufacturer: "VitaCore Nigeria",
    batch: "VC-2026-033",
    expiry: "Jan 2028",
    imageHue: 190,
  },
  {
    id: "p10",
    slug: "probiotic-complex-30ct",
    name: "Probiotic Complex",
    brand: "GutHealth NG",
    size: "30ct",
    price: 9400,
    rating: 4.5,
    reviewCount: 77,
    category: "supplements-vitamins",
    dietary: ["gluten-free"],
    allergens: [],
    inStock: true,
    stockUnits: 40,
    sameDayEligible: true,
    nafdacVerified: true,
    nafdacRegNo: "D4-5510P",
    manufacturer: "GutHealth NG Ltd.",
    batch: "GH-2026-019",
    expiry: "Nov 2027",
    imageHue: 160,
  },
  {
    id: "p11",
    slug: "zinc-vitamin-c-tablets",
    name: "Zinc + Vitamin C Tablets",
    brand: "ImmunoBoost",
    size: "60 tablets",
    price: 4100,
    rating: 4.3,
    reviewCount: 88,
    category: "supplements-vitamins",
    dietary: ["vegan"],
    allergens: [],
    inStock: true,
    stockUnits: 110,
    sameDayEligible: true,
    nafdacVerified: true,
    nafdacRegNo: "E8-7712Z",
    manufacturer: "ImmunoBoost Labs",
    batch: "IB-2026-088",
    expiry: "Aug 2027",
    imageHue: 30,
  },
  {
    id: "p12",
    slug: "vegan-magnesium-glycinate-60ct",
    name: "Vegan Magnesium Glycinate",
    brand: "CalmBody",
    size: "60ct",
    price: 7800,
    rating: 4.7,
    reviewCount: 54,
    category: "supplements-vitamins",
    dietary: ["vegan", "gluten-free"],
    allergens: [],
    inStock: true,
    stockUnits: 61,
    sameDayEligible: true,
    nafdacVerified: true,
    nafdacRegNo: "F3-4410G",
    manufacturer: "CalmBody Wellness",
    batch: "CB-2026-055",
    expiry: "May 2028",
    imageHue: 250,
  },
  {
    id: "p13",
    slug: "collagen-peptides-powder",
    name: "Collagen Peptides Powder",
    brand: "GlowNutrition",
    size: "300g",
    price: 15500,
    rating: 4.4,
    reviewCount: 41,
    category: "supplements-vitamins",
    dietary: ["gluten-free"],
    allergens: [],
    inStock: true,
    stockUnits: 28,
    sameDayEligible: false,
    nafdacVerified: false,
    imageHue: 320,
  },
  {
    id: "p14",
    slug: "iron-folic-acid-tablets",
    name: "Iron + Folic Acid Tablets",
    brand: "MamaCare",
    size: "30 tablets",
    price: 3600,
    rating: 4.6,
    reviewCount: 119,
    category: "supplements-vitamins",
    dietary: [],
    allergens: [],
    inStock: true,
    stockUnits: 95,
    sameDayEligible: true,
    nafdacVerified: true,
    nafdacRegNo: "G9-1188I",
    manufacturer: "MamaCare Pharma",
    batch: "MC-2026-012",
    expiry: "Feb 2028",
    imageHue: 10,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function filterProducts(opts: {
  category?: string;
  dietary?: DietaryTag[];
  allergensExclude?: string[];
  brand?: string[];
  inStockOnly?: boolean;
  sameDayOnly?: boolean;
  nafdacOnly?: boolean;
  maxPrice?: number;
  q?: string;
}) {
  return products.filter((p) => {
    if (opts.category && p.category !== opts.category) return false;
    if (opts.dietary?.length && !opts.dietary.every((d) => p.dietary.includes(d)))
      return false;
    if (
      opts.allergensExclude?.length &&
      opts.allergensExclude.some((a) =>
        p.allergens.map((x) => x.toLowerCase()).includes(a.toLowerCase()),
      )
    )
      return false;
    if (opts.brand?.length && !opts.brand.includes(p.brand)) return false;
    if (opts.inStockOnly && !p.inStock) return false;
    if (opts.sameDayOnly && !p.sameDayEligible) return false;
    if (opts.nafdacOnly && !p.nafdacVerified) return false;
    if (opts.maxPrice != null && p.price > opts.maxPrice) return false;
    if (opts.q) {
      const q = opts.q.toLowerCase();
      const hay = `${p.name} ${p.brand} ${p.size}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
