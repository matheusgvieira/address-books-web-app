import { create } from "zustand";

interface AddressData {
  username: string;
  displayName: string;
  postalCode: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}

interface AddressStore {
  users: AddressData[];
  addUser: (user: AddressData) => void;
  updateUser: (username: string, updated: AddressData) => void;
  getUserByUsername: (username: string) => AddressData | undefined;
  removeUser: (username: string) => void;
  clearUsers: () => void;
}

export const useAddressStore = create<AddressStore>((set, get) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (username, updated) =>
    set((state) => ({
      users: state.users.map((u) => (u.username === username ? updated : u)),
    })),
  getUserByUsername: (username) =>
    get().users.find((u) => u.username === username),
  removeUser: (username) =>
    set((state) => ({
      users: state.users.filter((u) => u.username !== username),
    })),
  clearUsers: () => set({ users: [] }),
}));
