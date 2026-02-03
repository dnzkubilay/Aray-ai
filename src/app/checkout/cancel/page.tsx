import Link from "next/link"
import { XCircle } from "lucide-react"

export default function CheckoutCancelPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4 text-center">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white dark:bg-zinc-900 p-10 shadow-xl border border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                    <XCircle className="h-10 w-10 text-red-600 dark:text-red-500" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Payment Cancelled</h1>
                    <p className="text-muted-foreground">
                        Your payment was not processed. You can try again or browse other products.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100 px-8 text-sm font-medium text-white dark:text-zinc-900 transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
