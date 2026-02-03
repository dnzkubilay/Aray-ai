import { createClient } from "@/lib/supabase/server"
import { Shield, Check, X, Clock, Key } from "lucide-react"

export default async function LicensesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Fetch licenses for products created by this user
    // We join products to get the title
    const { data: licenses } = await supabase
        .from('licenses')
        .select('*, products!inner(title, creator_id)')
        .eq('products.creator_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">License Management</h2>
                    <p className="text-muted-foreground">Monitor activated software licenses.</p>
                </div>
            </div>

            <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                            <tr>
                                <th className="px-6 py-4 font-medium">Product</th>
                                <th className="px-6 py-4 font-medium">License Key</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Created</th>
                                <th className="px-6 py-4 font-medium">Activated</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {licenses?.map((license) => (
                                <tr key={license.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{license.products.title}</td>
                                    <td className="px-6 py-4 font-mono text-zinc-400">
                                        <div className="flex items-center gap-2">
                                            <Key className="w-4 h-4 text-indigo-500" />
                                            {license.license_key}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${license.status === 'active'
                                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {license.status === 'active' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                            {license.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-500">
                                        {new Date(license.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-500">
                                        {license.activated_at ? (
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-3 h-3" />
                                                {new Date(license.activated_at).toLocaleDateString()}
                                            </span>
                                        ) : (
                                            <span className="text-zinc-600 italic">Not activated</span>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {(!licenses || licenses.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                        No licenses found. Sell a 'Software' product to generate keys.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
