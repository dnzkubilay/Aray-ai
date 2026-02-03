"use client"

import { createClient } from "@/lib/supabase/client"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Upload, Loader2, Save } from "lucide-react"
import Link from "next/link"

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const supabase = createClient()
    const { id: productId } = use(params)

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        slug: ""
    })

    // Fetch product data
    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) {
                    router.push('/login')
                    return
                }

                const { data: product, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', productId)
                    .eq('creator_id', user.id)
                    .single()

                if (error || !product) {
                    throw new Error("Product not found")
                }

                setFormData({
                    title: product.title,
                    description: product.description || "",
                    price: (product.price_amount / 100).toString(),
                    slug: product.slug
                })
            } catch (error) {
                console.error("Error fetching product:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [productId, supabase, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const priceAmount = parseFloat(formData.price) * 100

            const { error } = await supabase
                .from('products')
                .update({
                    title: formData.title,
                    description: formData.description,
                    price_amount: priceAmount,
                    // slug is typically not updated to preserve SEO links, but can be if needed
                })
                .eq('id', productId)

            if (error) throw error

            router.push('/dashboard/products')
            router.refresh()
        } catch (error) {
            console.error('Error updating product:', error)
            alert('Failed to update product')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/products"
                    className="p-2 rounded-full hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Edit Product</h1>
                    <p className="text-zinc-400">Update your product details.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Basic Info */}
                <div className="space-y-4 rounded-xl border border-zinc-800 bg-[#0a0a0a] p-6">
                    <h3 className="font-semibold text-zinc-200">Product Details</h3>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Title</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Ultimate Icon Pack"
                            className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none placeholder:text-zinc-600"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Description</label>
                        <textarea
                            required
                            placeholder="Describe your product..."
                            rows={4}
                            className="flex w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none resize-none placeholder:text-zinc-600"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4 rounded-xl border border-zinc-800 bg-[#0a0a0a] p-6">
                    <h3 className="font-semibold text-zinc-200">Pricing</h3>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Price (USD)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-zinc-500">$</span>
                            <input
                                required
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900/50 pl-7 pr-3 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none placeholder:text-zinc-600"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Aray-Scan™ AI Analyzer */}
                <div className="space-y-4 rounded-xl border border-indigo-500/20 bg-indigo-950/10 p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold flex items-center gap-2 text-zinc-200">
                            <span className="text-indigo-400">✨ Aray-Scan™</span>
                            Re-Analyze
                        </h3>
                        {uploading && <span className="text-xs text-indigo-400 animate-pulse">Analyzing content...</span>}
                    </div>

                    <div
                        className="border-2 border-dashed border-indigo-900 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-indigo-900/10 transition-colors cursor-pointer relative overflow-hidden"
                        onClick={() => document.getElementById('ai-upload')?.click()}
                    >
                        <input
                            id="ai-upload"
                            type="file"
                            className="hidden"
                            onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (!file) return

                                setUploading(true)
                                // Mock call to Aray-Scan API
                                const formData = new FormData()
                                formData.append('file', file)

                                try {
                                    const res = await fetch('/api/analyze', { method: 'POST', body: formData })
                                    const data = await res.json()

                                    if (data.success) {
                                        setFormData(prev => ({
                                            ...prev,
                                            title: data.data.title,
                                            description: data.data.description,
                                            price: data.data.suggested_price.toString()
                                        }))
                                    }
                                } catch (err) {
                                    console.error(err)
                                } finally {
                                    setUploading(false)
                                }
                            }}
                        />

                        {uploading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-10">
                                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                            </div>
                        ) : null}

                        <Upload className="w-8 h-8 text-indigo-500 mb-4" />
                        <p className="text-sm font-medium text-zinc-300">Drop a file to update details</p>
                        <p className="text-xs text-zinc-500 mt-1">AI will re-generate metadata</p>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/dashboard/products" className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    )
}
