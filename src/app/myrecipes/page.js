"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MyRecipeCard from "@/components/MyRecipeCard";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

function MyRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [username, setUsername] = useState();
  const router = useRouter();

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
    console.log(data);
    setRecipes(data);
  };
  return (
    <div>
      <nav
        className="bg-white border-gray-200 dark:bg-gray-900"
        style={{
          position: "sticky",
          top: "0px",
          left: "0px",
          zIndex: 1000,
        }}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-blue-500"
                  onClick={() => router.push("/")}
                >
                  Home
                </a>
              </li>
              {username ? (
                <Link href="/myrecipes">
                  <li>
                    <a
                      href="#"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:text-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      aria-current="page"
                    >
                      My Recipes
                    </a>
                  </li>
                </Link>
              ) : null}
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Recipe Wizard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {username ? (
            <div className="flex items-center space-x-4">
              <p className="text-gray-900 dark:text-white">
                Welcome {username}!
              </p>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("username");
                  router.push("/");
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Login/Register
              </button>
            </Link>
          )}
        </div>
      </nav>
      <div className="bg-white dark:bg-gray-900 py-5">
        {/* tag line */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mb-7">
          <div className="text-center">
            <p className="mt-1 text-4xl font-bold text-gray-900 dark:text-white sm:text-4xl sm:tracking-tight lg:text-5xl">
              My Recipes
            </p>
          </div>
        </div>
        <form className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
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
        {/* add recipe button to right*/}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 flex justify-end">
          <Link href="/add-recipe">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-gree-700 focus:outline-none dark:focus:ring-green-800"
            >
              <IoMdAdd className="inline-block mr-2 " size={18} />
              Add Recipe
            </button>
          </Link>
        </div>

        {/* recipe card is horizontal */}
        {recipes.map((recipe) => {
          if (localStorage.getItem("userId") == recipe.user_id) {
            return (
              <MyRecipeCard
                recipeName={recipe.title}
                description={recipe.description}
                imageUrl={
                  "https://www.allrecipes.com/thmb/fFW1o307WSqFFYQ3-QXYVpnFj6E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg"
                }
              />
            );
          }
        })}
      </div>
    </div>
  );
}
export default MyRecipe;
