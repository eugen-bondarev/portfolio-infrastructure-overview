import {
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
} from '@projectstorm/react-diagrams'
import { DiamondPortModel } from './DiamondPortModel'

export interface DiamondNodeModelGenerics {
  PORT: DiamondPortModel
}

export class DiamondNodeModel<T> extends NodeModel<
  NodeModelGenerics & DiamondNodeModelGenerics
> {
  public data: T

  constructor(data: T) {
    super({
      type: 'diamond',
    })
    this.addPort(new DiamondPortModel(PortModelAlignment.TOP))
    this.addPort(new DiamondPortModel(PortModelAlignment.BOTTOM))
    this.data = data
  }
}
