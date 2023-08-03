import {
  NodeModel as GeneralNodeModel,
  NodeModelGenerics,
  PortModelAlignment,
} from '@projectstorm/react-diagrams'
import { PortModel } from './portModel'

export interface DiamondNodeModelGenerics {
  PORT: PortModel
}

export class NodeModel<T> extends GeneralNodeModel<
  NodeModelGenerics & DiamondNodeModelGenerics
> {
  public data: T

  constructor(data: T) {
    super({
      type: 'diamond',
    })
    this.addPort(new PortModel(PortModelAlignment.TOP))
    this.addPort(new PortModel(PortModelAlignment.BOTTOM))
    this.data = data
  }
}
