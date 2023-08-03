'use client'
import createEngine, {
  DefaultLinkModel,
  DiagramModel,
  PortModelAlignment,
  RightAngleLinkFactory,
} from '@projectstorm/react-diagrams'

import { CanvasWidget } from '@projectstorm/react-canvas-core'
import { useMemo } from 'react'
import { DiamondNodeFactory } from './DiamondNodeFactory'
import { DiamondNodeModel } from './DiamondNodeModel'

interface Node<T> {
  label: string
  id: string
  position: [number, number]
  data: T
}

interface Edge {
  target: string
  source: string
}

interface Graph<T> {
  nodes: Node<T>[]
  edges: Edge[]
}

const middle = (window.innerWidth - 200) / 2
const startHeight = 200

interface NodeData {
  icon: string
  title: string
  description: string
}

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

const createMyEngine = <T,>(graph: Graph<T>) => {
  const engine = createEngine()
  engine.getLinkFactories().registerFactory(new RightAngleLinkFactory())
  engine.getNodeFactories().registerFactory(new DiamondNodeFactory())

  const nodes = graph.nodes.map((nodeDescriptor) => {
    const node = new DiamondNodeModel(nodeDescriptor.data)
    node.setPosition(nodeDescriptor.position[0], nodeDescriptor.position[1])
    return {
      object: node,
      id: nodeDescriptor.id,
    }
  })

  const links = graph.edges
    .map((edgeDescriptor) => {
      const node1ID = edgeDescriptor.source
      const node1 = nodes.find((node) => node.id === node1ID)

      const node2ID = edgeDescriptor.target
      const node2 = nodes.find((node) => node.id === node2ID)

      if (!node1 || !node2) {
        return
      }

      const port1 = node1.object.getPort(PortModelAlignment.BOTTOM)
      const port2 = node2.object.getPort(PortModelAlignment.TOP)

      const linkModel = new DefaultLinkModel()
      linkModel.setSourcePort(port1)
      linkModel.setTargetPort(port2)
      return linkModel
    })
    .filter(Boolean) as DefaultLinkModel[]

  const model = new DiagramModel()
  const nodeObjects = nodes.map(({ object }) => object)
  model.addAll(...nodeObjects, ...links)
  engine.setModel(model)
  return engine
}

const Canvas = () => {
  const engine = useMemo(() => createMyEngine(graph), [])

  return (
    <div className="canvas-container">
      <CanvasWidget engine={engine} />
    </div>
  )
}

export default Canvas
