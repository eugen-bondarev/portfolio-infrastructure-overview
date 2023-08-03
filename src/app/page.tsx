'use client'

import dynamic from 'next/dynamic'

// import Canvas from './components/Canvas'
const Canvas = dynamic(() => import('./components/Canvas'), { ssr: false })

const Page = () => {
  return <Canvas />
}

export default Page
