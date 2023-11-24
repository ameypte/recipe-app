import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const POST = async (req, res) => {
  const data = await req.json();

  console.log(data);
  const username = data.username;
  const password = data.password;

  const user = await query({
    query: "select * from users where username = ? and password = ?",
    values: [username, password],
  });

  if (user.user_id) {
    return NextResponse.json(
      { message: "Invalid uername or password" },
      { status: 400 }
    );
  }

  return NextResponse.json({ user: user }, { status: 200 });
};
