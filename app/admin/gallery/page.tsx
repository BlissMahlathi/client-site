'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import Image from 'next/image'

type GalleryItem = {
  id: string
  title: string
  image_url: string
  caption: string | null
  display_order: number
  created_at: string
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    caption: '',
    display_order: 0,
  })

  const supabase = createClient()

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      toast.error('Failed to fetch gallery items')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        const { error } = await supabase
          .from('galleries')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
        toast.success('Gallery item updated successfully')
      } else {
        const { error } = await supabase.from('galleries').insert([formData])

        if (error) throw error
        toast.success('Gallery item added successfully')
      }

      resetForm()
      fetchGallery()
    } catch (error) {
      toast.error('Failed to save gallery item')
    }
  }

  const handleEdit = (item: GalleryItem) => {
    setFormData({
      title: item.title,
      image_url: item.image_url,
      caption: item.caption || '',
      display_order: item.display_order,
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const { error } = await supabase.from('galleries').delete().eq('id', id)

      if (error) throw error
      toast.success('Image deleted successfully')
      fetchGallery()
    } catch (error) {
      toast.error('Failed to delete image')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      image_url: '',
      caption: '',
      display_order: 0,
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <FiPlus /> Add Image
        </Button>
      </div>

      {showForm && (
        <GalleryForm
          data={formData}
          setData={setFormData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          isEditing={!!editingId}
        />
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading gallery...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No gallery items yet. Add images to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="aspect-square relative bg-gray-100">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                {item.caption && (
                  <p className="text-sm text-gray-600 mb-3">{item.caption}</p>
                )}
                <p className="text-xs text-gray-500 mb-3">Order: {item.display_order}</p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(item)}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                  >
                    <FiEdit2 /> Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    variant="outline"
                    size="sm"
                    className="gap-2 text-red-600 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function GalleryForm({
  data,
  setData,
  onSubmit,
  onCancel,
  isEditing,
}: {
  data: any
  setData: (data: any) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  isEditing: boolean
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {isEditing ? 'Edit Image' : 'Add New Image'}
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Title *
          </label>
          <Input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="e.g., Stiletto Art Design"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL *
          </label>
          <Input
            type="url"
            value={data.image_url}
            onChange={(e) => setData({ ...data, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {data.image_url && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden max-w-xs">
              <img
                src={data.image_url}
                alt="preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caption
          </label>
          <Input
            type="text"
            value={data.caption}
            onChange={(e) => setData({ ...data, caption: e.target.value })}
            placeholder="e.g., Floral 3D nails"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Order
          </label>
          <Input
            type="number"
            value={data.display_order}
            onChange={(e) => setData({ ...data, display_order: parseInt(e.target.value) })}
            placeholder="0"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {isEditing ? 'Update Image' : 'Add Image'}
          </Button>
          <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
