"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Globe, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-indigo-500/30">

      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight">ARAY AI</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-white/70">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-white/70 hover:text-white flex items-center h-9 px-4">
              Log in
            </Link>
            <Link
              href="/auth/register"
              className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-indigo-600 px-6 font-medium text-white transition-all hover:bg-indigo-700"
            >
              <span className="relative flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 pb-16">

        {/* Hero Section */}
        <section className="relative container mx-auto px-6 flex flex-col items-center text-center">

          {/* Background Glow */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-indigo-300 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Powering the next generation of commerce</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-6"
          >
            Universal Autonomous <br /> Commerce Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg text-white/60 mb-10 leading-relaxed"
          >
            Sell digital products globally without friction. ARAY AI handles payments, taxes, files, and licensing automatically. Pure intelligence, seamless commerce.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Link
              href="/dashboard"
              className="h-12 px-8 rounded-full bg-white text-black font-semibold flex items-center justify-center hover:bg-zinc-200 transition-colors"
            >
              Start Selling for Free
            </Link>
            <Link
              href="/contact"
              className="h-12 px-8 rounded-full border border-white/20 bg-white/5 text-white font-semibold flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-md"
            >
              Talk to Sales
            </Link>
          </motion.div>

          {/* Hero Image / Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 w-full max-w-5xl rounded-xl border border-white/10 bg-black/50 shadow-2xl overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Simple Dashboard Mockup */}
            <div className="aspect-[16/9] relative bg-zinc-900/50 p-4 flex flex-col gap-4">
              {/* Mock Header */}
              <div className="h-12 w-full border-b border-white/5 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="h-6 w-32 bg-white/5 rounded-md" />
              </div>
              {/* Mock Content */}
              <div className="flex-1 flex gap-4">
                <div className="w-48 bg-white/5 rounded-lg border border-white/5 h-full" />
                <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="rounded-lg bg-white/5 border border-white/5 p-4 flex flex-col gap-2">
                      <div className="h-32 w-full bg-white/5 rounded" />
                      <div className="h-4 w-2/3 bg-white/10 rounded" />
                      <div className="h-3 w-1/3 bg-white/5 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section id="features" className="container mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Globe className="w-6 h-6 text-indigo-400" />}
              title="Global Payments"
              description="Accept payments in 135+ currencies with automated tax compliance worldwide."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-indigo-400" />}
              title="Merchant of Record"
              description="We handle the liabilities, chargebacks, and tax filing so you can focus on building."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-indigo-400" />}
              title="Instant Payouts"
              description="Get paid faster with automated payouts directly to your bank account."
            />
          </div>
        </section>

      </main>

      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-white/40 text-sm">© 2026 ARAY AI Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="#" className="text-white/40 hover:text-white transition-colors text-sm">Privacy</Link>
            <Link href="#" className="text-white/40 hover:text-white transition-colors text-sm">Terms</Link>
            <Link href="#" className="text-white/40 hover:text-white transition-colors text-sm">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
    >
      <div className="mb-4 h-12 w-12 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/60 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
