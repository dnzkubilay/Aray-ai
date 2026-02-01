import { Sidebar } from "@/components/dashboard/Sidebar"
import { Header } from "@/components/dashboard/Header"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Sidebar */}
            <div className="hidden md:block w-64 h-full">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
