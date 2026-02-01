"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    ShoppingBag,
    Settings,
    CreditCard,
    LogOut,
    Package
} from "lucide-react"

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        href: "/dashboard/products",
        icon: Package,
    },
    {
        title: "Orders",
        href: "/dashboard/orders",
        icon: ShoppingBag,
    },
    {
        title: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full border-r bg-muted/10">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                    ARAY AI
                </h1>
            </div>

            <div className="flex-1 px-4 space-y-2">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                            pathname === item.href
                                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.title}
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Log Out
                </button>
            </div>
        </div>
    )
}
