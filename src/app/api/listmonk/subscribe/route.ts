import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { subscribeToList } from "@/lib/listmonk/client";

const schema = z.object({
  email: z.string().email().max(255),
  name: z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    await subscribeToList(parsed.data.email, parsed.data.name ?? "", [1]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Listmonk] Subscription error:", err);
    return NextResponse.json(
      { error: "Subscription failed" },
      { status: 500 },
    );
  }
}
