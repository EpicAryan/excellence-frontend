import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components";
import  Providers  from '@/app/providers'
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
      <Providers>
        <SidebarProvider>
        <AdminSidebar />
        <main className="w-full">
          <SidebarTrigger className="block md:hidden"/>
          {children}
        </main>
      </SidebarProvider>
      </Providers>
    );
}
