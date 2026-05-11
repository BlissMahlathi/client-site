export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Deals & Events"
          description="Manage deals, packages, and special offers"
          href="/admin/deals"
          color="from-purple-500 to-pink-500"
        />
        <DashboardCard
          title="Blog Posts"
          description="Create and manage blog content"
          href="/admin/blogs"
          color="from-blue-500 to-cyan-500"
        />
        <DashboardCard
          title="Gallery"
          description="Manage portfolio images"
          href="/admin/gallery"
          color="from-green-500 to-emerald-500"
        />
        <DashboardCard
          title="Courses"
          description="Manage training courses"
          href="/admin/courses"
          color="from-orange-500 to-red-500"
        />
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  description,
  href,
  color,
}: {
  title: string
  description: string
  href: string
  color: string
}) {
  return (
    <a
      href={href}
      className={`p-6 rounded-lg text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br ${color}`}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm opacity-90">{description}</p>
    </a>
  )
}
