import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default async function StorefrontPage({ params }: { params: { username: string } }) {
    const supabase = createClient()
    const { username } = await params

    // Fetch creator profile
    const { data: creator } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()

    if (!creator) return notFound()

    // Fetch creator's products
    const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('creator_id', creator.id)
        .eq('status', 'published')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            {/* Creator Header */}
            <div className="border-b bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mb-4 overflow-hidden relative">
                        {creator.avatar_url && <Image src={creator.avatar_url} alt={creator.display_name} fill className="object-cover" />}
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">{creator.display_name || creator.username}</h1>
                    <p className="text-muted-foreground max-w-lg mb-6">{creator.bio || "Digital creator."}</p>
                    {/* Social Links could go here */}
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products?.map(product => (
                        <Link href={`/${username}/${product.slug}`} key={product.id} className="group block">
                            <div className="rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                                <div className="aspect-video bg-muted relative overflow-hidden">
                                    {product.cover_image_url ? (
                                        <Image src={product.cover_image_url} alt={product.title} fill className="object-cover transition-transform group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 flex items-center justify-center">
                                            <span className="text-4xl">📦</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.short_description || "No description."}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                            ${(product.price_amount / 100).toFixed(2)}
                                        </span>
                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                            {product.type.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {(!products || products.length === 0) && (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            No products available yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
