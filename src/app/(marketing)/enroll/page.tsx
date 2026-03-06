import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { getDb, hasDatabase } from "@/lib/db/server";
import { cohorts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createCheckoutSession } from "@/lib/stripe/checkout";

export default async function EnrollPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/enroll");
  }

  if (!hasDatabase()) {
    redirect("/");
  }

  const db = getDb();
  const activeCohort = await db.query.cohorts.findFirst({
    where: eq(cohorts.status, "enrolling"),
    orderBy: (c, { desc }) => [desc(c.createdAt)],
  });

  if (!activeCohort) {
    redirect("/course");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const checkoutSession = await createCheckoutSession({
    cohortId: activeCohort.id,
    cohortName: activeCohort.name,
    priceInCents: activeCohort.price,
    userId: session.user.id,
    userEmail: session.user.email!,
    successUrl: `${appUrl}/dashboard?enrolled=true`,
    cancelUrl: `${appUrl}/course`,
  });

  if (checkoutSession.url) {
    redirect(checkoutSession.url);
  }

  redirect("/course");
}
