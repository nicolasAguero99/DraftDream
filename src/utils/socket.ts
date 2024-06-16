import { io, type Socket } from 'socket.io-client'
import { toast } from 'react-toastify'

// Constants
import { BACKEND_URL } from '@/constants/constants'

// Types
import { type ShapeData, type CryptoUuid } from '@/types/types'

const socket: Socket = io(BACKEND_URL)
// socket.on('connect', () => {
//   console.log('socket.connected ID: ', socket.id)
// })

export const SocketEmitJoinRoom = (idRoom: typeof CryptoUuid): void => {
  if (idRoom == null) return
  socket.emit('join_room', idRoom)
}

export const SocketOnUpdateShapeList = (setShapeList: (shapeList: ShapeData[]) => void): () => void => {
  socket.on('updateShapeList', ({ data }: { data: ShapeData[] }) => {
    setShapeList(data)
  })

  return () => {
    socket.off('updateShapeList')
  }
}

export const SocketOnUpdateHistoryShapeList = (setShapeListHistory: (shapeList: ShapeData[]) => void): () => void => {
  socket.on('updateHistoryShapeList', ({ data }: { data: ShapeData[] }) => {
    setShapeListHistory(data)
  })

  return () => {
    socket.off('updateHistoryShapeList')
  }
}

export const SocketOnUserConnected = (idRoom: typeof CryptoUuid): () => void => {
  socket.on('userConnected', (message: string) => {
    if (idRoom == null) return
    toast.success(message)
  })

  return () => {
    socket.off('userConnected')
  }
}

export const SocketOnUserDisconnected = (idRoom: typeof CryptoUuid): () => void => {
  socket.on('userDisconnected', (message: string) => {
    if (idRoom == null) return
    toast.error(message)
  })

  return () => {
    socket.off('userDisconnected')
  }
}

export const SocketEmitUpdateShapeList = (updatedShapeList: ShapeData[], idRoom: typeof CryptoUuid): void => {
  socket.emit('updateShapeList', { data: updatedShapeList, idRoom })
}

export const SocketEmitUpdateHistoryShapeList = (updatedHistoryShapeList: ShapeData[], idRoom: typeof CryptoUuid): void => {
  socket.emit('updateHistoryShapeList', { data: updatedHistoryShapeList, idRoom })
}
