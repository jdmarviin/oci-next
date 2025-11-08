'use client'

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import getProductData, { Product } from '@/actions/products';

interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { ok, data } = await getProductData();
      if (ok) {
        setProducts(data.filter(p => p.scrapper_data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <ProductsContext.Provider value={{ products, isLoading, refetch: fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be within ProductsProvider');
  return context;
};

export default ProductsProvider;