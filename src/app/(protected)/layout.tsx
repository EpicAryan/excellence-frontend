import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger className="block md:hidden"/>
          {children}
        </main>
      </SidebarProvider>
    );
}
