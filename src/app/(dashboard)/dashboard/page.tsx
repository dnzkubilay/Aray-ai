import { createClient } from "@/lib/supabase/server"
import { RevenueChart } from "@/components/dashboard/RevenueChart"

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Fetch quick stats
    const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('creator_id', user.id)

    const { data: recentSales } = await supabase
        .from('orders')
        .select('amount_total, created_at, status')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

    // Calculate total revenue (simple sum)
    const totalRevenue = recentSales?.reduce((acc, order) => acc + (order.status === 'completed' ? order.amount_total : 0), 0) || 0

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Overview</h2>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Revenue"
                    value={`$${(totalRevenue / 100).toFixed(2)}`}
                    description="+20.1% from last month"
                />
                <StatsCard
                    title="Products"
                    value={productsCount || 0}
                    description="Active products"
                />
                <StatsCard
                    title="Sales"
                    value={recentSales?.length || 0}
                    description="+180.1% from last month"
                />
                <StatsCard
                    title="Active Now"
                    value="+573"
                    description="+201 since last hour"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">Revenue Overview</h3>
                    <div className="h-[350px] w-full text-muted-foreground bg-[#0a0a0a] rounded-lg border border-zinc-900 pt-4">
                        <RevenueChart />
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">Recent Sales</h3>
                    <div className="space-y-4">
                        {recentSales?.map((sale, i) => (
                            <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">New Sale</p>
                                    <p className="text-xs text-muted-foreground">{new Date(sale.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="font-medium">+${(sale.amount_total / 100).toFixed(2)}</div>
                            </div>
                        ))}
                        {(!recentSales || recentSales.length === 0) && (
                            <p className="text-sm text-muted-foreground">No recent sales.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatsCard({ title, value, description }: { title: string, value: string | number, description: string }) {
    return (
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">{title}</h3>
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </div>
    )
}
