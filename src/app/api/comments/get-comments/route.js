import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const POST = async (req, res) => {
    try {
        const data = await req.json();
        const recipe_id = data.recipe_id;
        const comments = await query({
            query: "SELECT * FROM comments WHERE recipe_id = ?",
            values: [recipe_id],
        });
        return NextResponse.json(comments);
    }
    catch (e) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
}
