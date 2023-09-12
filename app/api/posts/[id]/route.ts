import { sql } from "@/connnectDB";
import { getJWTPayload } from "@/util/auth";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const jwtPayload = await getJWTPayload();
  const res = await sql("select * from posts where id = $1 and user_id = $2", [
    params.id,
    jwtPayload.sub,
  ]);

  if (res.rowCount == 0) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  console.log(res);

  return NextResponse.json({ data: res.rows[0] });
}
