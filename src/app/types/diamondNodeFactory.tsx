import DiamondNodeWidget from '@/app/components/Node'
import { DiamondNodeModel } from './diamondNodeModel'
import * as React from 'react'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'

export class DiamondNodeFactory extends AbstractReactFactory<
  DiamondNodeModel<any>,
  DiagramEngine
> {
  constructor() {
    super('diamond')
  }

  generateReactWidget(event: any): JSX.Element {
    return <DiamondNodeWidget engine={this.engine} node={event.model} />
  }

  generateModel(event: any) {
    return new DiamondNodeModel<any>({})
  }
}
