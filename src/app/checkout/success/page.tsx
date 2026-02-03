import Link from "next/link"
import { CheckCircle, Download } from "lucide-react"

export default function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: { session_id: string }
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4 text-center">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white dark:bg-zinc-900 p-10 shadow-xl border border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Payment Successful!</h1>
                    <p className="text-muted-foreground">
                        Thank you for your purchase. A confirmation email has been sent to you.
                    </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg break-all">
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Session ID</p>
                    <p className="text-xs font-mono text-zinc-500">{searchParams.session_id}</p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/dashboard"
                        className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-8 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Go to Dashboard
                    </Link>
                    <button disabled className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-8 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 opacity-50 cursor-not-allowed">
                        <Download className="w-4 h-4" />
                        Download Files (Coming Soon)
                    </button>
                </div>
            </div>
        </div>
    )
}
