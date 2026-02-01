import { Spotlight } from "@/components/ui/spotlight"
import Link from "next/link"
import { ArrowRight, Code, Database, Globe, LineChart, Lock, Zap } from "lucide-react"
import { Footer } from "@/components/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">

      {/* Navbar Placeholder */}
      <nav className="absolute top-0 inset-x-0 z-50 p-6 flex justify-between items-center container mx-auto">
        <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">A</div>
          ARAY
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">Log in</Link>
          <Link href="/register" className="text-sm bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-zinc-200 transition-colors">Start Free</Link>
        </div>
      </nav>

      {/* Hero Section with Spotlight */}
      <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Pure Intelligence. <br />
            Seamless Commerce.
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            The autonomous platform for digital creators. ARAY handles content analysis, pricing, and sales—so you can focus on creating.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-indigo-600 px-8 font-medium text-neutral-200 transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:w-56 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="mr-2">Get Started</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid (Bento Style) */}
      <div className="py-20 relative bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              Built for the Future of Commerce
            </h2>
            <p className="text-zinc-500 mt-2">Everything you need to sell digital assets, powered by AI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-zinc-700 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Aray-Scan™ Technology</h3>
                <p className="text-zinc-400">
                  Drag and drop any file. Our AI analyzes it, generates SEO-ready descriptions, detects technical specs, and even suggests the perfect price point based on market data.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant Storefront</h3>
              <p className="text-zinc-400 text-sm">
                Get a beautiful, high-converting profile page in seconds. No coding required.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="relative group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4 text-pink-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Global Payments</h3>
              <p className="text-zinc-400 text-sm">
                Accept payments from anywhere with Stripe. Automated payouts to your bank account.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 hover:border-zinc-700 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Analytics</h3>
                <p className="text-zinc-400">
                  Track views, sales, and conversion rates in real-time. Understand your audience with privacy-focused insights that help you grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
