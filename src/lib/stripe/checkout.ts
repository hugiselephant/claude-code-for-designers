import { getStripe } from "./client";

export async function createCheckoutSession({
  cohortId,
  cohortName,
  priceInCents,
  userId,
  userEmail,
  successUrl,
  cancelUrl,
}: {
  cohortId: string;
  cohortName: string;
  priceInCents: number;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return getStripe().checkout.sessions.create({
    mode: "payment",
    customer_email: userEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: cohortName },
          unit_amount: priceInCents,
        },
        quantity: 1,
      },
    ],
    metadata: { cohortId, userId },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}
