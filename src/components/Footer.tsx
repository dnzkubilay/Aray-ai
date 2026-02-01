import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t border-zinc-800 bg-[#0a0a0a] py-8 mt-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-xs text-white font-bold">A</div>
                    <span className="text-zinc-400 text-sm font-medium">© {new Date().getFullYear()} ARAY AI</span>
                </div>

                <div className="flex items-center gap-6 text-sm text-zinc-500">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    <a href="mailto:support@aray.ai" className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    )
}
