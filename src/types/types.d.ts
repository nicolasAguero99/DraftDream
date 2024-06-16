import { type Socket } from 'socket.io-client'

// Constants
import { type SHAPES_NAME, type SUB_SHAPES_NAME } from '../constants/constants'

export interface TextType {
  id: typeof CryptoUuid
  text: string
  position: Position
}

export interface ShapeType {
  id: typeof CryptoUuid
  text?: string
  position: Position
}

export interface Position {
  x: number
  y: number
}

export interface ShapeData {
  id?: typeof CryptoUuid
  type: ShapesNameType
  width: number | 'auto'
  height: number | 'auto'
  fill: `#${string}` | ''
  x: number
  y: number
  padding: number
  rotation: number
  scaleX: number
  scaleY: number
  strokeWidth: number
  stroke: string
  cornerRadius?: number
  opacity: number
  text?: string
  fontSize?: number
  numPoints?: number
  innerRadius?: number
  outerRadius?: number
  align?: string
  verticalAlign?: string
  points: number[]
  image?: string | CanvasImageSource
  textFill?: string
  shadowColor?: string
  shadowBlur?: number
  shadowOpacity?: number
  pointerDirection?: string
  pointerWidth?: number
  pointerHeight?: number
}

export interface StickyNoteStore {
  textList: TextType[]
  position: Position
  isCreatingNote: boolean
  isEditingNote: boolean
  historyStickyNotes: TextType[]
  setTextList: (textList: TextType[]) => void
  setPosition: (position: Position) => void
  setIsCreatingNote: (isCreatingNote: boolean) => void
  setIsEditingNote: (isEditingNote: boolean) => void
  setHistoryStickyNotes: (historyStickyNotes: TextType[]) => void
}

export interface DraggingStickyNoteStore {
  isDraggingNote: boolean
  idSelected: number
  setIsDraggingNote: (isDraggingNote: boolean) => void
  setIdSelected: (idSelected: number) => void
}

export interface ShapeStore {
  shapeSelected: ShapesNameType
  nodeSelected: [any, typeof CryptoUuid]
  isSelected: boolean
  updatedShapeConfigValues: any
  lastShapeDeleted: ShapesNameType
  exportToImg: () => void
  setShapeSelected: (shape: ShapesNameType) => void
  setNodeSelected: (node: [any, typeof CryptoUuid]) => void
  setIsSelected: (isSelected: boolean) => void
  setUpdatedShapeConfigValues: (shapeConfigValues: any) => void
  setLastShapeDeleted: (lastShapeDeleted: ShapesNameType) => void
  setExportToImg: (exportToImg: () => void) => void
}

export interface ShapeListStore {
  shapeList: ShapeData[]
  setShapeList: (shapeList: ShapeData[]) => void
}

export interface HistoryShapeListStore {
  shapeListHistory: ShapeData[]
  setShapeListHistory: (shapeListHistory: ShapeData[]) => void
}

export interface SocketStore {
  idRoom: typeof CryptoUuid | null
  setIdRoom: (idRoom: typeof CryptoUuid) => void
}

export interface NotesFunctions {
  dropNote: (setIsThisDraggingNote: (arg: boolean) => void) => void
  clearNote: (setTextNote: (arg: string) => void, setWidthInput: (arg: number) => void) => void
  createNote: (noteData: TextType) => void
  editNote: (noteData: TextType, setIsEditingNote: (arg: boolean) => void) => void
  deleteShape: (id: typeof CryptoUuid) => void
  recoverNote: () => void
}

export interface ShapesFunctions {
  createShape: (shapeData: any) => void
  // updateShape: (shapeData: any) => void
  deleteShape: (id: typeof CryptoUuid) => void
  recoverShape: () => void
}

export type UseShapeHook = [ShapeData[], (shapeList: ShapeData[]) => void] | [null, null]

export interface UseSocketHook {
  socket: Socket | null
  isConnected: boolean
  usersConnected: string[]
}

export type ShapesNameType = typeof SHAPES_NAME[keyof typeof SHAPES_NAME]

export type SubShapesNameType = typeof SUB_SHAPES_NAME[keyof typeof SUB_SHAPES_NAME]

export const CryptoUuid: crypto.randomUUID

export type ShapeDataKeys = keyof ShapeData
