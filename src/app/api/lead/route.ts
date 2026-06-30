import { NextResponse } from "next/server";

// ============================================================================
// Lead capture stub.
// Accepts two payload types:
//   { type: "quiz",  firstName, email, answers }
//   { type: "apply", firstName, email, business, stage, revenue, challenge }
//
// TODO (integration): forward to the real destination — HubSpot / beehiiv /
// MV CRM / Airtable / email automation. For now we just log and 200 so the
// funnel never blocks the user. Wire the real sink here.
// ============================================================================

export async function POST(req: Request) {
  let payload: unknown = null;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  // Server log only — replace with real CRM/email forward.
  console.log("[lead]", JSON.stringify(payload));

  return NextResponse.json({ ok: true });
}
