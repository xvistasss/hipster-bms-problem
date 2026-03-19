// UI-only Zustand store.
// Keeps transient interface state separate from booking business state.
// This prevents unnecessary calendar rerenders when side panel or filters change.

import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidePanelOpen: false,
  selectedDate: new Date(),
  searchTerm: '',
  filters: {
    therapist: null,
    status: null,
  },

  openSidePanel: () => set({ sidePanelOpen: true }),
  closeSidePanel: () => set({ sidePanelOpen: false }),

  setSelectedDate: (date) => set({ selectedDate: date }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  setFilters: (filters) => set({ filters }),
}));