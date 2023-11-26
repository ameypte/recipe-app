"use client";
// Import the necessary components and hooks
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";

export default function RecipeWizard() {
  const [recipes, setRecipes] = useState([]);
  const [username, setUsername] = useState();
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [selectedCat, setSelectedCat] = useState("Select Category");
  const [checkedCategoryId, setcheckCategoryId] = useState([]);
  const [selectedIng, setSelectedIng] = useState("Select Category");
  const [recipeCategory, setRecipeCategory] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [ingredientsCategories, setIngredientsCategories] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    getRecipes();
    getRecipeIngredients();
    getRecipeCategories();
  }, []);

  const handleCheckboxChange = (Ingredient) => {
    if (checkedIngredients.includes(Ingredient.ingredient_id)) {
      setCheckedIngredients(
        checkedIngredients.filter((id) => id !== Ingredient.ingredient_id)
      );
      setcheckCategoryId(
        checkedIngredients.filter((id) => id !== Ingredient.category_id)
      );
    } else {
      setCheckedIngredients([...checkedIngredients, Ingredient.ingredient_id]);
      setcheckCategoryId([...checkedCategoryId, Ingredient.category_id]);
    }
  };
  const handleCheckAll = () => {
    if (selectAll) {
      setCheckedIngredients([]);
      setcheckCategoryId([]);
    } else {
      // Assuming ingredient IDs are unique and can be used as keys
      const allIngredientIds = ingredient.map(
        (ingredient) => ingredient.ingredient_id
      );
      const allCategoryIds = ingredient.map(
        (ingredient) => ingredient.category_id
      );
      setCheckedIngredients(allIngredientIds);
      setcheckCategoryId(allCategoryIds);
    }
    setSelectAll(!selectAll);
  };
  const getRecipes = async () => {
    const response = await fetch("/api/recipes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setRecipes(data);
  };
  const getRecipeCategories = async () => {
    const response = await fetch("/api/recipes/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setRecipeCategory(data);
  };
  const getRecipeIngredientsFromIngredientsTablePostReq = async (
    category_id
  ) => {
    const responce = await fetch("/api/ingredients/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category_id: category_id }),
    });

    const data = await responce.json();
    setIngredient(data.ingredients);
    console.log(data);
  };
  const getRecipeIngredients = async () => {
    const response = await fetch("/api/ingredients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setIngredientsCategories(data.ingredients_category);
  };
  // State to track the dropdown visibility
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(() => !isDropdownVisible);
  };
  const toggleDropdown2 = () => {
    setIsDropdownVisible2(() => !isDropdownVisible2);
  };
  const handleFindRecipe = () => {
    if (selectedCat === "Select Category") {
      alert("Select Category");
      return;
    }
    if (selectedIng === "Select Category") {
      alert("Select Ingredient Category");
      return;
    }
    if (!checkedIngredients.length > 0) {
      alert("Check in Some Ingredients");
    }
    console.log(checkedIngredients, selectedIng, selectedCat);
  };
  const handleDropdownItemClick = (itemName) => {
    console.log(`Selected item: ${itemName}`);
    setSelectedCat(itemName);
    toggleDropdown();
  };
  const handleDropdownItemClick2 = (itemName2, category_id) => {
    console.log(`Selected item: ${itemName2}`);
    setSelectedIng(itemName2);
    console.log(`Selected item: ${category_id}`);
    getRecipeIngredientsFromIngredientsTablePostReq(category_id);
    toggleDropdown2();
  };

  return (
    <div className="container mx-auto">
      <NavBar />
      <div className="bg-white dark:bg-gray-900 py-6">
        {/* tag line */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl sm:tracking-tight lg:text-4xl">
              Get Recipes by available ingredients
            </p>
          </div>
          <div className="flex">
            {/* Left Dropdown Button */}
            <div className="flex flex-col items-center relative ">
              <label
                htmlFor="category1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Recipe Category
              </label>
              <button
                id="dropdownDelayButton"
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

              {/* Left Dropdown Content */}
              {ingredientsCategories.length > 0 ? (
                <div
                  className={`absolute mt-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 divide-y divide-gray-100 rounded-lg shadow ${
                    isDropdownVisible ? "block" : "hidden"
                  }`}
                >
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleDropdownItemClick("All")}
                  >
                    All
                  </a>
                  {recipeCategory.map((ingredient) => (
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() =>
                        handleDropdownItemClick(ingredient.category_name)
                      }
                    >
                      {ingredient.category_name}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            {/*Right Dropdown Button */}
            <div className="flex flex-col items-center justify-center relative ">
              <label
                htmlFor="category1"
                className="block ml-7 mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ingredeints Category
              </label>
              <button
                id="dropdownDelayButton"
                className="text-white ml-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={toggleDropdown2}
              >
                {selectedIng}{" "}
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

              {/* Right Dropdown Content */}
              {ingredientsCategories.length > 0 ? (
                <div
                  className={`absolute mt-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 divide-y divide-gray-100 rounded-lg shadow ${
                    isDropdownVisible2 ? "block" : "hidden"
                  }`}
                >
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleDropdownItemClick2("All")}
                  >
                    All
                  </a>
                  {ingredientsCategories.map((ingredient) => (
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() =>
                        handleDropdownItemClick2(
                          ingredient.category_name,
                          ingredient.category_id
                        )
                      }
                    >
                      {ingredient.category_name}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          {/* Multiple checkbox input based on the the category of ingredients selected */}

          <h3 class="mb-4 mt-7 font-semibold text-gray-900 dark:text-white">
            Options
          </h3>
          <div class="flex items-center ps-3">
            <input
              id="vue-checkbox-list"
              type="checkbox"
              value=""
              onChange={handleCheckAll}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="vue-checkbox-list"
              class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {selectAll ? "Uncheck All" : "Check All"}
            </label>
          </div>
          <div>
            {/* <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="vue-checkbox-list"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="vue-checkbox-list"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Vue JS
                </label>
              </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="react-checkbox-list"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="react-checkbox-list"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  React
                </label>
              </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="angular-checkbox-list"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="angular-checkbox-list"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Angular
                </label>
              </div>
            </li>
            <li class="w-full dark:border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="laravel-checkbox-list"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="laravel-checkbox-list"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Laravel
                </label>
              </div>
            </li>
          </ul> */}
            <div className="flex">
              {ingredient.length > 0 &&
                ingredient.map((ingredient) => (
                  <ul
                    key={ingredient.id}
                    className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <li className="inline-block w-auto border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id={`checkbox-${ingredient.ingredient_id}`}
                          type="checkbox"
                          value=""
                          checked={checkedIngredients.includes(
                            ingredient.ingredient_id
                          )}
                          onChange={() => handleCheckboxChange(ingredient)}
                          className=" h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />

                        <label
                          htmlFor={`checkbox-${ingredient.ingredient_id}`}
                          className=" py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {ingredient.name}
                        </label>
                      </div>
                    </li>
                  </ul>
                ))}
            </div>
            {/* <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="vue-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Vue JS
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="react-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="react-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    React
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="angular-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="angular-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Angular
                  </label>
                </div>
              </li>
              <li class="w-full dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="laravel-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="laravel-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Laravel
                  </label>
                </div>
              </li>
            </ul>
            <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="vue-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Vue JS
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="react-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="react-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    React
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="angular-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="angular-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Angular
                  </label>
                </div>
              </li>
              <li class="w-full dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="laravel-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="laravel-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Laravel
                  </label>
                </div>
              </li>
            </ul>
            <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="vue-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Vue JS
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="react-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="react-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    React
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="angular-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="angular-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Angular
                  </label>
                </div>
              </li>
              <li class="w-full dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="laravel-checkbox-list"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="laravel-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Laravel
                  </label>
                </div>
              </li>
            </ul> */}
          </div>
          <div className="flex justify-end mt-5">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleFindRecipe}
            >
              Find
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
