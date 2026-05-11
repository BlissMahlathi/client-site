'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

type Deal = {
  id: string
  title: string
  description: string | null
  price: number | null
  duration: string | null
  start_date: string | null
  end_date: string | null
  location: string | null
  package_details: string | null
  image_url: string | null
  active: boolean
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Deal>>({
    title: '',
    description: '',
    price: 0,
    duration: '',
    start_date: null,
    end_date: null,
    location: '',
    package_details: '',
    image_url: '',
    active: true,
  })

  const supabase = createClient()

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDeals(data || [])
    } catch (error) {
      toast.error('Failed to fetch deals')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // client-side validation
      if (!formData.title || typeof formData.title !== 'string') {
        toast.error('Title is required')
        return
      }
      if (formData.price != null && isNaN(Number(formData.price))) {
        toast.error('Price must be a valid number')
        return
      }
      if (formData.start_date && formData.end_date) {
        const sd = new Date(formData.start_date)
        const ed = new Date(formData.end_date)
        if (sd > ed) {
          toast.error('Start date must be before end date')
          return
        }
      }
      if (editingId) {
        const { error } = await supabase
          .from('deals')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
        toast.success('Deal updated successfully')
      } else {
        const { error } = await supabase.from('deals').insert([formData])

        if (error) throw error
        toast.success('Deal created successfully')
      }

      resetForm()
      fetchDeals()
    } catch (error) {
      toast.error('Failed to save deal')
    }
  }

  const handleEdit = (deal: Deal) => {
    setFormData(deal)
    setEditingId(deal.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deal?')) return

    try {
      const { error } = await supabase.from('deals').delete().eq('id', id)

      if (error) throw error
      toast.success('Deal deleted successfully')
      fetchDeals()
    } catch (error) {
      toast.error('Failed to delete deal')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      duration: '',
      start_date: null,
      end_date: null,
      location: '',
      package_details: '',
      image_url: '',
      active: true,
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Deals & Events</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <FiPlus /> New Deal
        </Button>
      </div>

      {showForm && (
        <DealForm
          data={formData}
          setData={setFormData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          isEditing={!!editingId}
        />
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading deals...</div>
      ) : deals.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No deals yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{deal.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{deal.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    deal.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {deal.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                {deal.price && (
                  <div>
                    <p className="text-gray-600">Price</p>
                    <p className="font-semibold">R{deal.price}</p>
                  </div>
                )}
                {(deal.start_date || deal.end_date) && (
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-semibold">
                      {deal.start_date && deal.end_date
                        ? `${new Date(deal.start_date).toLocaleDateString()} - ${new Date(
                            deal.end_date
                          ).toLocaleDateString()}`
                        : deal.start_date
                        ? new Date(deal.start_date).toLocaleDateString()
                        : deal.end_date
                        ? new Date(deal.end_date).toLocaleDateString()
                        : ''}
                    </p>
                  </div>
                )}
                {deal.duration && (
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-semibold">{deal.duration}</p>
                  </div>
                )}
                {deal.location && (
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-semibold">{deal.location}</p>
                  </div>
                )}
              </div>

              {deal.package_details && (
                <div className="mb-4 text-sm">
                  <p className="text-gray-600">Package Details</p>
                  <p className="font-semibold">{deal.package_details}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(deal)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <FiEdit2 /> Edit
                </Button>
                <Button
                  onClick={() => handleDelete(deal.id)}
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

function DealForm({
  data,
  setData,
  onSubmit,
  onCancel,
  isEditing,
}: {
  data: Partial<Deal>
  setData: (data: Partial<Deal>) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  isEditing: boolean
}) {
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()
  const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'deal-images'

  const uploadImage = async (file?: File) => {
    if (!file) return null
    try {
      setUploading(true)
      const filePath = `deals/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, { upsert: true })
      if (uploadError) {
        if (uploadError.message.includes('not found')) {
          toast.error(
            `Storage bucket '${bucketName}' not found. Create it in Supabase dashboard (Storage → New bucket).`
          )
        } else {
          toast.error(`Upload failed: ${uploadError.message}`)
        }
        return null
      }

      const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(filePath)
      return urlData?.publicUrl || null
    } catch (err) {
      toast.error('Image upload failed')
      return null
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {isEditing ? 'Edit Deal' : 'Create New Deal'}
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deal Title *
          </label>
          <Input
            type="text"
            value={data.title || ''}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="e.g., Summer Special - Nail Art Package"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={data.description || ''}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Describe the deal or special offer"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (R)
            </label>
            <Input
              type="number"
              value={data.price || ''}
              onChange={(e) => setData({ ...data, price: parseFloat(e.target.value) })}
              placeholder="0.00"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <Input
              type="text"
              value={data.duration || ''}
              onChange={(e) => setData({ ...data, duration: e.target.value })}
              placeholder="e.g., 3 Days, 1 Week"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Input
            type="text"
            value={data.location || ''}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            placeholder="e.g., Johannesburg, South Africa"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Details (What's Included)
          </label>
          <textarea
            value={data.package_details || ''}
            onChange={(e) => setData({ ...data, package_details: e.target.value })}
            placeholder="e.g., 3-day training, materials included, certificate"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Upload an image or paste a URL
          </p>
          <div className="space-y-2">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  type="url"
                  aria-label="Image URL"
                  value={data.image_url || ''}
                  onChange={(e) => setData({ ...data, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const url = await uploadImage(file)
                    if (url) {
                      setData({ ...data, image_url: url })
                      toast.success('Image uploaded successfully')
                    }
                  }}
                  aria-label="Upload image file"
                  disabled={uploading}
                />
                <Button type="button" variant="outline" size="sm" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </Button>
              </label>
            </div>
            {data.image_url && (
              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-2">Preview:</p>
                <div className="w-40 h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
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
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <Input
              type="date"
              value={data.start_date || ''}
              onChange={(e) => setData({ ...data, start_date: e.target.value })}
              aria-label="Start date"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <Input
              type="date"
              value={data.end_date || ''}
              onChange={(e) => setData({ ...data, end_date: e.target.value })}
              aria-label="End date"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            checked={data.active || false}
            onChange={(e) => setData({ ...data, active: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="active" className="text-sm font-medium text-gray-700">
            Active
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {isEditing ? 'Update Deal' : 'Create Deal'}
          </Button>
          <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
