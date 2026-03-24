// UI-only Zustand store.
// Keeps transient interface state separate from booking business state.
// This prevents unnecessary calendar rerenders when side panel or filters change.

import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidePanelOpen: false,
  
  searchTerm: '',
  
  isFilterOpen: false,
  activeFilters: {
    gender: null,
    resources: [],
    statuses: [],
    selectedTherapists: [],
    requestedOnly: false,
    searchTherapist: '',
    selectAllTherapists: false,
  },

  selectedDate: new Date(),

  openSidePanel: () => set({ sidePanelOpen: true }),
  closeSidePanel: () => set({ sidePanelOpen: false }),

  setSearchTerm: (term) => set({ searchTerm: term }),

  toggleFilter: () =>
    set((state) => ({
        isFilterOpen: !state.isFilterOpen,
    })),

  setActiveFilters: (filters) =>
    set((state) => ({
      activeFilters: {
        ...state.activeFilters,
        ...filters,
      },
    })),
  
  setSelectedDate: (date) => set({ selectedDate: date }),
}));