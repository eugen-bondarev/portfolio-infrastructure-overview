'use client'
import createEngine, {
  DefaultLinkModel,
  DiagramModel,
  PortModelAlignment,
  RightAngleLinkFactory,
} from '@projectstorm/react-diagrams'

import { DiamondNodeFactory } from '@/app/types/diamondNodeFactory'
import { DiamondNodeModel } from '@/app/types/diamondNodeModel'
import Graph from '@/app/types/graph'
import { useMemo } from 'react'

const createMyEngine = <T>(graph: Graph<T>) => {
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

const useEngine = <T>(graph: Graph<T>) => {
  const engine = useMemo(() => createMyEngine(graph), [])
  return engine
}

export default useEngine
