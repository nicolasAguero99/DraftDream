// Constants
import { CONFIG_VALUES_EXCEPTIONS, NAMES_CONFIG_DATA } from '../constants/constants'

// Types
import { type ShapeData, type ShapesNameType, type ShapeDataKeys } from '../types/types'

export function newShapeData (shapeType: ShapesNameType, position: number[] | null = null, points: number[] | null = null): ShapeData {
  const [x, y] = position ?? [undefined, undefined]
  const shapeDataDefaultValues: Partial<ShapeData> = Object.values(NAMES_CONFIG_DATA).reduce<Partial<ShapeData>>((acc, { name, defaultValue }) => {
    if (x !== undefined && name === 'x') {
      acc.x = x
    } else if (y !== undefined && name === 'y') {
      acc.y = y
    } else if (points !== null && name === 'points') {
      acc.points = points
    } else {
      acc[name as ShapeDataKeys] = (CONFIG_VALUES_EXCEPTIONS as Record<ShapesNameType, Partial<ShapeData>>)[shapeType]?.[name as ShapeDataKeys] ?? defaultValue
    }
    return acc
  }, {})
  shapeDataDefaultValues.id = crypto.randomUUID()
  shapeDataDefaultValues.type = shapeType
  return shapeDataDefaultValues as ShapeData
}

export function numberValuesFormatted (value: number): number {
  const numberFormatted = (Number(value) * 100).toFixed(0)
  return Number(numberFormatted)
}
