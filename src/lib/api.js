const BASE = import.meta.env.VITE_API_URL || 'https://server-pied-kappa.vercel.app'

function getToken() {
  return localStorage.getItem('vfs_token')
}

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Lỗi máy chủ')
  return data
}

export const api = {
  // Auth
  login:          (email, password) => request('POST', '/api/auth/login', { email, password }),
  changePassword: (oldPassword, newPassword) => request('POST', '/api/auth/change-password', { oldPassword, newPassword }),

  // Courses
  getCourses:    () => request('GET', '/api/courses'),
  addChapter:    (data) => request('POST', '/api/courses/chapters', data),
  updateChapter: (cid, data) => request('PUT', `/api/courses/chapters/${cid}`, data),
  deleteChapter: (cid) => request('DELETE', `/api/courses/chapters/${cid}`),
  addLesson:     (cid, data) => request('POST', `/api/courses/chapters/${cid}/lessons`, data),
  updateLesson:  (cid, lid, data) => request('PUT', `/api/courses/chapters/${cid}/lessons/${lid}`, data),
  deleteLesson:  (cid, lid) => request('DELETE', `/api/courses/chapters/${cid}/lessons/${lid}`),

  // Users (phân trang)
  getUsers: ({ page = 1, limit = 10, search = '', status = '' } = {}) => {
    const params = new URLSearchParams({ page, limit })
    if (search) params.set('search', search)
    if (status) params.set('status', status)
    return request('GET', `/api/users?${params}`)
  },
  addUser:     (data) => request('POST', '/api/users', data),
  updateUser:  (id, data) => request('PUT', `/api/users/${id}`, data),
  deleteUser:  (id) => request('DELETE', `/api/users/${id}`),

  // Token helpers
  saveToken: (token) => localStorage.setItem('vfs_token', token),
  clearToken: () => localStorage.removeItem('vfs_token'),
  isLoggedIn: () => !!getToken(),
}
