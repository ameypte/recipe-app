"use client";
// Import the necessary components and hooks
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";

export default function RecipeWizard() {
  const [recipes, setRecipes] = useState([]);
  const [username, setUsername] = useState();
  const [selectedCat, setSelectedCat] = useState("Category");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch("/api/recipes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setRecipes(data);
  };

  // State to track the dropdown visibility
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleDropdownItemClick = (itemName) => {
    console.log(`Selected item: ${itemName}`);
    setSelectedCat(itemName);
    toggleDropdown();
  };

  return (
    <div className="container mx-auto">
      <NavBar />
      <div className="bg-white dark:bg-gray-900 py-6">
        {/* tag line */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl sm:tracking-tight lg:text-4xl">
              Get Recipes by available ingredients
            </p>
          </div>

          {/* Dropdown Button */}
          <div className="relative inline-block">
            <button
              id="dropdownDelayButton"
              className="text-white mt-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={toggleDropdown}
            >
              {selectedCat}{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown Content */}
            <div
              className={`absolute mt-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 divide-y divide-gray-100 rounded-lg shadow ${
                isDropdownVisible ? "block" : "hidden"
              }`}
            >
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleDropdownItemClick("Spices")}
              >
                Spices
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleDropdownItemClick("Vegetables")}
              >
                Vegetables
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleDropdownItemClick("Fruits")}
              >
                Fruits
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleDropdownItemClick("Dairy")}
              >
                Dairy
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleDropdownItemClick("Meat")}
              >
                Meat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
