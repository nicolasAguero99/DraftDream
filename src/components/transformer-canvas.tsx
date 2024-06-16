import { useEffect } from 'react'
import { Transformer } from 'react-konva'
import { shallow } from 'zustand/shallow'

// Logic
import { shapesFunctions } from '../logic/logic'

// Store
import { useHistoryShapesList, useShape } from '../store/shape-store'
import { SHAPES_NAME } from '@/constants/constants'

export default function TransformerCanvas (): JSX.Element {
  const { nodeSelected } = useShape((state) => ({
    nodeSelected: state.nodeSelected
  }), shallow)
  const { shapeListHistory } = useHistoryShapesList((state) => ({ shapeListHistory: state.shapeListHistory }), shallow)
  const { setNodeSelected } = useShape()
  const { deleteShape, recoverShape } = shapesFunctions()
  const [node, id] = nodeSelected

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Escape' && e.key !== 'Delete') return
      const target = e.target as HTMLElement
      const isInputElement = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
      if (e.key === 'Escape') setNodeSelected([null, null])
      if (isInputElement) return
      if (e.key === 'Delete') {
        deleteShape(id)
        setNodeSelected([null, null])
      }
    }
    if (typeof window === 'undefined') return
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      if (typeof window === 'undefined') return
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [id, shapeListHistory])

  useEffect(() => {
    const handleUndo = (e: KeyboardEvent): void => {
      if (e.ctrlKey && e.key === 'z') {
        const target = e.target as HTMLElement
        const isInputElement = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
        if (isInputElement) return
        recoverShape()
      }
    }
    if (typeof window === 'undefined') return
    window.addEventListener('keydown', handleUndo)

    return () => {
      if (typeof window === 'undefined') return
      window.removeEventListener('keydown', handleUndo)
    }
  }, [shapeListHistory])

  return (
    <>
      {
        node != null ? <Transformer keepRatio={false} anchorCornerRadius={5} node={node} resizeEnabled={node.className !== SHAPES_NAME.LINE} rotateEnabled={node.className !== SHAPES_NAME.LINE} /> : null
      }
    </>
  )
}
