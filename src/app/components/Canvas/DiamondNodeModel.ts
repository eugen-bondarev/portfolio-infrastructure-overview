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
  public inPort: any
  public outPort: any

  constructor() {
    super({
      type: 'diamond',
    })
    this.inPort = this.addPort(new DiamondPortModel(PortModelAlignment.TOP))
    // this.addPort(new DiamondPortModel(PortModelAlignment.LEFT))
    this.outPort = this.addPort(new DiamondPortModel(PortModelAlignment.BOTTOM))
    // this.addPort(new DiamondPortModel(PortModelAlignment.RIGHT))
  }
}
