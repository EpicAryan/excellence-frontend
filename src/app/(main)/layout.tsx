import { Navbar } from "@/components";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="overflow-x-hidden">
            <Navbar />
            {children}
        </main>
    );
}
