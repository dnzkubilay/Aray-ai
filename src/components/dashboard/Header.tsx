"use client"

import { Bell, Search } from "lucide-react"

export function Header() {
    return (
        <header className="h-16 border-b border-zinc-800 bg-[#0a0a0a] backdrop-blur-md">
            <div className="flex items-center justify-between h-full px-6">
                <div className="flex items-center flex-1 gap-4">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full h-9 pl-9 pr-4 rounded-full border border-zinc-800 bg-zinc-900/50 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full ring-2 ring-[#0a0a0a]" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-indigo-600 ring-2 ring-zinc-800 flex items-center justify-center text-xs font-medium text-white">
                        U
                    </div>
                </div>
            </div>
        </header>
    )
}
