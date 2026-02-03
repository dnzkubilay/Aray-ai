import Link from "next/link"
import { CheckCircle, Key, Download } from "lucide-react"
import { fulfillOrder } from "@/app/actions/fulfillment"

export default async function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: { session_id: string }
}) {
    const { session_id } = await searchParams
    const result = await fulfillOrder(session_id)

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4 text-center">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white dark:bg-zinc-900 p-10 shadow-xl border border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Payment Successful!</h1>
                    <p className="text-muted-foreground">
                        {result.success
                            ? `You have successfully purchased ${result.productTitle}.`
                            : "We received your payment, but there was an issue fulfilling the order. Please contact support."
                        }
                    </p>
                    {result.error && <p className="text-sm text-red-500">{result.error}</p>}
                </div>

                {result.licenseKey && (
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-3">
                        <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
                            <Key className="w-5 h-5" />
                            <span>Your License Key</span>
                        </div>
                        <div className="flex items-center justify-between bg-white dark:bg-black p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                            <code className="text-lg font-mono tracking-widest text-zinc-800 dark:text-zinc-200">{result.licenseKey}</code>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Use this key to activate your software. A copy has been sent to your email.
                        </p>
                    </div>
                )}

                <div className="bg-muted/50 p-4 rounded-lg break-all">
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Session ID</p>
                    <p className="text-xs font-mono text-zinc-500">{session_id}</p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/dashboard/licenses"
                        className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-8 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        View My Licenses
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
