import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car, CarFilters, INITIAL_FILTERS } from "@/types/car";

interface CarState {
  filters: CarFilters;
  favorites: Car[];
  // Залишаємо тільки те, що реально потрібно в глобальному стані
  setFilters: (newFilters: CarFilters) => void;
  resetFilters: () => void;
  toggleFavorite: (car: Car) => void;
}

export const useCarStore = create<CarState>()(
  persist(
    (set) => ({
      filters: INITIAL_FILTERS,
      favorites: [],

      setFilters: (newFilters) => set({ filters: newFilters }),

      resetFilters: () => set({ filters: INITIAL_FILTERS }),

      toggleFavorite: (car) =>
        set((state) => {
          const isFavorite = state.favorites.some((f) => f.id === car.id);
          return {
            favorites: isFavorite
              ? state.favorites.filter((f) => f.id !== car.id)
              : [...state.favorites, car],
          };
        }),
    }),
    {
      name: "car-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
