'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

type Post = {
  id: string
  title: string
  content: string | null
  published_at: string | null
  created_at: string
}

type BlogFormData = {
  title: string
  content: string
  published_at: string
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    published_at: new Date().toISOString().split('T')[0],
  })

  const supabase = createClient()

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      toast.error('Failed to fetch posts')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        const { error } = await supabase
          .from('posts')
          .update({
            title: formData.title,
            content: formData.content,
            published_at: formData.published_at,
          })
          .eq('id', editingId)

        if (error) throw error
        toast.success('Post updated successfully')
      } else {
        const { error } = await supabase.from('posts').insert([
          {
            title: formData.title,
            content: formData.content,
            published_at: formData.published_at,
          },
        ])

        if (error) throw error
        toast.success('Post created successfully')
      }

      resetForm()
      fetchPosts()
    } catch (error) {
      toast.error('Failed to save post')
    }
  }

  const handleEdit = (post: Post) => {
    setFormData({
      title: post.title,
      content: post.content || '',
      published_at: post.published_at?.split('T')[0] || new Date().toISOString().split('T')[0],
    })
    setEditingId(post.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase.from('posts').delete().eq('id', id)

      if (error) throw error
      toast.success('Post deleted successfully')
      fetchPosts()
    } catch (error) {
      toast.error('Failed to delete post')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      published_at: new Date().toISOString().split('T')[0],
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <FiPlus /> New Post
        </Button>
      </div>

      {showForm && (
        <BlogForm
          data={formData}
          setData={setFormData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          isEditing={!!editingId}
        />
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No blog posts yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Published: {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
                </p>
              </div>

              {post.content && (
                <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(post)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <FiEdit2 /> Edit
                </Button>
                <Button
                  onClick={() => handleDelete(post.id)}
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 hover:text-red-700"
                >
                  <FiTrash2 /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BlogForm({
  data,
  setData,
  onSubmit,
  onCancel,
  isEditing,
}: {
  data: BlogFormData
  setData: (data: BlogFormData) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  isEditing: boolean
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Title *
          </label>
          <Input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="e.g., Tips for Perfect Nail Art"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            placeholder="Write your blog post content here..."
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Publish Date
          </label>
          <Input
            type="date"
            value={data.published_at}
            onChange={(e) => setData({ ...data, published_at: e.target.value })}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {isEditing ? 'Update Post' : 'Create Post'}
          </Button>
          <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
