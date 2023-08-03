import useElementSize from '@/app/util/hooks/useElementSize'
import { NodeModel } from '@/app/types/nodeModel'
import {
  DiagramEngine,
  PortModelAlignment,
  PortWidget,
} from '@projectstorm/react-diagrams'
import { MutableRefObject, useRef } from 'react'
import NodeData from '@/app/types/nodeData'
import Image from 'next/image'

const PORT_WIDTH = 32
const PORT_HEIGHT = 4

const Port = () => (
  <div
    style={{
      width: `${PORT_WIDTH}px`,
      height: `${PORT_HEIGHT}px`,
      transform: `translateY(${PORT_HEIGHT / 2}px)`,
    }}
    className="cursor-pointer rounded-md bg-slate-400"
  ></div>
)

export interface NodeProps {
  node: NodeModel<NodeData>
  engine: DiagramEngine
}

const Node = ({ node, engine }: NodeProps) => {
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
        className="w-[350px] p-4 flex flex-col gap-4 bg-slate-200 shadow-lg rounded-md"
      >
        {node.data.title && node.data.icon ? (
          <div className="flex gap-4 items-center">
            <Image
              src={node.data.icon}
              alt={node.data.title}
              width={32}
              height={32}
            />
            <h2 className="text-2xl font-bold">{node.data.title}</h2>
          </div>
        ) : null}
        {node.data.description ? <p>{node.data.description}</p> : null}
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

export default Node
