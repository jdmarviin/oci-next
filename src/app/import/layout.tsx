import Header from "@/components/header/header";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default async function ImportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="content flex flex-col h-full w-full mx-4">
          <Header />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}
