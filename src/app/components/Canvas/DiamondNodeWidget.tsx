import useElementSize from '@/app/util/hooks/useElementSize'
import { DiamondNodeModel } from './DiamondNodeModel'
import {
  DiagramEngine,
  PortModelAlignment,
  PortWidget,
} from '@projectstorm/react-diagrams'
import { MutableRefObject, useRef } from 'react'
import NodeData from '@/app/types/nodeData'

const PORT_WIDTH = 32
const PORT_HEIGHT = 8

const Port = () => (
  <div
    style={{
      width: `${PORT_WIDTH}px`,
      height: `${PORT_HEIGHT}px`,
      transform: `translateY(${PORT_HEIGHT / 2}px)`,
    }}
    className="cursor-pointer rounded-md bg-lime-500"
  ></div>
)

export interface DiamondNodeWidgetProps {
  node: DiamondNodeModel<NodeData>
  engine: DiagramEngine
}

const DiamondNodeWidget = ({ node, engine }: DiamondNodeWidgetProps) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const [width, height] = useElementSize(ref)
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
              left: width / 2 - PORT_WIDTH / 2,
              top: -PORT_HEIGHT,
              position: 'absolute',
            }}
            port={node.getPort(PortModelAlignment.TOP)!}
            engine={engine}
          >
            <Port />
          </PortWidget>
          <PortWidget
            style={{
              left: width / 2 - PORT_WIDTH / 2,
              top: height - PORT_HEIGHT,
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
