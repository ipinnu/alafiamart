export type DietaryTag =
  | "gluten-free"
  | "low-gi"
  | "diabetic-friendly"
  | "vegan"
  | "dairy-free"
  | "nut-free"
  | "keto";

export type CategorySlug =
  | "foods-pantry"
  | "snacks"
  | "beverages"
  | "supplements-vitamins"
  | "household"
  | "personal-care"
  | "baby-kids";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  size: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  category: CategorySlug;
  dietary: DietaryTag[];
  allergens: string[];
  inStock: boolean;
  stockUnits: number;
  sameDayEligible: boolean;
  nafdacVerified: boolean;
  nafdacRegNo?: string;
  manufacturer?: string;
  batch?: string;
  expiry?: string;
  imageHue: number;
  image: string;
  nutrition?: { label: string; value: string }[];
  ingredients?: string;
  contains?: string;
  mayContain?: string;
  giScore?: string;
  description?: string;
};

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Picking"
  | "Dispatched"
  | "Delivered"
  | "Exception"
  | "Cancelled";

export type CartItem = {
  productId: string;
  quantity: number;
};
