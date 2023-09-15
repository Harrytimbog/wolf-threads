import { sql } from "@/connnectDB";
import { authorizeAdmin } from "@/util/auth";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  return authorizeAdmin(async () => {
    const { id } = params;
    console.log(`flagging ${id} as is_misinformation`);
    await sql(
      "UPDATE posts SET is_misinformation = true, is_misinformation_flagged_at = now() WHERE id = $1",
      [id]
    );

    return NextResponse.json({ msg: "flagged as misinformation" });
  });
}
