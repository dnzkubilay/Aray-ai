import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Check, Shield, Zap } from "lucide-react"

export default async function ProductDetailPage({ params }: { params: { username: string, product_slug: string } }) {
    const supabase = createClient()
    const { username, product_slug } = await params

    // Fetch product and verify creator
    const { data: product } = await supabase
        .from('products')
        .select('*, profiles!inner(*)') // Inner join to ensure profile matches/exists
        .eq('slug', product_slug)
        .eq('profiles.username', username)
        .single()

    if (!product) return notFound()
    const creator = product.profiles

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black py-12">
            <div className="container mx-auto px-4 max-w-5xl">

                <Link href={`/${username}`} className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
                    ← Back to {creator.display_name}'s Store
                </Link>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Left: Media */}
                    <div className="space-y-4">
                        <div className="aspect-video rounded-xl overflow-hidden bg-muted relative border shadow-sm">
                            {product.cover_image_url ? (
                                <Image src={product.cover_image_url} alt={product.title} fill className="object-cover" priority />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                                    <span className="text-6xl">📦</span>
                                </div>
                            )}
                        </div>

                        {/* Gallery could go here */}
                    </div>

                    {/* Right: Info & Checkout */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">{product.title}</h1>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>By {creator.display_name}</span>
                                <span>•</span>
                                <span className="capitalize">{product.type.replace('_', ' ')}</span>
                            </div>
                        </div>

                        <div className="border-t border-b py-6 text-2xl font-bold flex items-center justify-between">
                            ${(product.price_amount / 100).toFixed(2)}
                            <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                                Buy Now
                            </button>
                        </div>

                        <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                            <p>{product.description}</p>
                        </div>

                        <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <Zap className="w-5 h-5 text-indigo-500 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-sm">Instant Delivery</h4>
                                    <p className="text-sm text-muted-foreground">Get access to your files immediately after payment.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-indigo-500 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-sm">Secure Payment</h4>
                                    <p className="text-sm text-muted-foreground">Processed securely by Stripe. We don't store your card details.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
