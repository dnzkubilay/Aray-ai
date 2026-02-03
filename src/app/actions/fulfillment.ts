"use server"

import { createClient } from "@/lib/supabase/server"
import Stripe from "stripe"
import { randomBytes } from "crypto"

export async function fulfillOrder(sessionId: string) {
    const supabase = await createClient()

    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Missing STRIPE_SECRET_KEY")
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2026-01-28.clover",
    })

    // 1. Verify Session
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
        return { success: false, error: "Payment not completed" }
    }

    const productId = session.metadata?.productId
    if (!productId) return { success: false, error: "Invalid session metadata" }

    // 2. Fetch Product
    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

    if (!product) return { success: false, error: "Product not found" }

    // 3. Create Order (Idempotency check could go here, but for MVP we assume 1 session = 1 order)
    // Check if order exists for this session to avoid duplicates
    const { data: existingOrder } = await supabase
        .from('orders')
        .select('*')
        .eq('stripe_session_id', sessionId)
        .single()

    let orderId = existingOrder?.id

    if (!existingOrder) {
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                product_id: product.id,
                buyer_id: null, // Guest checkout for now, or match via email
                amount: session.amount_total,
                status: 'completed',
                stripe_session_id: sessionId,
                customer_email: session.customer_details?.email
            })
            .select()
            .single()

        if (orderError) {
            console.error("Order creation failed:", orderError)
            return { success: false, error: "Failed to create order" }
        }
        orderId = order.id
    }

    // 4. Generate License if Software
    let licenseKey = null
    if (product.type === 'software') {
        // Check if license already exists
        const { data: existingLicense } = await supabase
            .from('licenses')
            .select('*')
            .eq('order_id', orderId)
            .single()

        if (existingLicense) {
            licenseKey = existingLicense.license_key
        } else {
            // Generate simple key: XXXX-XXXX-XXXX-XXXX
            const key = randomBytes(8).toString('hex').toUpperCase().match(/.{1,4}/g)?.join('-') || 'KEY-ERROR'

            const { error: licenseError } = await supabase
                .from('licenses')
                .insert({
                    order_id: orderId,
                    product_id: product.id,
                    license_key: key,
                    status: 'active'
                })

            if (!licenseError) {
                licenseKey = key
            }
        }
    }

    return {
        success: true,
        orderId,
        productTitle: product.title,
        licenseKey
    }
}
