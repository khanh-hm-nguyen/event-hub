import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "@/models";

interface UserState {
  user: IUser | null;
  isHydrated: boolean;

  setUser: (user: IUser) => void;
  clearUser: () => void; // Standardized naming
  setHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,

      setUser: (user) => {
        set({ user });
      },

      clearUser: () => {
        set({ user: null });
        useUserStore.persist.clearStorage();
      },

      setHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),

      // Hydration check to prevent SSR mismatch errors
      onRehydrateStorage: () => (state) => {
        console.log("Zustand: Hydration finished");
        state?.setHydrated(true);
      },
    },
  ),
);
