'use client'
import { CanvasWidget } from '@projectstorm/react-canvas-core'
import NodeData from '@/app/types/nodeData'
import Graph from '@/app/types/graph'
import useEngine from '@/app/util/hooks/useEngine'

const middle = (window.innerWidth - 200) / 2
const startHeight = 200

const graph: Graph<NodeData> = {
  nodes: [
    {
      id: '1',
      label: 'Node 1',
      position: [middle, startHeight],
      data: {
        icon: 'google',
        title: 'google',
        description: 'google',
      },
    },
    {
      id: '2',
      label: 'Node 2',
      position: [middle - 200, startHeight + 300],
      data: {
        icon: 'test',
        title: 'test',
        description: 'test',
      },
    },
    {
      id: '3',
      label: 'Node 3',
      position: [middle + 200, startHeight + 300],
      data: {
        icon: 'ingress',
        title: 'ingress',
        description: 'ingress',
      },
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '1',
      target: '3',
    },
  ],
}

const Canvas = () => {
  const engine = useEngine(graph)

  return (
    <div className="canvas-container">
      <CanvasWidget engine={engine} />
    </div>
  )
}

export default Canvas
