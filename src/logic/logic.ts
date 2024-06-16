import { shallow } from 'zustand/shallow'

// Types
import { type CryptoUuid, type ShapesFunctions, type ShapeData } from '../types/types'

// Store
import { useHistoryShapesList, useShape, useShapesList } from '../store/shape-store'
import { useSocket } from '@/store/socket-store'

// Utils
import { SocketEmitUpdateHistoryShapeList, SocketEmitUpdateShapeList } from '@/utils/socket'

export const shapesFunctions = (): ShapesFunctions => {
  const { shapeList } = useShapesList((state) => ({ shapeList: state.shapeList }), shallow)
  const { shapeListHistory } = useHistoryShapesList((state) => ({ shapeListHistory: state.shapeListHistory }), shallow)
  const { idRoom } = useSocket((state) => ({ idRoom: state.idRoom }))
  const { setNodeSelected } = useShape()
  const { setShapeListHistory } = useHistoryShapesList()
  const { setShapeList } = useShapesList()

  const createShape = (shapeData: any): void => {
    if (shapeList == null || setShapeList == null) return
    setNodeSelected([null, null])
    // setShapeList([...shapeList, shapeData as ShapeData])
    const updatedShapeList = [...shapeList, shapeData as ShapeData]
    SocketEmitUpdateShapeList(updatedShapeList, idRoom)
    console.log('shapeList', shapeList)
  }

  const deleteShape = (id: typeof CryptoUuid): void => {
    console.log('id', id)

    console.log('shapeList', shapeList)
    console.log('shapeListHistory', shapeListHistory)
    if (shapeList == null || setShapeList == null || setShapeListHistory == null || shapeListHistory == null) return

    let shapeDeleted: ShapeData | null = null
    const updatedShapes = shapeList.filter((n) => {
      if (n.id === id) {
        console.log('n.id', n.id)

        shapeDeleted = n
        return false
      }
      return true
    })
    // setShapeList(updatedShapes)
    SocketEmitUpdateShapeList(updatedShapes, idRoom)
    console.log('updatedShapes', updatedShapes)
    const updatedHistoryShapeList = [...shapeListHistory, shapeDeleted] as ShapeData[]

    console.log('shapeDeleted', shapeDeleted)

    SocketEmitUpdateHistoryShapeList(updatedHistoryShapeList, idRoom)
    console.log('updatedHistoryShapeList', updatedHistoryShapeList)
  }

  const recoverShape = (): void => {
    console.log('recoverShape')
    const newShapeListHistory = [...shapeListHistory]
    const lastShape = newShapeListHistory.pop()

    console.log('newShapeListHistory', newShapeListHistory)

    if (lastShape == null) return
    // setShapeList([...shapeList, lastShape])
    const updatedShapeList = [...shapeList, lastShape]
    SocketEmitUpdateShapeList(updatedShapeList, idRoom)
    console.log('newShapeListHistory', newShapeListHistory)
    // setShapeListHistory(newShapeListHistory)
    SocketEmitUpdateHistoryShapeList(newShapeListHistory, idRoom)
    console.log('newShapeListHistory', newShapeListHistory)
  }

  return { createShape, deleteShape, recoverShape }
}
