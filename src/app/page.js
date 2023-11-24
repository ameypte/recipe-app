"use client";
import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

export default function Home() {
  useEffect(() => {
    getRecipes();
  }, []);

  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const responce = await fetch("/api/recipes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await responce.json();

    setRecipes(data);
  };
  return (
    <div className="container mx-auto">
      <NavBar />
      <div className="bg-white dark:bg-gray-900 py-16">
        {/* tag line */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Find your Bhavesh favorite recipe
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400 mb-5">
              Search for your favorite recipe and find out how to make it at
              home.
            </p>
          </div>
        </div>

        {/* search bar */}
        <form className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search recipes"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* container to display recipes */}
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 m-10">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/*  map  */}
          {recipes.map((recipe) => (
            <RecipeCard
              recipeName={recipe.title}
              description={recipe.description}
              imageUrl={
                "https://www.allrecipes.com/thmb/fFW1o307WSqFFYQ3-QXYVpnFj6E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
