import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Public endpoint for software to validate keys
export async function POST(req: Request) {
    try {
        const { license_key, device_fingerprint } = await req.json()

        if (!license_key) {
            return NextResponse.json({ valid: false, message: 'License key required' }, { status: 400 })
        }

        const supabase = await createClient()

        // 1. Check if license exists and is active
        const { data: license, error } = await supabase
            .from('licenses')
            .select('*')
            .eq('license_key', license_key)
            .single()

        if (error || !license) {
            return NextResponse.json({ valid: false, message: 'Invalid license key' }, { status: 404 })
        }

        if (license.status !== 'active') {
            return NextResponse.json({ valid: false, message: 'License is ' + license.status }, { status: 403 })
        }

        // 2. Mock Device Locking Logic (Optional for MVP)
        // If this is the first activation, lock it to this device
        if (!license.activated_at) {
            await supabase
                .from('licenses')
                .update({
                    activated_at: new Date().toISOString(),
                    device_fingerprint: device_fingerprint || 'unknown'
                })
                .eq('id', license.id)
        } else if (device_fingerprint && license.device_fingerprint && license.device_fingerprint !== device_fingerprint) {
            // Basic strict mode: if device doesn't match, deny
            // return NextResponse.json({ valid: false, message: 'License already activated on another device' }, { status: 403 })
        }

        return NextResponse.json({
            valid: true,
            message: 'License is valid',
            license: {
                id: license.id,
                status: license.status,
                type: 'standard'
            }
        })

    } catch (error) {
        console.error('Validation error:', error)
        return NextResponse.json({ valid: false, message: 'Validation failed' }, { status: 500 })
    }
}
