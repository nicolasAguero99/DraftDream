import { shallow } from 'zustand/shallow'

// Store
import { useShape, useShapesList } from '@/store/shape-store'

// Logic
import { shapesFunctions } from '@/logic/logic'

export default function ShapeListHistory (): JSX.Element {
  const { nodeSelected } = useShape((state) => ({ nodeSelected: state.nodeSelected }), shallow)
  const { shapeList } = useShapesList((state) => ({ shapeList: state.shapeList }), shallow)
  const { setNodeSelected } = useShape()
  const { deleteShape } = shapesFunctions()

  const handleDelete = (id: string): void => {
    deleteShape(id)
    if (nodeSelected[1] === id) setNodeSelected([null, null])
  }

  return (
    <>
      {
        shapeList.length > 0 &&
        <div className='-left-24 opacity-50 h-full fixed top-14 flex flex-col gap-4 bg-white shadow-both-sides p-4 pb-24 pe-8 rounded-r-xl transition-all duration-500 ease-in-out z-50 overflow-y-auto hover:left-0 hover:opacity-100 hover:pe-4'>
          {
            shapeList.map(shape => {
              return (
                <div key={shape.id} className='flex gap-4 justify-between items-center'>
                  <h2>{shape.type}</h2>
                  <button className='hover:opacity-40 rounded-full' onClick={() => { handleDelete(shape.id as string) }}>
                    <img className='size-7' src="/icons/trash-icon.svg" alt="delete shape" />
                  </button>
                </div>
              )
            })
          }
        </div>
      }
    </>
  )
}
