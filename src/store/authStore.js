import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  isAuthReady: !!localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,

  setAuthReady: (value) => set({ isAuthReady: value }),

  setToken: (token) => {
    localStorage.setItem('token', token);

    set({
      token,
      isAuthReady: true,
      isAuthenticated: true,
    });
  },

  clearToken: () => {
    localStorage.removeItem('token');

    set({
      token: null,
      isAuthReady: false,
      isAuthenticated: false,
    });
  },

  setLoading: (loading) => set({ loading }),
}));
