import {
  LinkModel,
  PortModel as GeneralPortModel,
  DefaultLinkModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams'

export class PortModel extends GeneralPortModel {
  constructor(alignment: PortModelAlignment) {
    super({
      type: 'diamond',
      name: alignment,
      alignment: alignment,
    })
  }

  createLinkModel(): LinkModel {
    return new DefaultLinkModel()
  }
}
