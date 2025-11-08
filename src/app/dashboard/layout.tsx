'use client'

import Header from "@/components/header/header";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/context/user-provider";
import React from "react";

export default function ImportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading, error, refetch} = useUser();

  if (isLoading) return <div className="w-full h-[80vh] flex justify-center items-center"><Spinner variant="bars" /></div>;

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <div className="mx-4">
          <Header />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
