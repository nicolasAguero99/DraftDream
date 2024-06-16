'use client'

// Store
import { useShape } from '@/store/shape-store'

export default function Nav (): JSX.Element {
  const { exportToImg } = useShape((state) => ({ exportToImg: state.exportToImg }))

  const handleClick = (): void => {
    exportToImg()
  }

  return (
    <nav className="fixed top-0 w-full bg-white flex justify-between items-center gap-4 px-4 py-2 z-50 shadow-sm">
      <img className="size-8" src="/vite.svg" alt="logo" />
      <button className="flex gap-1 items-center bg-primary px-4 py-2 rounded-xl text-white text-sm hover:opacity-70" onClick={handleClick}>
        Export
        <img className='w-5' src="/icons/download-icon.svg" alt="export canvas to image" />
      </button>
    </nav>
  )
}
