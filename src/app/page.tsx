'use client'

import dynamic from 'next/dynamic'
import Social from './components/Social'

// import Canvas from './components/Canvas'
const Canvas = dynamic(() => import('./components/Canvas'), { ssr: false })

const Page = () => {
  return (
    <>
      <Canvas />
      <Social />
    </>
  )
}

export default Page
