"use client";

import { editProductWithAI } from "@/actions/edit_with_ai";
import React from "react";
import { Button } from "../ui/button";

export function ProductActions({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      await editProductWithAI(productId);
      alert("Produto editado com IA!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleEdit} disabled={isLoading}>
        {isLoading ? "Editando..." : "Editar com IA"}
      </Button>
      <Button onClick={handleEdit} disabled={isLoading}>
        {isLoading ? "Editando..." : "Editar"}
      </Button>
    </div>
  );
}
