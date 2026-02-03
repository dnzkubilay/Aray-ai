import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function ProductsPage() {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return <div>Please log in to view products</div>
    }

    // Fetch products
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground">Manage your digital products and assets.</p>
                </div>
                <Link
                    href="/dashboard/products/new"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Product
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products?.map((product) => (
                    <Link href={`/dashboard/products/${product.id}`} key={product.id} className="group relative rounded-xl border border-zinc-800 bg-[#0a0a0a] text-zinc-100 shadow-none hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden">
                        {/* Glow Effect */}
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

                        <div className="relative">
                            {product.cover_image_url ? (
                                <div className="aspect-video w-full overflow-hidden bg-zinc-900 border-b border-zinc-800">
                                    <img src={product.cover_image_url} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                            ) : (
                                <div className="aspect-video w-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center border-b border-zinc-800 group-hover:from-indigo-950/30 group-hover:to-zinc-900 transition-colors">
                                    <span className="text-4xl contrast-50 grayscale group-hover:grayscale-0 transition-all duration-500">📦</span>
                                </div>
                            )}

                            <div className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold leading-none tracking-tight text-white group-hover:text-indigo-400 transition-colors">{product.title}</h3>
                                        <p className="text-sm text-zinc-500 line-clamp-2">{product.short_description || "No description provided."}</p>
                                    </div>
                                    <div className="shrink-0 rounded-md bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs font-mono font-medium text-white group-hover:border-indigo-500/30 group-hover:text-indigo-300 transition-colors">
                                        ${(product.price_amount / 100).toFixed(2)}
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-600">
                                    <span>Added {new Date(product.created_at).toLocaleDateString()}</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-zinc-500">{product.sales_count || 0} Sales</span>
                                    </div>
                                </div>

                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur px-2 py-1 rounded text-xs text-white border border-white/10">
                                    Edit Product
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {(!products || products.length === 0) && (
                    <div className="col-span-full py-12 text-center rounded-xl border border-dashed text-muted-foreground bg-muted/10">
                        <p>No products found. Create your first product to get started.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
