import * as React from 'react'
import { DiamondNodeModel } from './DiamondNodeModel'
import {
  DiagramEngine,
  PortModelAlignment,
  PortWidget,
} from '@projectstorm/react-diagrams'

export interface DiamondNodeWidgetProps {
  node: DiamondNodeModel
  engine: DiagramEngine
  size?: number
}

namespace S {
  export const Port = ({ children }: any) => (
    <div
      style={{
        width: `${16}px`,
        height: `${16}px`,
        zIndex: 10,
        background: 'green',
        borderRadius: `${10}px`,
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  )
}

export class DiamondNodeWidget extends React.Component<DiamondNodeWidgetProps> {
  render() {
    return (
      <div
        className={'diamond-node'}
        style={{
          position: 'relative',
          width: this.props.size,
          height: this.props.size,
        }}
      >
        <svg
          width={this.props.size}
          height={this.props.size}
          dangerouslySetInnerHTML={{
            __html:
              `
          <g id="Layer_1">
          </g>
          <g id="Layer_2">
            <polygon fill="mediumpurple" stroke="${
              this.props.node.isSelected() ? 'white' : '#000000'
            }" stroke-width="3" stroke-miterlimit="10" points="10,` +
              this.props.size / 2 +
              ` ` +
              this.props.size / 2 +
              `,10 ` +
              (this.props.size - 10) +
              `,` +
              this.props.size / 2 +
              ` ` +
              this.props.size / 2 +
              `,` +
              (this.props.size - 10) +
              ` "/>
          </g>
        `,
          }}
        />
        <PortWidget
          style={{
            left: this.props.size / 2 - 8,
            top: -8,
            position: 'absolute',
          }}
          port={this.props.node.getPort(PortModelAlignment.TOP)}
          engine={this.props.engine}
        >
          <S.Port />
        </PortWidget>
        <PortWidget
          style={{
            left: this.props.size / 2 - 8,
            top: this.props.size - 8,
            position: 'absolute',
          }}
          port={this.props.node.getPort(PortModelAlignment.BOTTOM)}
          engine={this.props.engine}
        >
          <S.Port />
        </PortWidget>
      </div>
    )
  }
}
