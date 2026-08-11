export type DeliveryResult =
  | {
      status: "same-day";
      label: string;
      detail: string;
      fee: number;
    }
  | {
      status: "standard";
      label: string;
      detail: string;
      fee: number;
    }
  | {
      status: "unavailable";
      label: string;
      detail: string;
      fee: number;
    };

const SAME_DAY_KEYWORDS = [
  "lekki",
  "eti-osa",
  "ikoyi",
  "victoria island",
  "vi",
  "yaba",
  "ikeja",
  "surulere",
  "ajah",
  "lagos",
  "abuja",
  "ibadan",
];

export function checkDeliveryAvailability(query: string): DeliveryResult {
  const q = query.trim().toLowerCase();
  if (!q) {
    return {
      status: "unavailable",
      label: "Enter an area",
      detail: "Provide your area or LGA to check delivery options.",
      fee: 0,
    };
  }

  if (SAME_DAY_KEYWORDS.some((k) => q.includes(k))) {
    return {
      status: "same-day",
      label: "Same-day delivery available",
      detail: "Order before 2:00 PM for delivery by 8:00 PM today",
      fee: 1500,
    };
  }

  return {
    status: "standard",
    label: "Same-day not yet available here",
    detail: "Standard delivery (3–5 days) is available for this area instead",
    fee: 900,
  };
}

export const LGAS = [
  "Eti-Osa",
  "Ikeja",
  "Surulere",
  "Yaba",
  "Kosofe",
  "Alimosho",
  "Lagos Island",
];
