import {
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
} from '@projectstorm/react-diagrams'
import { DiamondPortModel } from './DiamondPortModel'

export interface DiamondNodeModelGenerics {
  PORT: DiamondPortModel
}

export class DiamondNodeModel extends NodeModel<
  NodeModelGenerics & DiamondNodeModelGenerics
> {
  private data: any | undefined

  constructor(data: any | undefined) {
    super({
      type: 'diamond',
    })
    this.addPort(new DiamondPortModel(PortModelAlignment.TOP))
    this.addPort(new DiamondPortModel(PortModelAlignment.BOTTOM))
    this.data = data
  }
}
