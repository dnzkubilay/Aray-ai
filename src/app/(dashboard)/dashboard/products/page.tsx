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
                    <div key={product.id} className="group relative rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
                        {product.cover_image_url ? (
                            <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-800">
                                <img src={product.cover_image_url} alt={product.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                            </div>
                        ) : (
                            <div className="aspect-video w-full rounded-t-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center border-b">
                                <span className="text-4xl">📦</span>
                            </div>
                        )}

                        <div className="p-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold leading-none tracking-tight">{product.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.short_description || "No description provided."}</p>
                                </div>
                                <div className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-600">
                                    ${(product.price_amount / 100).toFixed(2)}
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                                <span>{new Date(product.created_at).toLocaleDateString()}</span>
                                <span>{product.sales_count || 0} Sales</span>
                            </div>
                        </div>
                    </div>
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
