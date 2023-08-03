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

const Port = ({ children }: any) => (
  <div
    style={{
      // width: `${16}px`,
      // height: `${16}px`,
      zIndex: 10,
      // background: 'green',
      borderRadius: `${10}px`,
      cursor: 'pointer',
    }}
    className="w-8 h-2 bg-lime-500 transform translate-y-1"
  >
    {children}
  </div>
)

const DiamondNodeWidget = (props: any) => {
  const size = {
    width: 200,
    height: 100,
  }

  return (
    <div
      className={'diamond-node'}
      style={{
        position: 'relative',
        width: size.width,
        height: size.height,
      }}
    >
      <div className="w-[200px] h-[100px] bg-slate-200 shadow-md rounded-md"></div>
      <PortWidget
        style={{
          left: size.width / 2 - 16,
          top: -8,
          position: 'absolute',
        }}
        port={props.node.getPort(PortModelAlignment.TOP)}
        engine={props.engine}
      >
        <Port />
      </PortWidget>
      <PortWidget
        style={{
          left: size.width / 2 - 16,
          top: size.height - 8,
          position: 'absolute',
        }}
        port={props.node.getPort(PortModelAlignment.BOTTOM)}
        engine={props.engine}
      >
        <Port />
      </PortWidget>
    </div>
  )
}

export default DiamondNodeWidget
