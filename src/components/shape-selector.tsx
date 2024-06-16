// Constants
import { SHAPES } from '../constants/constants'

// Types
import { type ShapesNameType } from '../types/types'

// Store
import { useShape } from '../store/shape-store'

export default function ShapeSelector (): JSX.Element {
  const { shapeSelected } = useShape((state) => ({
    shapeSelected: state.shapeSelected
  }))
  const { setShapeSelected, setNodeSelected } = useShape()

  const handleSelectShape = (shape: ShapesNameType): void => {
    setShapeSelected(shape)
    setNodeSelected([null, null])
  }

  return (
    <div className='fixed bottom-4 left-0 right-0 mx-auto z-50'>
      <ul className='bg-white flex gap-3 w-fit py-2 px-4 rounded-full shadow-both-sides m-auto'>
        {
          SHAPES.map((shape) => (
            <li key={shape.name} className='relative z-50 [&>ul]:hover:flex'>
              <button className={`${shapeSelected === shape.name ? 'bg-primary ring-2 ring-primary ring-offset-2 [&>img]:invert [&>img]:hover:invert-0' : ''} flex justify-center items-center p-2 rounded-full hover:bg-neutral-200 hover:ring-neutral-200`} onClick={() => { handleSelectShape(shape.name) }}>
                <img className='size-6' src={shape.icon} alt={shape.name} />
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
