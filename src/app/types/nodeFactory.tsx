import Node from '@/app/components/Node'
import { NodeModel } from './nodeModel'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'

export class NodeFactory extends AbstractReactFactory<
  NodeModel<any>,
  DiagramEngine
> {
  constructor() {
    super('diamond')
  }

  generateReactWidget(event: any): JSX.Element {
    return <Node engine={this.engine} node={event.model} />
  }

  generateModel(event: any) {
    return new NodeModel<any>({})
  }
}
