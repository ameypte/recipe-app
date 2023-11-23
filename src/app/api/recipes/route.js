import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const GET = async (req, res) => {
    const recipes = await query({
        query: "select * from recipes",
        values: [],
    });
    return NextResponse.json(recipes);
};

export const POST = async (req, res) => {
    const data = await req.json();

    const recipe_id = data.recipe_id;

    const recipes = await query({
        query: "select * from recipes where recipe_id = ?",
        values: [recipe_id],
    });

    return NextResponse.json({id: recipe_id});
};