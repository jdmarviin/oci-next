"use client";
import getProductData, { Product } from "@/actions/products";
import React, { createContext, ReactNode } from "react";

interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Função para buscar produtos iniciais via REST
  const fetchProducts = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = true //(await cookies()).get("token")?.value

      if (token) {
        const response = await getProductData();

        if (response.ok) {
          const products = response.data.filter(p => p.scrapper_data)
          setProducts(products);
        } 
      } else {
        setProducts([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Configurar SSE para atualizações em tempo real
  React.useEffect(() => {
    // Buscar dados iniciais
    fetchProducts();

    // Configurar conexão SSE
    // const eventSource = new EventSource('http://127.0.0.1:8000/sse/stream');

    // eventSource.onmessage = (event) => {
    //   try {
    //     const update = JSON.parse(event.data);
        
    //     switch (update.type) {
    //       case 'create':
    //         setProducts(prev => [...prev, update.product]);
    //         break;
          
    //       case 'update':
    //         setProducts(prev => 
    //           prev.map(p => p.id === update?.product?.id ? update?.product : p)
    //         );
    //         break;
          
    //       case 'delete':
    //         setProducts(prev => prev.filter(p => p.id !== update.productId));
    //         break;
          
    //       case 'full-update':
    //         setProducts(update.products);
    //         break;
          
    //       default:
    //         console.warn('Tipo de evento desconhecido:', update.type);
    //     }
    //   } catch (err) {
    //     console.error('Erro ao processar atualização SSE:', err);
    //   }
    // };

    // eventSource.onerror = (err) => {
    //   console.error('Erro na conexão SSE:', err);
    //   setError('Erro na conexão em tempo real');
    //   eventSource.close();
    // };

    // // Cleanup
    // return () => {
    //   eventSource.close();
    // };
  }, [fetchProducts]);

  return (
    <ProductsContext.Provider value={{ products, isLoading, error, refetch: fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = React.useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts deve ser usado dentro de ProductsProvider');
  }
  return context;
}
