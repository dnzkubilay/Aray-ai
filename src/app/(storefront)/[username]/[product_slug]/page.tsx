
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Check, Shield, Zap, Globe } from "lucide-react"
import { createCheckoutSession } from "@/app/actions/stripe"
import { headers } from "next/headers"
import { calculatePPPPrice } from "@/lib/ppp"
import type { Metadata } from "next"

// Smart SEO Metadata Generator
export async function generateMetadata({ params }: { params: { username: string, product_slug: string } }): Promise<Metadata> {
    const supabase = await createClient()
    const { username, product_slug } = await params

    const { data: product } = await supabase
        .from('products')
        .select('*, profiles!inner(*)')
        .eq('slug', product_slug)
        .eq('profiles.username', username)
        .single()

    if (!product) return {}

    return {
        title: `${product.title} | ${product.profiles.display_name} on ARAY`,
        description: product.description.substring(0, 160) + '...',
        openGraph: {
            title: product.title,
            description: product.short_description || product.description,
            images: product.cover_image_url ? [product.cover_image_url] : [],
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.short_description || product.description,
            images: product.cover_image_url ? [product.cover_image_url] : [],
        }
    }
}

export default async function ProductDetailPage({ params }: { params: { username: string, product_slug: string } }) {
    const supabase = await createClient()
    const { username, product_slug } = await params

    // Get basic request info
    const reqHeaders = await headers()
    const country = reqHeaders.get('x-user-country') || 'US'

    // Fetch product and verify creator
    const { data: product } = await supabase
        .from('products')
        .select('*, profiles!inner(*)')
        .eq('slug', product_slug)
        .eq('profiles.username', username)
        .single()

    if (!product) return notFound()
    const creator = product.profiles

    // Helper to calculate PPP
    const pppData = calculatePPPPrice(product.price_amount, country)

    return (
        <div className="min-h-screen bg-[#0a0a0a] bg-grid-white/[0.02] text-zinc-100 py-12 relative overflow-hidden">
            {/* Spotlight effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">

                <Link href={`/${username}`} className="text-sm text-zinc-500 hover:text-white mb-8 inline-flex items-center gap-2 transition-colors">
                    ← Back to {creator.display_name}'s Store
                </Link>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Left: Media */}
                    <div className="space-y-4">
                        <div className="aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl relative">
                            {product.cover_image_url ? (
                                <Image src={product.cover_image_url} alt={product.title} fill className="object-cover" priority />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                                    <span className="text-6xl contrast-0 grayscale opacity-50">📦</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Info & Checkout */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">{product.title}</h1>
                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] items-center text-white font-bold">
                                    {creator.display_name.charAt(0)}
                                </div>
                                <span>By <span className="text-white font-medium">{creator.display_name}</span></span>
                                <span>•</span>
                                <span className="capitalize px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs">{product.type.replace('_', ' ')}</span>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="border-y border-zinc-800 py-6">
                            {pppData ? (
                                <div className="mb-4 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                    <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-1">
                                        <Globe className="w-4 h-4" />
                                        <span>Purchasing Power Parity Applied for {pppData.countryName}</span>
                                    </div>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-3xl font-bold text-white">${pppData.finalPrice.toFixed(2)}</span>
                                        <span className="text-lg text-zinc-500 line-through">${pppData.originalPrice.toFixed(2)}</span>
                                        <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">
                                            {pppData.discountPercentage}% OFF
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-3xl font-bold text-white mb-4">
                                    ${(product.price_amount / 100).toFixed(2)}
                                </div>
                            )}

                            <form action={async () => {
                                "use server"
                                await createCheckoutSession(product.id)
                            }}>
                                <button type="submit" className="w-full bg-white text-black h-14 rounded-full text-lg font-bold hover:bg-zinc-200 transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                    Buy Now
                                </button>
                            </form>
                            <p className="text-center text-xs text-zinc-500 mt-3">Secure payment via Stripe • Instant Access</p>
                        </div>

                        <div className="prose prose-invert max-w-none text-zinc-400">
                            <p>{product.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50">
                                <Zap className="w-5 h-5 text-yellow-500 mb-2" />
                                <h4 className="font-semibold text-sm text-white">Instant Delivery</h4>
                                <p className="text-xs text-zinc-500 mt-1">Files are delivered via email immediately.</p>
                            </div>
                            <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50">
                                <Shield className="w-5 h-5 text-emerald-500 mb-2" />
                                <h4 className="font-semibold text-sm text-white">Secure & Safe</h4>
                                <p className="text-xs text-zinc-500 mt-1">Encrypted payments. No card data reduced.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
