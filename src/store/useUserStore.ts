import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserStore {
  currentUser: User | null; // The currently logged-in user
  isLoggedIn: boolean; // Whether a user is logged in
  setUser: (user: User) => void; // Set the logged-in user
  clearUser: () => void; // Clear the user (logout)
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null, // Initial state: no user logged in
  isLoggedIn: false, // User is not logged in initially

  // Set the user
  setUser: (user: User) =>
    set(() => ({
      currentUser: user,
      isLoggedIn: true,
    })),

  // Clear the user (e.g., logout)
  clearUser: () =>
    set(() => ({
      currentUser: null,
      isLoggedIn: false,
    })),
}));
