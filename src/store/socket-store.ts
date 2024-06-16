import { createWithEqualityFn } from 'zustand/traditional'

// Types
import { type SocketStore } from '../types/types'

export const useSocket = createWithEqualityFn<SocketStore>((set) => ({
  idRoom: null,
  setIdRoom: (idRoom) => { set(() => ({ idRoom })) }
}))
