// Types
import { type ShapeDataKeys, type ShapeData, type ShapesNameType } from '../types/types'

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as unknown as string
export const SOCKET_PATH = process.env.NEXT_PUBLIC_SOCKET_PATH as unknown as string

export const SHAPES_NAME = {
  CURSOR: 'Cursor',
  TEXT: 'Text',
  RECT: 'Rect',
  CIRCLE: 'Circle',
  STAR: 'Star',
  IMAGE: 'Image',
  LINE: 'Line',
  ARROW: 'Arrow',
  LABEL: 'Label',
  DRAW: 'Draw'
} as const

export const SHAPES = [
  { name: SHAPES_NAME.CURSOR, shape: 'cursor', icon: '/icons/cursor-icon.svg', sizeWith: 'width' },
  { name: SHAPES_NAME.TEXT, shape: 'text', icon: '/icons/text-icon.svg', sizeWith: 'width' },
  { name: SHAPES_NAME.RECT, shape: 'rect', icon: '/icons/rect-icon.svg', sizeWith: 'width' },
  { name: SHAPES_NAME.CIRCLE, shape: 'circle', icon: '/icons/circle-icon.svg', sizeWith: 'scale' },
  { name: SHAPES_NAME.STAR, shape: 'star', icon: '/icons/star-icon.svg', sizeWith: 'scale' },
  // { name: SHAPES_NAME.IMAGE, shape: 'image', icon: '/icons/image-icon.svg', sizeWith: 'width' },
  { name: SHAPES_NAME.LINE, shape: 'line', icon: '/icons/line-icon.svg', sizeWith: 'scale' },
  { name: SHAPES_NAME.ARROW, shape: 'arrow', icon: '/icons/arrow-icon.svg', sizeWith: 'scale' },
  { name: SHAPES_NAME.LABEL, shape: 'label', icon: '/icons/text-background-icon.svg', sizeWith: 'scale' },
  { name: SHAPES_NAME.DRAW, shape: 'draw', icon: '/icons/pencil-icon.svg', sizeWith: 'scale' }
]

export const NAMES_CONFIG_DATA = {
  WIDTH: { name: 'width', defaultValue: 100, formattedName: 'Width', type: 'number', limitRange: [5, 8000] },
  HEIGHT: { name: 'height', defaultValue: 100, formattedName: 'Height', type: 'number', limitRange: [5, 8000] },
  NUM_POINTS: { name: 'numPoints', defaultValue: 5, formattedName: 'Num Points', type: 'number', limitRange: [2, 20] },
  INNER_RADIUS: { name: 'innerRadius', defaultValue: 20, formattedName: 'Inner Radius', type: 'number', limitRange: [1, 50] },
  OUTER_RADIUS: { name: 'outerRadius', defaultValue: 50, formattedName: 'Outer Radius', type: 'number', limitRange: [1, 100] },
  FILL: { name: 'fill', defaultValue: '#FF0000', formattedName: 'Color', type: 'color', limitRange: [null, null] },
  X: { name: 'x', defaultValue: 0, formattedName: 'Horizontal Position (x)', type: 'number', limitRange: [null, null] },
  Y: { name: 'y', defaultValue: 0, formattedName: 'Vertical Position (y)', type: 'number', limitRange: [null, null] },
  PADDING: { name: 'padding', defaultValue: 10, formattedName: 'Padding', type: 'number', limitRange: [0, 100] },
  ROTATION: { name: 'rotation', defaultValue: 0, formattedName: 'Rotation', type: 'number', limitRange: [-360, 360] },
  SCALE_X: { name: 'scaleX', defaultValue: 1, formattedName: 'Scale X', type: 'number', limitRange: [0, 8000] },
  SCALE_Y: { name: 'scaleY', defaultValue: 1, formattedName: 'Scale Y', type: 'number', limitRange: [0, 8000] },
  STROKE_WIDTH: { name: 'strokeWidth', defaultValue: 2, formattedName: 'Stroke Width', type: 'number', limitRange: [0, 20] },
  STROKE: { name: 'stroke', defaultValue: '#000000', formattedName: 'Stroke', type: 'color', limitRange: [null, null] },
  CORNER_RADIUS: { name: 'cornerRadius', defaultValue: 10, formattedName: 'Corner Radius', type: 'number', limitRange: [0, 50] },
  OPACITY: { name: 'opacity', defaultValue: 1, formattedName: 'Opacity', type: 'number', limitRange: [0, 1] },
  TEXT: { name: 'text', defaultValue: null, formattedName: 'Text Content', type: null, limitRange: [null, null] },
  FONT_SIZE: { name: 'fontSize', defaultValue: null, formattedName: 'Font Size', type: 'number', limitRange: [10, 400] },
  ALIGN: { name: 'align', defaultValue: null, formattedName: 'Text Align', type: null, limitRange: [null, null] },
  VERTICAL_ALIGN: { name: 'verticalAlign', defaultValue: null, formattedName: 'Text Vertical Align', type: null, limitRange: [null, null] },
  POINTS: { name: 'points', defaultValue: null, formattedName: 'Points', type: 'text', limitRange: [null, null] },
  IMAGE: { name: 'image', defaultValue: null, formattedName: 'Image File', type: 'file', limitRange: [null, null] },
  TEXT_FILL: { name: 'textFill', defaultValue: null, formattedName: 'Text Color', type: 'color', limitRange: [null, null] },
  SHADOW_COLOR: { name: 'shadowColor', defaultValue: '#000000', formattedName: 'Shadow Color', type: 'color', limitRange: [null, null] },
  SHADOW_BLUR: { name: 'shadowBlur', defaultValue: 0, formattedName: 'Shadow Blur', type: 'number', limitRange: [0, 100] },
  SHADOW_OPACITY: { name: 'shadowOpacity', defaultValue: 0, formattedName: 'Shadow Opacity', type: 'number', limitRange: [0, 1] },
  POINTER_DIRECTION: { name: 'pointerDirection', defaultValue: null, formattedName: 'Pointer Direction', type: 'text', limitRange: [null, null] },
  POINTER_WIDTH: { name: 'pointerWidth', defaultValue: null, formattedName: 'Pointer Width', type: 'number', limitRange: [0, 100] },
  POINTER_HEIGHT: { name: 'pointerHeight', defaultValue: null, formattedName: 'Pointer Height', type: 'number', limitRange: [0, 100] }
} as const

export const CONFIG_VALUES_EXCEPTIONS: Partial<Record<ShapesNameType, Partial<ShapeData | null>>> = {
  [SHAPES_NAME.TEXT]: { width: 'auto', height: 'auto', text: 'Text', fontSize: 50, align: 'center', verticalAlign: 'middle', strokeWidth: 0 },
  [SHAPES_NAME.LINE]: { points: [0, 0, 100, 0], strokeWidth: 8, stroke: '#000000', fill: '#000000', padding: 40 },
  [SHAPES_NAME.ARROW]: { points: [0, 0, 100, 0], strokeWidth: 3, stroke: '#000000', fill: '#000000' },
  [SHAPES_NAME.IMAGE]: { image: undefined, fill: '#ffffff', strokeWidth: 0 },
  [SHAPES_NAME.DRAW]: { strokeWidth: 8, stroke: '#000000', fill: '#000000' },
  [SHAPES_NAME.LABEL]: { width: 200, height: 100, text: 'Label', fontSize: 18, align: 'center', verticalAlign: 'middle', padding: 20, cornerRadius: 8, fill: '#ffffff', shadowOpacity: 1, shadowBlur: 10, textFill: '#000000', pointerDirection: 'up', pointerWidth: 20, pointerHeight: 20 }
}

export const DEBOUNCE_DELAY = 50

export const INITIAL_CONFIG_DATA = Object.values(NAMES_CONFIG_DATA).reduce<Partial<ShapeData>>((acc, { name, defaultValue }) => {
  acc[name as ShapeDataKeys] = defaultValue
  return acc
}, {})
