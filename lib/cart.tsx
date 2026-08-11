"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/lib/data/products";
import type { CartItem } from "@/lib/types";

type DeliveryLocation = {
  area: string;
  lga?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  location: DeliveryLocation;
  setLocation: (loc: DeliveryLocation) => void;
  addItem: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  coupon: string;
  setCoupon: (code: string) => void;
  couponDiscount: number;
  applyCoupon: () => { ok: boolean; message: string };
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "alafiamart-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [location, setLocation] = useState<DeliveryLocation>({
    area: "Lekki, Lagos",
  });
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          items?: CartItem[];
          location?: DeliveryLocation;
        };
        if (parsed.items) setItems(parsed.items);
        if (parsed.location) setLocation(parsed.location);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ items, location }),
    );
  }, [items, location, hydrated]);

  const addItem = useCallback((productId: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + qty }
            : i,
        );
      }
      return [...prev, { productId, quantity: qty }];
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.productId !== productId);
      return prev.map((i) =>
        i.productId === productId ? { ...i, quantity: qty } : i,
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setCoupon("");
    setCouponDiscount(0);
  }, []);

  const applyCoupon = useCallback(() => {
    const code = coupon.trim().toUpperCase();
    if (code === "ALAFIA10") {
      setCouponDiscount(0.1);
      return { ok: true, message: "10% discount applied" };
    }
    setCouponDiscount(0);
    return { ok: false, message: "Invalid coupon code" };
  }, [coupon]);

  const subtotal = useMemo(() => {
    const base = items.reduce((sum, item) => {
      const p = getProductById(item.productId);
      return sum + (p ? p.price * item.quantity : 0);
    }, 0);
    return Math.round(base * (1 - couponDiscount));
  }, [items, couponDiscount]);

  const count = useMemo(
    () => items.reduce((n, i) => n + i.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      location,
      setLocation,
      addItem,
      setQty,
      removeItem,
      clear,
      coupon,
      setCoupon,
      couponDiscount,
      applyCoupon,
    }),
    [
      items,
      count,
      subtotal,
      location,
      addItem,
      setQty,
      removeItem,
      clear,
      coupon,
      couponDiscount,
      applyCoupon,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
