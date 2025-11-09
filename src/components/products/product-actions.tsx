"use client";

import { editProductWithAI } from "@/actions/edit_with_ai";
import React from "react";
import { Button } from "../ui/button";

export function ProductActions({ productId, import_status }: { productId: string, import_status: string }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      await editProductWithAI(productId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditUser = async () => {
    setIsLoading(true);
    try {
      await editProductWithAI(productId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {
        import_status === 'IMPORTED' && (
          <Button onClick={handleEdit} disabled={isLoading}>
            {isLoading ? "Editando usando AI" : "Editar com IA"}
          </Button>
        )
      }

      {
        import_status === 'AI_EDITED' && (
          <Button onClick={handleEditUser} disabled={isLoading}>
            {isLoading ? "Salvando modificações..." : "Editar"}
          </Button>
        )
      }
      
      {
        (import_status === 'AI_EDITED' || import_status === 'USER_EDITED') && (
          <Button variant='outline' onClick={handleEdit} disabled={isLoading}>
            {isLoading ? "Exportando..." : "Export to Shopify"}
          </Button>
        )
      }
    </div>
  );
}
