// store/internshipStore.ts
import { create } from 'zustand';

export const useInternshipStore = create((set) => ({
  internships: [],
  currentDraft: {},
  addInternship: (internship) =>
    set((state) => ({
      internships: [...state.internships, internship],
      currentDraft: {},
    })),
  updateDraft: (data) =>
    set((state) => ({
      currentDraft: { ...state.currentDraft, ...data },
    })),
  clearDraft: () => set({ currentDraft: {} }),
}));
