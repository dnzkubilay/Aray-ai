export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-white tracking-tight">Terms of Service</h1>
                <p className="text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-4 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
                        <p>By accessing and using ARAY AI ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">2. Use of Service</h2>
                        <p>ARAY AI provides an autonomous commerce platform for digital creators. You are responsible for all activity that occurs under your account.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">3. Content and Conduct</h2>
                        <p>You retain ownership of all content you upload. However, by uploading content, you grant us a license to host and display it as required for the service. Illegal or harmful content is strictly prohibited.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">4. Payments and Fees</h2>
                        <p>We use Stripe for payment processing. Transaction fees may apply. You are responsible for any taxes associated with your sales.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-2">5. Disclaimer</h2>
                        <p>The service is provided "as is" without warranties of any kind. We utilize AI technology which may occasionally produce unexpected results; verify all AI-generated content before publishing.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
