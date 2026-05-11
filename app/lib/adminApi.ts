/**
 * API Client for Admin Backend
 * This client handles all HTTP calls to the Python FastAPI backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  token?: string
}

async function apiRequest(endpoint: string, options: ApiRequestOptions = {}) {
  const { method = 'GET', body, token } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config: RequestInit = {
    method,
    headers,
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || `HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error)
    throw error
  }
}

// ============================================================================
// Blog Posts API
// ============================================================================
export const blogsApi = {
  async getAll(token: string) {
    return apiRequest('/api/admin/blogs', { token })
  },

  async create(data: any, token: string) {
    return apiRequest('/api/admin/blogs', {
      method: 'POST',
      body: data,
      token,
    })
  },

  async update(id: string, data: any, token: string) {
    return apiRequest(`/api/admin/blogs/${id}`, {
      method: 'PUT',
      body: data,
      token,
    })
  },

  async delete(id: string, token: string) {
    return apiRequest(`/api/admin/blogs/${id}`, {
      method: 'DELETE',
      token,
    })
  },
}

// ============================================================================
// Courses API
// ============================================================================
export const coursesApi = {
  async getAll(token: string) {
    return apiRequest('/api/admin/courses', { token })
  },

  async create(data: any, token: string) {
    return apiRequest('/api/admin/courses', {
      method: 'POST',
      body: data,
      token,
    })
  },

  async update(id: string, data: any, token: string) {
    return apiRequest(`/api/admin/courses/${id}`, {
      method: 'PUT',
      body: data,
      token,
    })
  },

  async delete(id: string, token: string) {
    return apiRequest(`/api/admin/courses/${id}`, {
      method: 'DELETE',
      token,
    })
  },
}

// ============================================================================
// Deals API
// ============================================================================
export const dealsApi = {
  async getAll(token: string) {
    return apiRequest('/api/admin/deals', { token })
  },

  async create(data: any, token: string) {
    return apiRequest('/api/admin/deals', {
      method: 'POST',
      body: data,
      token,
    })
  },

  async update(id: string, data: any, token: string) {
    return apiRequest(`/api/admin/deals/${id}`, {
      method: 'PUT',
      body: data,
      token,
    })
  },

  async delete(id: string, token: string) {
    return apiRequest(`/api/admin/deals/${id}`, {
      method: 'DELETE',
      token,
    })
  },
}

// ============================================================================
// Galleries API
// ============================================================================
export const galleriesApi = {
  async getAll(token: string) {
    return apiRequest('/api/admin/galleries', { token })
  },

  async create(data: any, token: string) {
    return apiRequest('/api/admin/galleries', {
      method: 'POST',
      body: data,
      token,
    })
  },

  async update(id: string, data: any, token: string) {
    return apiRequest(`/api/admin/galleries/${id}`, {
      method: 'PUT',
      body: data,
      token,
    })
  },

  async delete(id: string, token: string) {
    return apiRequest(`/api/admin/galleries/${id}`, {
      method: 'DELETE',
      token,
    })
  },
}
