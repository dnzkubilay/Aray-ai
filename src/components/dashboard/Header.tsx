"use client"

import { Bell, Search } from "lucide-react"

export function Header() {
    return (
        <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between h-full px-6">
                <div className="flex items-center flex-1 gap-4">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search products, orders..."
                            className="w-full h-9 pl-9 pr-4 rounded-md border border-input bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                </div>
            </div>
        </header>
    )
}
