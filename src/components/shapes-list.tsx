import { useEffect, useState } from 'react'
import { Arrow, Circle, Image, Label, Line, Rect, Star, Tag, Text } from 'react-konva'
import { shallow } from 'zustand/shallow'
import { type KonvaEventObject } from 'konva/lib/Node'

// Store
import { useShape, useShapesList } from '../store/shape-store'
import { SHAPES, SHAPES_NAME } from '../constants/constants'

export default function ShapesList (): JSX.Element {
  const { shapeList } = useShapesList((state) => ({
    shapeList: state.shapeList
  }), shallow)
  const { nodeSelected } = useShape((state) => ({
    nodeSelected: state.nodeSelected
  }), shallow)
  const { setNodeSelected, setUpdatedShapeConfigValues } = useShape()
  const { setShapeList } = useShapesList()

  const [defaultImage, setDefaultImage] = useState<HTMLImageElement>()

  useEffect(() => {
    const img = new window.Image()
    img.src = '/vite.svg'
    img.onload = () => {
      setDefaultImage(img)
    }
  }, [])

  const handleSelect = (e: KonvaEventObject<MouseEvent>): void => {
    const target = e.target
    console.log('target.id()', target.id())
    if (target.className === 'Tag' || target.className === 'Text') {
      console.log('target.parent', target.parent)
      if (target.parent?.className === 'Label') {
        setNodeSelected([target.parent, target.parent?.id()])
        return
      }
    }
    setNodeSelected([target, target.id()])
  }

  const handleDragMove = (e: KonvaEventObject<MouseEvent>): void => {
    const target = e.target
    const { x, y } = target.getPosition()
    setUpdatedShapeConfigValues({ x, y })
    if (nodeSelected[1] !== target.id()) setNodeSelected([target, target.id()])
  }

  const handleTransform = (e: KonvaEventObject<MouseEvent>): void => {
    const target = e.target
    const { rotation }: { rotation: number } = target.attrs
    setUpdatedShapeConfigValues({ rotation })
  }

  const handleTransformEnd = (e: KonvaEventObject<MouseEvent>): void => {
    const target = e.target
    const scaleWith = SHAPES.find((shape) => shape.name === target.className)?.sizeWith

    let { rotation, scaleX, scaleY }: { rotation: number, scaleX: number, scaleY: number } = target.attrs
    let width = 0
    let height = 0
    if (scaleWith === 'width') {
      width = target.width() * target.scaleX()
      height = target.height() * target.scaleY()
      target.scaleX(1)
      target.scaleY(1)
      scaleX = 1
      scaleY = 1
    }
    const newShapeList = shapeList.map((shape) => {
      if (shape.id === target.id()) {
        return {
          ...shape,
          width,
          height
        }
      }
      return shape
    })
    setShapeList(newShapeList)
    setUpdatedShapeConfigValues({ rotation, width, height, scaleX, scaleY })
  }

  return (
    <>
      {
        shapeList.length > 0 && shapeList.map((shape) => {
          if (shape.type === SHAPES_NAME.TEXT) {
            return (
              <Text key={shape.id} onClick={handleSelect} onDragMove={handleDragMove} onTransform={handleTransform} onTransformEnd={handleTransformEnd} id={String(shape.id)} x={shape.x} y={shape.y} width={shape.width as number} height={shape.height as number} fill={shape.fill} rotation={shape.rotation} scaleX={shape.scaleX} scaleY={shape.scaleY} fontSize={shape.fontSize} text={shape.text} padding={shape.padding} align={shape.align} verticalAlign={shape.verticalAlign} stroke={shape.stroke} strokeWidth={shape.strokeWidth} opacity={shape.opacity} draggable />
            )
          } else if (shape.type === SHAPES_NAME.RECT) {
            return (
              <Rect key={shape.id} onClick={handleSelect} onDragMove={handleDragMove} onTransform={handleTransform} onTransformEnd={handleTransformEnd} id={String(shape.id)} x={shape.x} y={shape.y} width={shape.width as number} height={shape.height as number} fill={shape.fill} rotation={shape.rotation} scaleX={shape.scaleX} scaleY={shape.scaleY} cornerRadius={shape.cornerRadius} stroke={shape.stroke} strokeWidth={shape.strokeWidth} opacity={shape.opacity} draggable />
            )
          } else if (shape.type === SHAPES_NAME.CIRCLE) {
            return (
              <Circle key={shape.id} onClick={handleSelect} onDragMove={handleDragMove} onTransform={handleTransform} id={String(shape.id)} x={shape.x} y={shape.y} width={shape.width as number} height={shape.height as number} fill={shape.fill} rotation={shape.rotation} scaleX={shape.scaleX} scaleY={shape.scaleY} stroke={shape.stroke} strokeWidth={shape.strokeWidth} opacity={shape.opacity} draggable />
            )
          } else if (shape.type === SHAPES_NAME.LINE) {
            return (
              <Line key={shape.id} onClick={handleSelect} onDragMove={handleDragMove} onTransform={handleTransform} id={String(shape.id)} x={shape.x} y={shape.y} width={shape.width as number} height={shape.height as number} fill={shape.fill} rotation={shape.rotation} scaleX={shape.scaleX} scaleY={shape.scaleY} points={shape.points} stroke={shape.stroke} strokeWidth={shape.strokeWidth} opacity={shape.opacity} draggable />
            )
          } else if (shape.type === SHAPES_NAME.STAR) {
            return (
              <Star key={shape.id} onClick={handleSelect} onDragMove={handleDragMove} onTransform={handleTransform} id={String(shape.id)} x={shape.x} y={shape.y} width={shape.width as number} height={shape.height as number} fill={shape.fill} rotation={shape.rotation} scaleX={shape.scaleX} scaleY={shape.scaleY} numPoints={Number(shape.numPoints)} innerRadius={Number(shape.innerRadius)} outerRadius={Number(shape.outerRadius)} stroke={shape.stroke} strokeWidth={shape.strokeWidth} opacity={shape.opacity} draggable />
            )
          } else if (shape.type === SHAPES_NAME.IMAGE) {
            return (
              <Image key={shape.id} onClick={handleSelect} onDragMove={handleDragMove} onTransform={handleTransform} onTransformEnd={handleTransformEnd} id={String(shape.id)} x={shape.x} y={shape.y} width={shape.width as number} height={shape.height as number} fill={shape.fill} rotation={shape.rotation} scaleX={shape.scaleX} scaleY={shape.scaleY} image={shape.image as CanvasImageSource ?? defaultImage} stroke={shape.stroke} strokeWidth={shape.strokeWidth} opacity={shape.opacity} draggable />
            )
          } else if (shape.type === SHAPES_NAME.ARROW) {
            return (
              <Arrow key={shape.id} onClick={handleSelect} onDragMove={handleDragMove} onTransform={handleTransform} id={String(shape.id)} x={shape.x} y={shape.y} width={shape.width as number} height={shape.height as number} fill={shape.fill} rotation={shape.rotation} scaleX={shape.scaleX} scaleY={shape.scaleY} stroke={shape.stroke} strokeWidth={shape.strokeWidth} points={shape.points} opacity={shape.opacity} draggable />
            )
          } else if (shape.type === SHAPES_NAME.LABEL) {
            return (
              <Label key={shape.id} onClick={handleSelect} onDragMove={handleDragMove} onTransform={handleTransform} onTransformEnd={handleTransformEnd} id={String(shape.id)} x={shape.x} y={shape.y} text={shape.text} fontSize={shape.fontSize} padding={shape.padding} textFill={shape.textFill} pointerDirection={shape.pointerDirection} pointerWidth={shape.pointerWidth} pointerHeight={shape.pointerHeight}
                cornerRadius={shape.cornerRadius} shadowColor={shape.shadowColor} shadowBlur={shape.shadowBlur} shadowOpacity={shape.shadowOpacity} draggable >
                <Tag
                  fill={shape.fill}
                  pointerDirection={shape.pointerDirection}
                  pointerWidth={shape.pointerWidth}
                  pointerHeight={shape.pointerHeight}
                  cornerRadius={shape.cornerRadius}
                  shadowColor={shape.shadowColor}
                  shadowBlur={shape.shadowBlur}
                  shadowOpacity={shape.shadowOpacity}
                  draggable={false}
                  />
                <Text
                  text={shape.text}
                  fontSize={shape.fontSize}
                  padding={shape.padding}
                  fill={shape.textFill}
                  draggable={false}
                />
              </Label>
            )
          } else if (shape.type === SHAPES_NAME.DRAW) {
            return (
              <Line
                key={crypto.randomUUID()}
                onClick={handleSelect}
                id={String(shape.id)}
                width={shape.width as number}
                points={shape?.points}
                stroke={shape.stroke}
                strokeWidth={shape.strokeWidth}
                opacity={shape.opacity}
                tension={0}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation="source-over"
              />
            )
          } else {
            return null
          }
        })
      }
    </>
  )
}
