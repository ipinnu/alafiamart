import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      email?: string;
      amount?: number;
      name?: string;
      phone?: string;
      payment?: string;
      option?: string;
    };

    const amount = Number(body.amount ?? 0);
    const email = body.email || "customer@alafiamart.ng";

    if (!amount || amount < 100) {
      return NextResponse.json(
        { ok: false, message: "Invalid amount" },
        { status: 400 },
      );
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    const reference = `ALAFIA_${Date.now()}`;

    if (!secret) {
      return NextResponse.json({
        ok: true,
        mock: true,
        reference,
        message:
          "Paystack keys not configured — using mock checkout success path",
      });
    }

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100),
        currency: "NGN",
        reference,
        metadata: {
          name: body.name,
          phone: body.phone,
          payment: body.payment,
          option: body.option,
        },
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/order/${reference}`,
      }),
    });

    const data = (await res.json()) as {
      status: boolean;
      message: string;
      data?: { authorization_url: string; reference: string };
    };

    if (!res.ok || !data.status || !data.data) {
      return NextResponse.json(
        { ok: false, message: data.message || "Paystack error" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      mock: false,
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 },
    );
  }
}
