'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { FiLogOut, FiHome, FiImage, FiBook, FiGift, FiBarChart3 } from 'react-icons/fi'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
      } else {
        setUser(user)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-2">{user.email}</p>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink href="/admin" icon={<FiHome />}>
            Dashboard
          </NavLink>
          <NavLink href="/admin/deals" icon={<FiGift />}>
            Deals & Events
          </NavLink>
          <NavLink href="/admin/blogs" icon={<FiBook />}>
            Blog Posts
          </NavLink>
          <NavLink href="/admin/gallery" icon={<FiImage />}>
            Gallery
          </NavLink>
          <NavLink href="/admin/courses" icon={<FiBarChart3 />}>
            Courses
          </NavLink>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t w-64">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <FiLogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
    >
      <span className="text-lg">{icon}</span>
      <span>{children}</span>
    </Link>
  )
}
