// Components
import MainCanvas from '@/components/main-canvas'
import Nav from '@/components/nav'

export default function PageId ({ params }: { params: { id: any } }): JSX.Element {
  return (
    <>
      <Nav />
      <MainCanvas urlIdRoom={params.id} />
    </>
  )
}
