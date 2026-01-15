import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  user: User | null;
  isHydrated: boolean; 
  
  setUser: (user: User) => void;
  logout: () => void;
  setHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false, // Default to false

      setUser: (user) => {
        console.log("Zustand: Setting user", user); // Debug log
        set({ user });
      },

      logout: () => {
        set({ user: null });
        localStorage.removeItem("user-storage"); // Force clear
      },

      setHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: "user-storage", // The key in LocalStorage
      storage: createJSONStorage(() => localStorage), // Explicitly use LocalStorage
      
      // This function runs when Zustand finishes loading data
      onRehydrateStorage: () => (state) => {
        console.log("Zustand: Hydration finished");
        state?.setHydrated(true);
      },
    }
  )
);