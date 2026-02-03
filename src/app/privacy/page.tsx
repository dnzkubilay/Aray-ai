export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-white tracking-tight">Privacy Policy</h1>
                <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-4 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, such as your name, email address, and payment information when you register or make a purchase.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">2. How We Use Your Information</h2>
                        <p>We use your information to provide, maintain, and improve our services, process transactions, and communicate with you about your account.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">3. Data Sharing</h2>
                        <p>We do not sell your personal data. We verify and share necessary data with third-party service providers (like Stripe for payments and Supabase for hosting) solely for the purpose of operating the Platform.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">4. AI Processing</h2>
                        <p>Files uploaded to ARAY-Scan™ may be processed by third-party AI providers (e.g., OpenAI, Google Gemini) to generate metadata. These files are not used to train public models.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">5. Contact Us</h2>
                        <p>If you have questions about this policy, please contact us at support@aray.ai.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
