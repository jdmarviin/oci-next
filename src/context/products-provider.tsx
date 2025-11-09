"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import getProductData, { Product } from "@/actions/products";
import { log } from "console";
import { API_URL } from "@/functions/api";

interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { ok, data } = await getProductData();
      if (ok) {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const data: EventSourceInit = {
    withCredentials: true
  }

  useEffect(() => {
    fetchProducts();

    const eventSource = new EventSource(`${API_URL}/sse/stream`);
    
    eventSource.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);

        switch (update.type) {
          case "create":
            setProducts((prev) => [...prev, update.product]);
            console.log('ENTROU NO CREATE', update);
            
            break;

          case "update":
            setProducts((prev) =>
              prev.map((p) =>
                p.id === update?.product?.id ? update?.product : p
              )
            );
            break;

          case "delete":
            setProducts((prev) =>
              prev.filter((p) => p.id !== update.product?.id)
            );

            console.log(update);
            break;

          case "full-update":
            setProducts(update.products);
            break;

          default:
            console.log(update);
            console.warn("Tipo de evento desconhecido:", update.type);
        }
      } catch (err) {
        console.error("Erro ao processar atualização SSE:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("Erro na conexão SSE:", err);
      // setError('Erro na conexão em tempo real');
      eventSource.close();
    };

    // Cleanup
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, isLoading, refetch: fetchProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be within ProductsProvider");
  return context;
};

export default ProductsProvider;
