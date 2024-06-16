import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

// Store
import { useShape, useShapesList } from '../store/shape-store'
import { useSocket } from '@/store/socket-store'

// Types
import { type ShapeDataKeys, type CryptoUuid, type ShapeData } from '../types/types'

// Constants
import { DEBOUNCE_DELAY, INITIAL_CONFIG_DATA, NAMES_CONFIG_DATA, SHAPES, SHAPES_NAME } from '../constants/constants'

// Utils
import { numberValuesFormatted } from '../utils/utils'
import { SocketEmitUpdateShapeList } from '@/utils/socket'

export default function ShapeConfigModal (): JSX.Element {
  const { nodeSelected, updatedShapeConfigValues } = useShape((state) => ({
    nodeSelected: state.nodeSelected,
    updatedShapeConfigValues: state.updatedShapeConfigValues
  }), shallow)
  const { shapeList } = useShapesList((state) => ({ shapeList: state.shapeList }), shallow)
  const { idRoom } = useSocket((state) => ({ idRoom: state.idRoom }))
  const { setShapeList } = useShapesList()
  const [node, id] = nodeSelected
  const [shapeConfigValues, setShapeConfigValues] = useState(INITIAL_CONFIG_DATA)
  const [lastWidthHeight, setLastWidthHeight] = useState<Array<{ id: typeof CryptoUuid, width?: number, height?: number }>>([])

  useEffect(() => {
    if (node == null) return
    setShapeConfigValues({
      text: node?.attrs.text ?? null,
      image: node?.attrs.image ?? null,
      fontSize: node?.attrs.fontSize ?? null,
      width: node?.attrs.width ?? 0,
      height: node?.attrs.height ?? 0,
      scaleX: node?.attrs.scaleX ?? null,
      scaleY: node?.attrs.scaleY ?? null,
      fill: node?.attrs.fill ?? '',
      stroke: node?.attrs.stroke ?? null,
      x: node?.attrs.x ?? null,
      y: node?.attrs.y ?? null,
      padding: node?.attrs.padding ?? null,
      rotation: node?.attrs.rotation ?? null,
      strokeWidth: node?.attrs.strokeWidth ?? null,
      opacity: node?.attrs.opacity ?? null,
      numPoints: node?.attrs.numPoints ?? null,
      innerRadius: node?.attrs.innerRadius ?? null,
      outerRadius: node?.attrs.outerRadius ?? null,
      align: node?.attrs.align ?? null,
      verticalAlign: node?.attrs.verticalAlign ?? null,
      cornerRadius: node?.attrs.cornerRadius ?? null,
      points: node?.attrs.points ?? null,
      textFill: node?.attrs.textFill ?? null,
      shadowColor: node?.attrs.shadowColor ?? null,
      shadowBlur: node?.attrs.shadowBlur ?? null,
      shadowOpacity: node?.attrs.shadowOpacity ?? null,
      pointerDirection: node?.attrs.pointerDirection ?? null,
      pointerWidth: node?.attrs.pointerWidth ?? null,
      pointerHeight: node?.attrs.pointerHeight ?? null
    })
  }, [node])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShapeConfigValues((prevConfigValues) => ({
        ...prevConfigValues,
        ...updatedShapeConfigValues
      }))
      const newShapeList = shapeList?.map((shape) =>
        shape.id === id ? { ...shape, ...updatedShapeConfigValues } : shape
      ) as ShapeData[]
      // setShapeList(newShapeList)
      SocketEmitUpdateShapeList(newShapeList, idRoom)
    }, DEBOUNCE_DELAY)

    return () => { clearTimeout(timeoutId) }
  }, [updatedShapeConfigValues])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    let { name, value, checked } = e.target as HTMLInputElement
    if (name === NAMES_CONFIG_DATA.WIDTH.name || name === NAMES_CONFIG_DATA.HEIGHT.name) {
      const nameToUpperCase = name.toUpperCase() as keyof typeof NAMES_CONFIG_DATA
      if (checked) {
        const newValue: number = shapeConfigValues[name as ShapeDataKeys] !== 'auto' ? shapeConfigValues[name as ShapeDataKeys] : NAMES_CONFIG_DATA[nameToUpperCase].defaultValue
        lastWidthHeight.some((item) => item.id === id)
          ? setLastWidthHeight((prev) => prev.map((item) => item.id === id ? { ...item, [name]: newValue } : item))
          : setLastWidthHeight((prev) => [...prev, { id, [name]: newValue }])
        value = 'auto'
      } else if (!checked && value === 'auto') {
        value = String(lastWidthHeight.find((item) => item.id === id)?.[name] ?? (NAMES_CONFIG_DATA as unknown as Record<string, Record<string, number>>)[nameToUpperCase].defaultValue)
      }
    }
    if (name === NAMES_CONFIG_DATA.IMAGE.name) {
      const files = (e.target as HTMLInputElement).files
      if (files == null) return
      const file = files[0]
      if (file == null) return
      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.src = reader.result as string
        img.onload = () => {
          setShapeConfigValues((prev) => ({ ...prev, [name]: img as CanvasImageSource }))
          const newShapeList = shapeList?.map((shape) =>
            shape.id === id ? { ...shape, [name]: img } : shape
          )
          setShapeList(newShapeList)
        }
      }
      reader.readAsDataURL(file)
      return
    }
    if (shapeList == null || setShapeList == null) return
    const isFormatted = (name === NAMES_CONFIG_DATA.SCALE_X.name || name === NAMES_CONFIG_DATA.SCALE_Y.name || name === NAMES_CONFIG_DATA.OPACITY.name || name === NAMES_CONFIG_DATA.SHADOW_OPACITY.name)
    const valueFormatted = isNaN(Number(value)) || value === ''
      ? value
      : isFormatted
        ? Number(value) / 100
        : Number(value)
    setShapeConfigValues((prev) => ({ ...prev, [name]: valueFormatted }))
    const newShapeList = shapeList?.map((shape) => shape.id === id ? { ...shape, [name]: valueFormatted } : shape)
    // setShapeList(newShapeList)
    SocketEmitUpdateShapeList(newShapeList, idRoom)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLInputElement
    const [min, max] = Object.values(NAMES_CONFIG_DATA).find((config) => config.name === name)?.limitRange as [number, number]
    const isFormatted = (name === NAMES_CONFIG_DATA.SCALE_X.name || name === NAMES_CONFIG_DATA.SCALE_Y.name || name === NAMES_CONFIG_DATA.OPACITY.name || name === NAMES_CONFIG_DATA.SHADOW_OPACITY.name)
    const valueFormatted = isNaN(Number(value)) || value === ''
      ? value
      : isFormatted
        ? Number(value) / 100
        : Number(value)
    if (!isNaN(Number(value)) && min != null && max != null) {
      if (Number(valueFormatted) < min) {
        setShapeConfigValues((prev) => ({ ...prev, [name]: min }))
        const newShapeList = shapeList?.map((shape) => shape.id === id ? { ...shape, [name]: min } : shape)
        SocketEmitUpdateShapeList(newShapeList, idRoom)
      } else if (Number(valueFormatted) > max) {
        setShapeConfigValues((prev) => ({ ...prev, [name]: max }))
        const newShapeList = shapeList?.map((shape) => shape.id === id ? { ...shape, [name]: max } : shape)
        SocketEmitUpdateShapeList(newShapeList, idRoom)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape') (e.target as HTMLInputElement).blur()
  }

  return (
    <div className={`${node != null ? 'right-0 opacity-100' : '-right-[100px] opacity-0 pointer-events-none'} max-h-full fixed top-14 flex flex-col gap-4 bg-white shadow-both-sides p-4 pb-14 rounded-l-xl transition-all duration-500 ease-in-out z-50 overflow-y-auto`}>
      <h3 className='text-2xl font-semibold'>{node?.className ?? 'Shape'}</h3>
        <div className='flex flex-col gap-4'>
          {
            Object.entries(shapeConfigValues).map(([name, value]: [string, string | number]) => {
              if (value == null) return null
              if (name === NAMES_CONFIG_DATA.POINTS.name) return null
              if (node?.className === SHAPES_NAME.LINE && name === NAMES_CONFIG_DATA.FILL.name) return null
              if (node?.className === SHAPES_NAME.IMAGE && (name === NAMES_CONFIG_DATA.FILL.name || name === NAMES_CONFIG_DATA.STROKE.name)) return null
              const scaleWith = SHAPES.find((shape) => shape.name === node?.className)?.sizeWith
              if (scaleWith === 'width' && (name === NAMES_CONFIG_DATA.SCALE_X.name || name === NAMES_CONFIG_DATA.SCALE_Y.name)) return null
              if (scaleWith === 'scale' && (name === NAMES_CONFIG_DATA.WIDTH.name || name === NAMES_CONFIG_DATA.HEIGHT.name)) return null
              const configName = Object.values(NAMES_CONFIG_DATA).find((config) => config.name === name)?.formattedName
              const inputType = Object.values(NAMES_CONFIG_DATA).find((config) => config.name === name)?.type
              const isFormatted = (name === NAMES_CONFIG_DATA.SCALE_X.name || name === NAMES_CONFIG_DATA.SCALE_Y.name || name === NAMES_CONFIG_DATA.OPACITY.name || name === NAMES_CONFIG_DATA.SHADOW_OPACITY.name)
              const isAutoValue = value === 'auto'
              const stepsNumber = (name === NAMES_CONFIG_DATA.OPACITY.name || name === NAMES_CONFIG_DATA.SHADOW_OPACITY.name) ? 10 : 1
              const isWidthHeightText = node?.className === SHAPES_NAME.TEXT && (name === NAMES_CONFIG_DATA.WIDTH.name || name === NAMES_CONFIG_DATA.HEIGHT.name)
              const configValue = isNaN(Number(value)) || value === ''
                ? value
                : isFormatted
                  ? numberValuesFormatted(Number(value))
                  : Number(value).toFixed(0)
              const valueData = name !== NAMES_CONFIG_DATA.IMAGE.name ? !isAutoValue ? configValue : 'auto' : undefined

              return (
                <div key={name} className='flex flex-col capitalize gap-1'>
                  <label className='font-medium'>{configName}</label>
                  {
                    inputType !== null
                      ? <div className={`${isWidthHeightText ? 'flex gap-4 items-center' : ''}`}>
                          {
                            isWidthHeightText && <input className='cursor-pointer' type="checkbox" checked={isAutoValue} name={name} value={value} onChange={handleChange} />
                          }
                        {
                          name === NAMES_CONFIG_DATA.IMAGE.name
                            ? <label className='cursor-pointer bg-purple-800 text-white px-2 py-1 rounded-xl text-center' htmlFor='img-input'>Upload</label>
                            : null
                        }
                        <input onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} className={`${inputType !== 'color' ? 'border-b-2 border-slate-300' : 'cursor-pointer'} ${name === NAMES_CONFIG_DATA.IMAGE.name ? 'hidden' : ''} w-full px-2 bg-transparent outline-none focus:border-b-purple-800 disabled:opacity-40`} id={name === NAMES_CONFIG_DATA.IMAGE.name ? 'img-input' : ''} type={!isAutoValue ? inputType : 'text'} name={name} value={valueData} disabled={isAutoValue} step={stepsNumber} accept={name === NAMES_CONFIG_DATA.IMAGE.name ? 'image/*' : undefined} />
                        </div>
                      : name === NAMES_CONFIG_DATA.TEXT.name
                        ? <textarea onChange={handleChange} className='border-2 border-gray-600 max-h-[300px] p-2' name={name} value={value} />
                        : name === NAMES_CONFIG_DATA.ALIGN.name || name === NAMES_CONFIG_DATA.VERTICAL_ALIGN.name
                          ? <select onChange={handleChange} className='border-2 border-gray-600' name={name} value={value as string}>
                            {
                              name === NAMES_CONFIG_DATA.ALIGN.name
                                ? <>
                                    <option value='left'>Left</option>
                                    <option value='center'>Center</option>
                                    <option value='right'>Right</option>
                                  </>
                                : <>
                                    <option value='top'>Top</option>
                                    <option value='middle'>Middle</option>
                                    <option value='bottom'>Bottom</option>
                                  </>
                            }
                            </select>
                          : null
                  }
                </div>
              )
            })
          }
        </div>
    </div>
  )
}
