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
    <>
      <SidebarProvider>
        <AppSidebar user={user} />
        <div className="content flex flex-col h-full w-full mx-4">
          <Header />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}
