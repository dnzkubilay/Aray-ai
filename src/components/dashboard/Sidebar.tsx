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
    Package,
    Key
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
    {
        title: "Licenses",
        href: "/dashboard/licenses",
        icon: Key,
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full border-r border-zinc-800 bg-[#0a0a0a] text-zinc-400">
            <div className="p-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">A</div>
                    <span className="text-xl font-bold text-white tracking-tight">ARAY AI</span>
                </div>
            </div>

            <div className="flex-1 px-3 space-y-1">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                            pathname === item.href
                                ? "bg-zinc-900/50 text-white shadow-sm ring-1 ring-zinc-800"
                                : "hover:bg-zinc-900/30 hover:text-white"
                        )}
                    >
                        <item.icon className={cn("w-5 h-5 transition-colors", pathname === item.href ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300")} />
                        {item.title}
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t border-zinc-800">
                <button className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium text-zinc-500 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Log Out
                </button>
            </div>
        </div>
    )
}
