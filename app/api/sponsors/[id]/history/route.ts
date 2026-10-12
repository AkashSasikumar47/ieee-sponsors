import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: RouteContext<"/api/sponsors/[id]/history">,
) {
  const supabase = await getAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await supabase
    .from("ieee_sponsors_changes")
    .select("id, action, fields, actor_email, created_at")
    .eq("company_id", (await params).id)
    .order("created_at", { ascending: false })
    .limit(30);

  return NextResponse.json({ changes: data ?? [] });
}
