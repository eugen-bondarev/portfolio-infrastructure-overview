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

const graph: Graph = {
  nodes: [
    {
      id: '1',
      label: 'Node 1',
      position: [0, 100],
    },
    {
      id: '2',
      label: 'Node 2',
      position: [-200, 400],
    },
    {
      id: '3',
      label: 'Node 3',
      position: [200, 400],
    },
  ],
  edges: [
    {
      target: '1',
      source: '2',
    },
    {
      target: '1',
      source: '3',
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
    const inPort = node.addPort(new RightAnglePortModel(true, 'in-1', 'In'))
    const outPort = node.addPort(new RightAnglePortModel(false, 'out-1', 'Out'))
    // const inPort = node.getPort(PortModelAlignment.TOP)
    // const outPort = node.getPort(PortModelAlignment.BOTTOM)
    return {
      object: node,
      id: nodeDescriptor.id,
      inPort,
      outPort,
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
      // return node1.outPort?.addLink()
      return node1.outPort.link<DefaultLinkModel>(node2.inPort)
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
