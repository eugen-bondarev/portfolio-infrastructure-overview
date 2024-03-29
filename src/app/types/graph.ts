export interface Node<T> {
  id: string
  position: [number, number]
  locked?: boolean
  data: T
}

export interface Edge {
  target: string
  source: string
}

interface Graph<T> {
  nodes: Node<T>[]
  edges: Edge[]
}

export default Graph
