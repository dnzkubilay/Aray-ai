"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Stripe from "stripe"

export async function createCheckoutSession(productId: string) {
    const supabase = await createClient()

    if (!process.env.STRIPE_SECRET_KEY) {
        console.error("Missing STRIPE_SECRET_KEY")
        throw new Error("Stripe is not configured")
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2026-01-28.clover",
    })

    // 1. Get Product Details
    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

    if (!product) {
        throw new Error("Product not found")
    }

    // 2. Create Stripe Session
    // For MVP: We are using direct charges. In Phase 2 we will use Connect (on_behalf_of).
    // Note: STRIPE_SECRET_KEY needs to be added to .env.local

    if (!process.env.STRIPE_SECRET_KEY) {
        console.error("Missing STRIPE_SECRET_KEY")
        // For demo purposes, we might want to return an error ormock
        throw new Error("Stripe is not configured")
    }

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.title,
                        description: product.short_description || undefined,
                        images: product.cover_image_url ? [product.cover_image_url] : [],
                    },
                    unit_amount: product.price_amount, // Amount in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/cancel`,
        metadata: {
            productId: product.id,
            creatorId: product.creator_id,
        },
    })

    if (session.url) {
        redirect(session.url)
    }
}
