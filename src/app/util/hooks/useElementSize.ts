import { MutableRefObject, useState, useLayoutEffect } from 'react'

const useElementSize = <T extends HTMLElement>(ref: MutableRefObject<T>) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const observer = new ResizeObserver((entries) => {
      console.log({ entries })
      setWidth(entries[0].borderBoxSize[0].inlineSize)
      setHeight(entries[0].borderBoxSize[0].blockSize)
    })
    observer.observe(ref.current)
    return () => ref.current && observer.unobserve(ref.current)
  }, [])

  return [width, height]
}

export default useElementSize
