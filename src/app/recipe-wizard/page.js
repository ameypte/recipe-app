"use client";
import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function Recipe_wizard() {
  const [recipes, setRecipes] = useState([]);
  const [username, setUsername] = useState();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const responce = await fetch("/api/recipes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log(document.cookie);
    const data = await responce.json();

    setRecipes(data);
  };
  return (
    <div className="container mx-auto">
      <NavBar/>
      <div className="bg-white dark:bg-gray-900 py-6">
        {/* tag line */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
          <p className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl sm:tracking-tight lg:text-4xl">              Get Recipes by available ingredients{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
