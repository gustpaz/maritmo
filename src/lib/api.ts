const API_URL = import.meta.env.VITE_API_URL;

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Erro na requisição');
  }

  return response.json();
}

export const api = {
  auth: {
    login: (username: string, password: string) =>
      fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }),
  },

  packages: {
    list: () => fetchApi('/packages'),
    create: (data: any) =>
      fetchApi('/packages', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchApi(`/packages/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchApi(`/packages/${id}`, {
        method: 'DELETE',
      }),
  },

  bookings: {
    list: () => fetchApi('/bookings'),
    create: (data: any) =>
      fetchApi('/bookings', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateStatus: (id: string, status: string) =>
      fetchApi(`/bookings/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      }),
  },

  content: {
    getMedia: () => fetchApi('/content/media'),
    createMedia: (data: any) =>
      fetchApi('/content/media', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    deleteMedia: (id: string) =>
      fetchApi(`/content/media/${id}`, {
        method: 'DELETE',
      }),
    
    getTestimonials: () => fetchApi('/content/testimonials'),
    createTestimonial: (data: any) =>
      fetchApi('/content/testimonials', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateTestimonial: (id: string, data: any) =>
      fetchApi(`/content/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteTestimonial: (id: string) =>
      fetchApi(`/content/testimonials/${id}`, {
        method: 'DELETE',
      }),
  },
};