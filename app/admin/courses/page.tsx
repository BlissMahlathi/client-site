'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

type Course = {
  id: string
  name: string
  price: string
  duration: string
  tags: string[]
  description: string | null
  highlights: string[] | null
  deposit: string | null
  image_url: string | null
  active: boolean
  created_at: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    tags: [] as string[],
    description: '',
    highlights: [] as string[],
    deposit: '',
    image_url: '',
    active: true,
  })

  const supabase = createClient()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCourses(data || [])
    } catch (error) {
      toast.error('Failed to fetch courses')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        const { error } = await supabase
          .from('courses')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
        toast.success('Course updated successfully')
      } else {
        const { error } = await supabase.from('courses').insert([formData])

        if (error) throw error
        toast.success('Course created successfully')
      }

      resetForm()
      fetchCourses()
    } catch (error) {
      toast.error('Failed to save course')
    }
  }

  const handleEdit = (course: Course) => {
    setFormData({
      name: course.name,
      price: course.price,
      duration: course.duration,
      tags: course.tags || [],
      description: course.description || '',
      highlights: course.highlights || [],
      deposit: course.deposit || '',
      image_url: course.image_url || '',
      active: course.active,
    })
    setEditingId(course.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return

    try {
      const { error } = await supabase.from('courses').delete().eq('id', id)

      if (error) throw error
      toast.success('Course deleted successfully')
      fetchCourses()
    } catch (error) {
      toast.error('Failed to delete course')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      duration: '',
      tags: [],
      description: '',
      highlights: [],
      deposit: '',
      image_url: '',
      active: true,
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <FiPlus /> New Course
        </Button>
      </div>

      {showForm && (
        <CourseForm
          data={formData}
          setData={setFormData}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          isEditing={!!editingId}
        />
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading courses...</div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No courses yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                  {course.description && (
                    <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {course.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-600">Price</p>
                  <p className="font-semibold">{course.price}</p>
                </div>
                <div>
                  <p className="text-gray-600">Duration</p>
                  <p className="font-semibold">{course.duration}</p>
                </div>
                {course.deposit && (
                  <div>
                    <p className="text-gray-600">Deposit</p>
                    <p className="font-semibold">{course.deposit}</p>
                  </div>
                )}
                {course.tags.length > 0 && (
                  <div>
                    <p className="text-gray-600">Tags</p>
                    <p className="font-semibold text-xs">{course.tags.join(', ')}</p>
                  </div>
                )}
              </div>

              {course.highlights && course.highlights.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-medium mb-2">Highlights:</p>
                  <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                    {course.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(course)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <FiEdit2 /> Edit
                </Button>
                <Button
                  onClick={() => handleDelete(course.id)}
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

function CourseForm({
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
  const handleAddTag = () => {
    setData({ ...data, tags: [...data.tags, ''] })
  }

  const handleUpdateTag = (index: number, value: string) => {
    const newTags = [...data.tags]
    newTags[index] = value
    setData({ ...data, tags: newTags })
  }

  const handleRemoveTag = (index: number) => {
    const newTags = data.tags.filter((_: string, i: number) => i !== index)
    setData({ ...data, tags: newTags })
  }

  const handleAddHighlight = () => {
    setData({ ...data, highlights: [...data.highlights, ''] })
  }

  const handleUpdateHighlight = (index: number, value: string) => {
    const newHighlights = [...data.highlights]
    newHighlights[index] = value
    setData({ ...data, highlights: newHighlights })
  }

  const handleRemoveHighlight = (index: number) => {
    const newHighlights = data.highlights.filter((_: string, i: number) => i !== index)
    setData({ ...data, highlights: newHighlights })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {isEditing ? 'Edit Course' : 'Create New Course'}
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name *
            </label>
            <Input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="e.g., Nails & Cluster Lashes"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price *
            </label>
            <Input
              type="text"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
              placeholder="e.g., R1 200"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration *
            </label>
            <Input
              type="text"
              value={data.duration}
              onChange={(e) => setData({ ...data, duration: e.target.value })}
              placeholder="e.g., 3 Days"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deposit
            </label>
            <Input
              type="text"
              value={data.deposit}
              onChange={(e) => setData({ ...data, deposit: e.target.value })}
              placeholder="e.g., 50% deposit required"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Describe the course"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <Button type="button" onClick={handleAddTag} variant="outline" size="sm">
              Add Tag
            </Button>
          </div>
          <div className="space-y-2">
            {data.tags.map((tag: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  value={tag}
                  onChange={(e) => handleUpdateTag(index, e.target.value)}
                  placeholder="e.g., Nails"
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Course Highlights</label>
            <Button type="button" onClick={handleAddHighlight} variant="outline" size="sm">
              Add Highlight
            </Button>
          </div>
          <div className="space-y-2">
            {data.highlights.map((highlight: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleUpdateHighlight(index, e.target.value)}
                  placeholder="e.g., Gel & acrylic nail basics"
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveHighlight(index)}
                  variant="outline"
                  size="sm"
                  className="text-red-600"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <Input
            type="url"
            value={data.image_url}
            onChange={(e) => setData({ ...data, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            checked={data.active}
            onChange={(e) => setData({ ...data, active: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="active" className="text-sm font-medium text-gray-700">
            Active
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {isEditing ? 'Update Course' : 'Create Course'}
          </Button>
          <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
