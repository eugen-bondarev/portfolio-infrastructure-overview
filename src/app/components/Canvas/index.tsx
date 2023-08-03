'use client'
import createEngine, {
  AbstractModelFactory,
  DefaultLinkModel,
  DefaultNodeModel,
  DefaultPortModel,
  DiagramModel,
  LinkModel,
  PortModelAlignment,
  RightAngleLinkFactory,
  RightAngleLinkModel,
} from '@projectstorm/react-diagrams'

import { CanvasWidget } from '@projectstorm/react-canvas-core'
import { useMemo } from 'react'
import { DiamondNodeFactory } from './DiamondNodeFactory'
import { DiamondNodeModel } from './DiamondNodeModel'

// When new link is created by clicking on port the RightAngleLinkModel needs to be returned.
class RightAnglePortModel extends DefaultPortModel {
  createLinkModel(factory?: AbstractModelFactory<LinkModel>) {
    return new RightAngleLinkModel()
  }
}

interface Node {
  label: string
  id: string
  position: [number, number]
}

interface Edge {
  target: string
  source: string
}

interface Graph {
  nodes: Node[]
  edges: Edge[]
}

const middle = (window.innerWidth - 200) / 2
const startHeight = 200

const graph: Graph = {
  nodes: [
    {
      id: '1',
      label: 'Node 1',
      position: [middle, startHeight],
    },
    {
      id: '2',
      label: 'Node 2',
      position: [middle - 200, startHeight + 300],
    },
    {
      id: '3',
      label: 'Node 3',
      position: [middle + 200, startHeight + 300],
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

const createMyEngine = (graph: Graph) => {
  const engine = createEngine()
  engine.getLinkFactories().registerFactory(new RightAngleLinkFactory())
  engine.getNodeFactories().registerFactory(new DiamondNodeFactory())

  const nodes = graph.nodes.map((nodeDescriptor) => {
    const node = new DiamondNodeModel()
    node.setPosition(nodeDescriptor.position[0], nodeDescriptor.position[1])
    return {
      object: node,
      id: nodeDescriptor.id,
      inPort: node.inPort,
      outPort: node.outPort,
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
