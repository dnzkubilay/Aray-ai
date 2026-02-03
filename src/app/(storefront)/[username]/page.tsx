import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default async function StorefrontPage({ params }: { params: { username: string } }) {
    const supabase = await createClient()
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
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-indigo-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
            </div>

            <main className="relative z-10 container max-w-2xl mx-auto px-4 py-16 md:py-24">
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center space-y-6 mb-12">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative w-28 h-28 rounded-full bg-zinc-900 border-4 border-zinc-950 overflow-hidden">
                            {creator.avatar_url ? (
                                <Image src={creator.avatar_url} alt={creator.display_name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-3xl font-bold text-zinc-500">
                                    {creator.display_name?.[0]?.toUpperCase() || creator.username[0].toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-white">{creator.display_name || creator.username}</h1>
                        <p className="text-zinc-400 max-w-md mx-auto leading-relaxed">{creator.bio || "Digital creator."}</p>
                    </div>

                    <div className="flex gap-3">
                        {/* Placeholder Socials */}
                        {['twitter', 'github', 'instagram'].map(platform => (
                            <button key={platform} className="p-2 rounded-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-all text-zinc-400 hover:text-white">
                                <span className="sr-only">{platform}</span>
                                <div className="w-5 h-5 bg-current opacity-50" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Stack (Linktree Style) */}
                <div className="space-y-4">
                    {products?.map(product => (
                        <Link href={`/${username}/${product.slug}`} key={product.id} className="block group">
                            <div className="relative overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all duration-300 p-2 flex gap-4 hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-500/10">
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-800">
                                    {product.cover_image_url ? (
                                        <Image src={product.cover_image_url} alt={product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                                    )}
                                </div>

                                <div className="flex flex-col justify-center py-2 pr-4 flex-grow">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h3 className="font-semibold text-lg text-zinc-100 group-hover:text-indigo-400 transition-colors line-clamp-1">{product.title}</h3>
                                        <span className="shrink-0 px-2.5 py-1 rounded-full bg-white/10 text-xs font-medium text-white border border-white/10">
                                            ${(product.price_amount / 100).toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-400 line-clamp-2 mb-3">{product.short_description || "Instant digital download."}</p>
                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                        <span className="capitalize">{product.type.replace('_', ' ')}</span>
                                        <span>•</span>
                                        <span>Instant Delivery</span>
                                    </div>
                                </div>

                                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300 text-indigo-400">
                                    →
                                </div>
                            </div>
                        </Link>
                    ))}

                    {(!products || products.length === 0) && (
                        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
                            <p className="text-zinc-500">No products available yet.</p>
                        </div>
                    )}
                </div>

                <footer className="mt-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-500">
                        <span>Powered by</span>
                        <span className="font-bold text-zinc-300">ARAY</span>
                    </div>
                </footer>
            </main>
        </div>
    )
}
