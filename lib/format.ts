export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function stars(rating: number) {
  const full = Math.round(rating);
  return "★".repeat(Math.min(5, full)) + "☆".repeat(Math.max(0, 5 - full));
}

export function whatsappLink(message: string, phone = "2348000000000") {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function generateOrderId() {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `AM-${n}`;
}
