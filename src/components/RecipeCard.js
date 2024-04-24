"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";

export default function RecipeCard({
  recipeName,
  description,
  imageUrl,
  cookTime,
  recipeId,
  likes,
  recipe_category,
  recipe_by,
  username,
  user_id,
  isLiked = [],
  posted_on,
}) {
  const [isLiked2, setIsLiked] = useState(false);
  if (isLiked.length > 0) {
    useEffect(() => {
      setIsLiked(
        isLiked.some((likedRecipe) => likedRecipe.recipe_id === recipeId)
      );
    }, [isLiked, recipeId]);
  }
  console.log(isLiked2, "it is what it is");
  console.log(isLiked, "it is what it is");

  const [localLikes, setLocaLikes] = useState(likes);
  // const [likeCount, setLikeCount] = useState(0);
  function UpdateLocalLikes() {
    if (localStorage.getItem("username")) {
      setLocaLikes((prev) => prev + 1);
      getLIkes();
    } else {
      alert("You Need to Login to Like the Post");
    }
  }
  async function getLIkes() {
    // console.log();

    // console.log(username);
    if (username !== null) {
      const responce = await fetch("/api/likes/set-likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipe_id: recipeId,
          user_id: localStorage.getItem("name"),
        }),
      });

      const data = await responce.json();
      console.log(data);
      if (
        data.message == "Something went wrong User has already liked the post"
      ) {
        setIsLiked(() => true);
      } else {
      }
      setIsLiked(() => true);
    }
  }

  // setIngredients(data);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <a href="#">
        <Image
          width={400}
          height={200}
          className="rounded-t-lg max h-80"
          src={imageUrl}
          alt={recipeName}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {recipeName}
          </h5>
        </a>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <hr className="my-5" />
        <div className="flex flex-row justify-between mt-1 text-sm">
          <div className="flex flex-col">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Recipe by: <span className="font-bold">{recipe_by}</span>
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Cook Time: <span className="font-bold">{cookTime} minutes</span>
            </p>
          </div>
          <div className="flex flex-col">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Category: <span className="font-bold">{recipe_category}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center mt-2">
          <Link href="/recipes/[id]" as={`/recipes/${recipeId}`}>
            <button
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </Link>
          <button
            type="button"
            onClick={() =>
              !isLiked2
                ? UpdateLocalLikes()
                : alert("You have Already LIked the POst")
            }
            className="inline-flex items-center ml-3 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-blue-800"
          >
            {isLiked2 ? (
              <FaHeart className="text-red-500" size={22} />
            ) : (
              <CiHeart className="text-red-500" size={22} />
            )}
            <span className="ml-1 text-gray-700 dark:text-gray-400">
              {localLikes}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
