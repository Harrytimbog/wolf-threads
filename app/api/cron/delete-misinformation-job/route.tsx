import { sql } from "@/connnectDB";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("executing delete misinformation job");

  const res = await sql(
    "DELETE from posts WHERE is_misinformation = true AND is_misinformation_flagged_at <= now() - interval '1 minute'"
  );

  return NextResponse.json({
    msg: `misinformation posts deleted ${res.rowCount}`,
  });
}
