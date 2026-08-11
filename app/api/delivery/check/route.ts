import { NextRequest, NextResponse } from "next/server";
import { checkDeliveryAvailability } from "@/lib/data/zones";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  return NextResponse.json({ ok: true, result: checkDeliveryAvailability(q) });
}
