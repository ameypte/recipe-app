"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

export default function page({ params }) {
  const { recipeId } = params;
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getRecipe();
    getIngredients();
  }, []);

  const getIngredients = async () => {
    const responce = await fetch("/api/recipe-ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipe_id: recipeId }),
    });

    const data = await responce.json();

    setIngredients(data);
  }




  const getRecipe = async () => {
    const responce = await fetch("/api/recipe-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipe_id: recipeId }),
    });

    const data = await responce.json();

    setRecipe(data[0]);
  };



  return (
    <>
      <NavBar />
      <div className="bg-white dark:bg-gray-900 py-5 w-2/4 mx-auto">
        <p className="mt-1 mb-4 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-4xl">
          {recipe.recipe_name}
        </p>
        <p className="mb-3 mt-5 font-normal text-gray-700 dark:text-gray-400">
          {recipe.description}
        </p>

        <div className=" mt-5 ">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Recipe by: <span className="font-bold">
              {recipe.recipe_by}
            </span> | Posted
            on: <span className="font-bold">Undefined date</span>
          </p>
          <img
            class="h-auto rounded-lg "
            src=
            {recipe.image_url}
            alt="image description"
          />
        </div>
        {/* display servings and cooking time */}

        <div className="flex flex-row justify-between mt-5">
          <div className="flex flex-col">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Servings: <span className="font-bold">{recipe.servings}</span>
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Cook Time: <span className="font-bold">{recipe.cook_time}</span> minutes
            </p>
          </div>
          <div className="flex flex-col">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Recipe Category: <span className="font-bold">{recipe.recipe_category}</span>
            </p>
          </div>
        </div>

        <div className=" ">
          <h2 class="mb-2 mt-4 text-md font-bold text-gray-900 dark:text-white">
            Required Ingredients:
          </h2>
          <div className="flex flex-row space-x-4 justify-center">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Ingredient
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {ingredients.map((ingredient) => (
                    <tr class="bg-white dark:bg-gray-700">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                        {ingredient.ingredient_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {ingredient.category_name}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {ingredient.quantity}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {ingredient.measurement_unit}
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>

          <h2 class="mb-2 mt-5 text-xl font-bold text-gray-900 dark:text-white">
            Instructions
          </h2>
          {/* display instructions from the database */}
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {recipe.instructions}
          </p>


        </div>
      </div>
    </>
  );
}
