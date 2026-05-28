const BASE = import.meta.env.VITE_API_URL || 'https://server-pied-kappa.vercel.app'

function getToken() {
  return localStorage.getItem('vfs_token')
}

// Kiểm tra token có hết hạn chưa (dựa vào exp trong payload)
function isTokenExpired(token) {
  try {
    const base64  = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')))
    return payload.exp * 1000 < Date.now()
  } catch { return true }
}

function clearSession() {
  localStorage.removeItem('vfs_token')
  localStorage.removeItem('vfs_must_change')
}

async function request(method, path, body) {
  const token = getToken()

  // Nếu token hết hạn → xoá và redirect login
  if (token && isTokenExpired(token)) {
    clearSession()
    window.location.href = '/login'
    throw new Error('Phiên đăng nhập đã hết hạn')
  }

  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  // Server trả 401 + đang có token → token không hợp lệ → logout
  // Không áp dụng cho login (chưa có token)
  if (res.status === 401 && token) {
    clearSession()
    window.location.href = '/login'
    throw new Error('Phiên đăng nhập đã hết hạn')
  }

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Lỗi máy chủ')
  return data
}

export const api = {
  // Auth
  login:          (email, password) => request('POST', '/api/auth/login', { email, password }),
  changePassword: (newPassword, oldPassword) => request('POST', '/api/auth/change-password', { newPassword, oldPassword }),
  forgotPassword: (email)                    => request('POST', '/api/auth/forgot-password', { email }),
  resetPassword:  (token, newPassword)       => request('POST', '/api/auth/reset-password', { token, newPassword }),

  // Courses
  getCourses:       () => request('GET', '/api/courses'),
  getVideoMeta:     (url) => request('GET', `/api/courses/video-metadata?url=${encodeURIComponent(url)}`),
  getProgress:    ()         => request('GET',  '/api/courses/progress'),
  markLessonDone: (lessonId) => request('POST', `/api/courses/progress/${lessonId}`),
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
  saveToken: (token, mustChangePassword = false) => {
    localStorage.setItem('vfs_token', token)
    localStorage.setItem('vfs_must_change', mustChangePassword ? '1' : '0')
  },
  mustChangePassword: () => localStorage.getItem('vfs_must_change') === '1',
  clearMustChange: () => localStorage.removeItem('vfs_must_change'),
  clearToken: () => clearSession(),
  isLoggedIn: () => {
    const token = getToken()
    if (!token) return false
    if (isTokenExpired(token)) { clearSession(); return false }
    return true
  },
}
