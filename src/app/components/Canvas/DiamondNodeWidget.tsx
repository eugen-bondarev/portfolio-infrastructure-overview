import { DiamondNodeModel } from './DiamondNodeModel'
import {
  DiagramEngine,
  PortModelAlignment,
  PortWidget,
} from '@projectstorm/react-diagrams'
import { MutableRefObject, useEffect, useRef, useState } from 'react'

const Port = () => (
  <div className="w-8 h-2 cursor-pointer rounded-md bg-lime-500 transform translate-y-1"></div>
)

export interface DiamondNodeWidgetProps {
  node: DiamondNodeModel
  engine: DiagramEngine
}

const DiamondNodeWidget = ({ node, engine }: DiamondNodeWidgetProps) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      console.log({ entries })
      setWidth(entries[0].borderBoxSize[0].inlineSize)
      setHeight(entries[0].borderBoxSize[0].blockSize)
    })
    observer.observe(ref.current)
    return () => ref.current && observer.unobserve(ref.current)
  }, [])

  const isInitialized = width * height !== 0

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
      }}
    >
      <div
        ref={ref}
        className="w-[200px] p-4 bg-slate-200 shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold">{node.data.title}</h2>
        <p>{node.data.description}</p>
      </div>
      {isInitialized ? (
        <>
          <PortWidget
            style={{
              left: width / 2 - 16,
              top: -8,
              position: 'absolute',
            }}
            port={node.getPort(PortModelAlignment.TOP)!}
            engine={engine}
          >
            <Port />
          </PortWidget>
          <PortWidget
            style={{
              left: width / 2 - 16,
              top: height - 8,
              position: 'absolute',
            }}
            port={node.getPort(PortModelAlignment.BOTTOM)!}
            engine={engine}
          >
            <Port />
          </PortWidget>
        </>
      ) : null}
    </div>
  )
}

export default DiamondNodeWidget
