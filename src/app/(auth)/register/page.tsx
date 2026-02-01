import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Zap } from "lucide-react"

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
            <div className="w-full max-w-sm space-y-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center mb-2">
                        <Zap className="h-6 w-6 text-white" fill="currentColor" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email below to create your account
                    </p>
                </div>

                {success ? (
                    <div className="rounded-md bg-green-500/10 p-4 text-center text-sm text-green-600 border border-green-500/20">
                        <p className="font-semibold">Check your email</p>
                        <p>We sent you a confirmation link. Be sure to check your spam too.</p>
                        <div className="mt-4">
                            <Link href="/login" className="text-indigo-600 underline">Back to login</Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        <form onSubmit={handleRegister}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium leading-none" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={loading}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium leading-none" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        placeholder="••••••••"
                                        type="password"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        disabled={loading}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {error && (
                                    <div className="text-sm text-red-500 font-medium">
                                        {error}
                                    </div>
                                )}

                                <button
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-primary-foreground hover:bg-indigo-700 h-10 w-full"
                                    disabled={loading}
                                >
                                    {loading ? "Creating account..." : "Create Account"}
                                </button>
                            </div>
                        </form>

                        <p className="px-8 text-center text-sm text-muted-foreground">
                            <Link
                                href="/login"
                                className="hover:text-brand underline underline-offset-4"
                            >
                                Already have an account? Sign In
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
