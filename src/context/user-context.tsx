"use client";

import getUserData, { User } from "@/actions/get_user";
import React, { createContext, ReactNode } from "react";

interface UserContextType {
  user: User | undefined;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchUser = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const id = JSON.parse(localStorage.getItem('user') as string) as string

      if (id) {
        const response = await getUserData(id);

        if (response.ok) {
          const user = response.data
          setUser(user);
        } 
      } else {
        setUser(undefined);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, isLoading, error, refetch: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }
  return context;
}
