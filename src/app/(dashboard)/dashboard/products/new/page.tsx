"use client"

import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Upload, Loader2 } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
    const router = useRouter()
    const supabase = createClient()

    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        slug: ""
    })

    // Basic slug generator
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        setFormData(prev => ({ ...prev, title, slug }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("Not authenticated")

            const priceAmount = parseFloat(formData.price) * 100 // Convert to cents

            const { error } = await supabase
                .from('products')
                .insert({
                    creator_id: user.id,
                    title: formData.title,
                    slug: formData.slug + '-' + Math.random().toString(36).substring(7), // Ensure uniqueness
                    type: 'digital_asset', // Default for MVP
                    description: formData.description,
                    price_amount: priceAmount,
                    status: 'published' // Auto-publish for MVP
                })

            if (error) throw error

            router.push('/dashboard/products')
            router.refresh()
        } catch (error) {
            console.error('Error creating product:', error)
            alert('Failed to create product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/products"
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create New Product</h1>
                    <p className="text-muted-foreground">Share your digital creation with the world.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Basic Info */}
                <div className="space-y-4 rounded-xl border bg-card p-6">
                    <h3 className="font-semibold">Product Details</h3>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Ultimate Icon Pack"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                            value={formData.title}
                            onChange={handleTitleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug (URL)</label>
                        <div className="flex items-center h-10 w-full rounded-md border border-input bg-muted/50 px-3 text-sm text-muted-foreground">
                            aray.ai/p/{formData.slug || '...'}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            required
                            placeholder="Describe your product..."
                            rows={4}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>

                {/* Pricing */}
                <div className="space-y-4 rounded-xl border bg-card p-6">
                    <h3 className="font-semibold">Pricing</h3>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price (USD)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                            <input
                                required
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                className="flex h-10 w-full rounded-md border border-input bg-background pl-7 pr-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Aray-Scan™ AI Analyzer */}
                <div className="space-y-4 rounded-xl border border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/10 p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold flex items-center gap-2">
                            <span className="text-indigo-600 dark:text-indigo-400">✨ Aray-Scan™</span>
                            Analyzer
                        </h3>
                        {uploading && <span className="text-xs text-indigo-600 animate-pulse">Analyzing content...</span>}
                    </div>

                    <div
                        className="border-2 border-dashed border-indigo-200 dark:border-indigo-900 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors cursor-pointer relative overflow-hidden"
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
                            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm z-10">
                                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                            </div>
                        ) : null}

                        <Upload className="w-8 h-8 text-indigo-500 mb-4" />
                        <p className="text-sm font-medium">Drop a file to auto-generate details</p>
                        <p className="text-xs text-muted-foreground mt-1">AI will detect metadata, price, and descriptions</p>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/dashboard/products" className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Create Product
                    </button>
                </div>

            </form>
        </div>
    )
}
