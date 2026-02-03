import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export default async function middleware(request: NextRequest) {
    // Clone the request headers
    const requestHeaders = new Headers(request.headers)

    // Get country from Vercel header or default to 'US' for local dev
    const country = request.headers.get('x-vercel-ip-country') || 'US'
    requestHeaders.set('x-user-country', country)

    // Pass the modified headers to the session update function
    // Note: You'll need to update updateSession to accept headers if it doesn't already,
    // or we can set it on the response. 
    // For Supabase middleware, it's often easier to just let the page read the header 
    // if we are just forwarding it. But since we need it in Server Components, 
    // we should just ensure clarity.

    // Actually, simply setting it on the response for downstream might be tricky with `updateSession`
    // which returns a response. Let's just pass the request as is, but we want 
    // the PAGE to see this header. 

    // Next.js middleware allows setting headers on the *response* (for the client)
    // or modifying the *request* (for the server components).

    const response = await updateSession(request)

    // We also want to set the header on the response so the browser/client can see it 
    // (though strictly we read it in Server Components from request headers).
    response.headers.set('x-user-country', country)

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
