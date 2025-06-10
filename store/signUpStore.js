import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,

      addUser: (userData) => set((state) => ({ 
        users: [...state.users, userData] 
      })),

      setCurrentUser: (user) => set({ currentUser: user }),

      updateUser: (updatedUser) =>
        set((state) => ({
          currentUser: updatedUser,
          users: state.users.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          ),
        })),

      logout: () => {
        set({ currentUser: null });
        localStorage.removeItem('user-storage');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
      },
    }),
    {
      name: 'user-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              currentUser: state.currentUser ? JSON.parse(state.currentUser) : null,
            },
          };
        },
        setItem: (name, value) => {
          localStorage.setItem(
            name,
            JSON.stringify({
              ...value,
              state: {
                ...value.state,
                currentUser: JSON.stringify(value.state.currentUser),
              },
            })
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);