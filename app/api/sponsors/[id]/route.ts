import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/auth";

export async function DELETE(
  _request: Request,
  { params }: RouteContext<"/api/sponsors/[id]">,
) {
  const supabase = await getAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.rpc("ieee_sponsors_delete", {
    target: (await params).id,
  });
  if (error) {
    return NextResponse.json(
      { error: "Couldn't delete the sponsor." },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
