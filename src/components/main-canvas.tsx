'use client'

import { useEffect, useRef } from 'react'
import { Stage, Layer } from 'react-konva'
import { shallow } from 'zustand/shallow'
import { type KonvaEventObject } from 'konva/lib/Node'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Store
import { useHistoryShapesList, useShape, useShapesList } from '../store/shape-store'
import { useSocket } from '@/store/socket-store'

// Logic
import { shapesFunctions } from '../logic/logic'

// Components
import TransformerCanvas from './transformer-canvas'
import ShapeSelector from './shape-selector'
import ShapesList from './shapes-list'
// import FormCreateEdit from './form-create-edit'
import ShapeConfigModal from './shape-config-modal'
import ShapeListHistory from './shape-list-history'

// Utils
import { newShapeData } from '../utils/utils'
import { SHAPES_NAME } from '../constants/constants'
import { type CryptoUuid } from '../types/types'

// Utils
import { SocketEmitJoinRoom, SocketEmitUpdateShapeList, SocketOnUpdateHistoryShapeList, SocketOnUpdateShapeList, SocketOnUserConnected } from '@/utils/socket'

export default function MainCanvas ({ urlIdRoom }: { urlIdRoom: typeof CryptoUuid }): JSX.Element {
  const { shapeSelected, nodeSelected } = useShape((state) => ({
    shapeSelected: state.shapeSelected,
    nodeSelected: state.nodeSelected
  }), shallow)
  const { shapeList } = useShapesList((state) => ({ shapeList: state.shapeList }), shallow)
  const { idRoom } = useSocket((state) => ({ idRoom: state.idRoom }))
  const { setNodeSelected } = useShape()
  const { setShapeList } = useShapesList()
  const { setShapeListHistory } = useHistoryShapesList()
  const { createShape } = shapesFunctions()
  const { setIdRoom } = useSocket()
  const { setExportToImg } = useShape()

  const isDrawing = useRef(false)
  const idDrawRef = useRef<typeof CryptoUuid | null>(null)
  const windowValidated = typeof window !== 'undefined' ? window : null
  const stageRef = useRef(null)

  useEffect(() => {
    setExportToImg(handleExportToImg)
  }, [stageRef.current])

  useEffect(() => {
    SocketOnUpdateHistoryShapeList(setShapeListHistory)
  }, [])

  useEffect(() => {
    SocketEmitJoinRoom(idRoom)
    SocketOnUserConnected(idRoom)
    SocketOnUpdateShapeList(setShapeList)
  }, [idRoom])

  useEffect(() => {
    if (urlIdRoom == null) return
    setIdRoom(urlIdRoom)
  }, [urlIdRoom])

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>): void => {
    if (shapeSelected !== SHAPES_NAME.DRAW || nodeSelected[0] != null) return
    isDrawing.current = true
    const { x, y }: { x: number, y: number } = e.target.getStage()?.getPointerPosition() ?? { x: 0, y: 0 }
    const shapeData = newShapeData(shapeSelected, [x, y], [x, y])
    createShape(shapeData)
    idDrawRef.current = shapeData.id
  }

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>): void => {
    if (!isDrawing.current) return
    const stage = e.target.getStage()
    const { x, y }: { x: number, y: number } = stage?.getPointerPosition() ?? { x: 0, y: 0 }

    const updatedShapeList = shapeList.map((shape) => {
      if (shape.id === idDrawRef.current) {
        shape.points = [...shape.points, x, y]
      }
      return shape
    })
    setShapeList(updatedShapeList)
  }

  const handleMouseUp = (e: KonvaEventObject<MouseEvent>): void => {
    if (!isDrawing.current) return
    isDrawing.current = false
    const stage = e.target.getStage()
    const { x, y }: { x: number, y: number } = stage?.getPointerPosition() ?? { x: 0, y: 0 }
    const updatedShapeList = shapeList.map((shape) => {
      if (shape.id === idDrawRef.current) {
        shape.points = [...shape.points, x, y]
      }
      return shape
    })
    // socket?.emit('updateShapeList', { data: updatedShapeList, idRoom })
    SocketEmitUpdateShapeList(updatedShapeList, idRoom)
    console.log('updatedShapeList', updatedShapeList)
  }

  const handleClick = (e: KonvaEventObject<MouseEvent>): void => {
    const target = e.target as { id: () => string, getPointerPosition: () => { x: number, y: number } }
    if (target.id() !== 'main-canvas') return
    if (nodeSelected[0] != null || shapeSelected === SHAPES_NAME.CURSOR) {
      nodeSelected[0] != null && setNodeSelected([null, null])
      return
    }
    if (shapeSelected === SHAPES_NAME.DRAW) return
    const { x, y } = target.getPointerPosition()
    const shapeData = newShapeData(shapeSelected, [x, y])
    createShape(shapeData)
  }

  const handleExportToImg = (): void => {
    if (stageRef?.current == null) return
    const dataURL = (stageRef.current as unknown as HTMLCanvasElement).toDataURL()
    const link = document.createElement('a')
    link.download = 'canvas_image.jpg'
    link.href = dataURL
    link.click()
  }

  return (
    <>
      <ToastContainer
        position='top-left'
        autoClose={2000}
        stacked
        closeOnClick
      />
      <ShapeListHistory />
      <ShapeSelector />
      <ShapeConfigModal />
      <Stage ref={stageRef} onClick={handleClick} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} width={windowValidated?.innerWidth} height={windowValidated?.innerHeight} id='main-canvas'>
        <Layer>
          <TransformerCanvas />
          <ShapesList />
        </Layer>
      </Stage>
    </>
  )
}
