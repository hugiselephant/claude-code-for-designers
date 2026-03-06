import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { getDb } from "@/lib/db/server";
import { enrollments } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Stripe Webhook] Signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const cohortId = session.metadata?.cohortId;
    const userId = session.metadata?.userId;

    if (cohortId && userId) {
      const db = getDb();
      await db
        .insert(enrollments)
        .values({
          userId,
          cohortId,
          status: "active",
          stripeSessionId: session.id,
        })
        .onConflictDoNothing();

      console.log(
        `[Stripe Webhook] Enrollment created: user=${userId} cohort=${cohortId}`,
      );
    }
  }

  return NextResponse.json({ received: true });
}
