import React from "react";
import NavBar from "@/components/NavBar";

export default function page({ params }) {
  const { recipeId } = params;
  return (
    <>
      <NavBar />
    </>
  );
}
