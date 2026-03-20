const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

//   Token helpers 

export const getToken = (): string | null => localStorage.getItem('admin_token');

export const setToken = (token: string, name: string) => {
  localStorage.setItem('admin_token', token);
  localStorage.setItem('admin_name', name);
};

export const clearToken = () => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_name');
};

//  Core fetch wrapper 

interface RequestOptions {
  method?:  'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?:    unknown;
  auth?:    boolean;   // attach JWT header
  isForm?:  boolean;   // multipart/form-data (file uploads)
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors?: Record<string, string[]>,
  ) {
    super(message);
  }
}

async function request<T>(endpoint: string, opts: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = false, isForm = false } = opts;

  const headers: Record<string, string> = {
    'Accept': 'application/json',   // ← always set — tells Laravel to return JSON, never redirect
  };

  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  if (!isForm && body) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE_URL}/api${endpoint}`, {
    method,
    headers,
    body: isForm ? (body as FormData) : body ? JSON.stringify(body) : undefined,
  });

  // 204 No Content
  if (res.status === 204) return undefined as T;

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      res.status,
      data.message ?? 'Something went wrong.',
      data.errors,
    );
  }

  return data as T;
}

//   Public API   ─

export const publicApi = {

  submitQuote: (payload: unknown) =>
    request('/quotes', { method: 'POST', body: payload }),

  getTours: (params?: { destination?: string; type?: string }) => {
    const qs = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return request(`/tours${qs}`);
  },

  getTour: (slug: string) =>
    request(`/tours/${slug}`),

  getBlogPosts: (params?: { category?: string }) => {
    const qs = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return request(`/blog${qs}`);
  },

  getBlogPost: (slug: string) =>
    request(`/blog/${slug}`),

  getSettings: () =>
    request('/settings'),
};

//   Admin Auth API    

export const authApi = {

  login: (email: string, password: string) =>
    request<{ access_token: string; admin: { name: string; email: string; id: number } }>(
      '/admin/login', { method: 'POST', body: { email, password } }
    ),

  logout: () =>
    request('/admin/logout', { method: 'POST', auth: true }),

  refresh: () =>
    request<{ access_token: string }>('/admin/refresh', { method: 'POST', auth: true }),

  me: () =>
    request<{ id: number; name: string; email: string }>('/admin/me', { auth: true }),

  updateMe: (data: unknown) =>
    request('/admin/me', { method: 'PUT', body: data, auth: true }),
};

//   Admin API    

export const adminApi = {

  // Dashboard
  getStats: () =>
    request('/admin/dashboard/stats', { auth: true }),

  // Quotes
  getQuotes: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/admin/quotes${qs}`, { auth: true });
  },
  getQuote: (id: string) =>
    request(`/admin/quotes/${id}`, { auth: true }),
  updateQuote: (id: string, data: unknown) =>
    request(`/admin/quotes/${id}`, { method: 'PATCH', body: data, auth: true }),
  deleteQuote: (id: string) =>
    request(`/admin/quotes/${id}`, { method: 'DELETE', auth: true }),

  // Tours
  getTours: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/admin/tours${qs}`, { auth: true });
  },
  getTour: (id: string) =>
    request(`/admin/tours/${id}`, { auth: true }),
  createTour: (data: unknown) =>
    request('/admin/tours', { method: 'POST', body: data, auth: true }),
  updateTour: (id: string, data: unknown) =>
    request(`/admin/tours/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteTour: (id: string) =>
    request(`/admin/tours/${id}`, { method: 'DELETE', auth: true }),
  toggleTourPublish: (id: string) =>
    request(`/admin/tours/${id}/publish`, { method: 'PATCH', auth: true }),
  uploadTourImage: (id: string, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    return request(`/admin/tours/${id}/images`, { method: 'POST', body: fd, auth: true, isForm: true });
  },

  // Blog
  getBlogPosts: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/admin/blog${qs}`, { auth: true });
  },
  getBlogPost: (id: string) =>
    request(`/admin/blog/${id}`, { auth: true }),
  createBlogPost: (data: unknown) =>
    request('/admin/blog', { method: 'POST', body: data, auth: true }),
  updateBlogPost: (id: string, data: unknown) =>
    request(`/admin/blog/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteBlogPost: (id: string) =>
    request(`/admin/blog/${id}`, { method: 'DELETE', auth: true }),
  toggleBlogPublish: (id: string) =>
    request(`/admin/blog/${id}/publish`, { method: 'PATCH', auth: true }),
  uploadBlogCover: (id: string, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    return request(`/admin/blog/${id}/cover`, { method: 'POST', body: fd, auth: true, isForm: true });
  },

  // Settings
  getSettings: () =>
    request('/admin/settings', { auth: true }),
  updateSettings: (section: string, data: unknown) =>
    request('/admin/settings', { method: 'PATCH', body: { section, data }, auth: true }),

  // Bookings
  getBookings: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/admin/bookings${qs}`, { auth: true });
  },
  getBooking: (id: string) =>
    request(`/admin/booking/${id}`, { auth: true }),
  createBooking: (data: unknown) =>
    request('/admin/bookings', { method: 'POST', body: data, auth: true }),
  updateBooking: (id: string, data: unknown) =>
    request(`/admin/bookings/${id}`, { method: 'PATCH', body: data, auth: true }),
  deleteBooking: (id: string) =>
    request(`/admin/bookings/${id}`, { method: 'DELETE', auth: true }),

  // Testimonials
  getTestimonials: () =>
    request('/admin/testimonials', { auth: true }),
  createTestimonial: (data: unknown) =>
    request('/admin/testimonials', { method: 'POST', body: data, auth: true }),
  updateTestimonial: (id: number, data: unknown) =>
    request(`/admin/testimonials/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteTestimonial: (id: number) =>
    request(`/admin/testimonials/${id}`, { method: 'DELETE', auth: true }),
  uploadTestimonialAvatar: (id: number, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    return request(`/admin/testimonials/${id}/avatar`, { method: 'POST', body: fd, auth: true, isForm: true });
  },
};