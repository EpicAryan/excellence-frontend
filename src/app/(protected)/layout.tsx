"use client";

import { useEffect } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components";
import  Providers  from '@/app/providers'
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
    return (
      <Providers>
        <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger className="block md:hidden"/>
          {children}
        </main>
      </SidebarProvider>
      </Providers>
    );
}
