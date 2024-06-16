import { createWithEqualityFn } from 'zustand/traditional'

// Types
import { type HistoryShapeListStore, type ShapeListStore, type ShapeStore } from '../types/types'

// Constants
import { SHAPES_NAME } from '../constants/constants'

export const useShape = createWithEqualityFn<ShapeStore>((set) => ({
  shapeSelected: SHAPES_NAME.CURSOR,
  nodeSelected: [null, null],
  isSelected: false,
  updatedShapeConfigValues: {},
  lastShapeDeleted: SHAPES_NAME.CURSOR,
  exportToImg: () => undefined,
  setShapeSelected: (shapeSelected) => { set({ shapeSelected }) },
  setNodeSelected: (nodeSelected) => { set({ nodeSelected }) },
  setIsSelected: (isSelected) => { set({ isSelected }) },
  setUpdatedShapeConfigValues: (updatedShapeConfigValues) => { set({ updatedShapeConfigValues }) },
  setLastShapeDeleted: (lastShapeDeleted) => { set({ lastShapeDeleted }) },
  setExportToImg: (exportToImg) => { set({ exportToImg }) }
}))

export const useShapesList = createWithEqualityFn<ShapeListStore>((set) => ({
  shapeList: [],
  setShapeList: (shapeList) => { set({ shapeList }) }
}))

export const useHistoryShapesList = createWithEqualityFn<HistoryShapeListStore>((set) => ({
  shapeListHistory: [],
  setShapeListHistory: (shapeListHistory) => { set({ shapeListHistory }) }
}))
