import { create } from 'zustand'

import Role from '@/types/enums/role.enum'

interface UserState {
  id: number,
  email: string,
  fullName: string,
  role: Role,
}

interface AuthState {
  user: UserState | null
  setUser: (user: UserState) => void
  clearUser: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: UserState) => set({ user }),
  clearUser: () => set({ user: null }),
}))

export default useAuthStore
