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
      {/* <svg
          width={props.size}
          height={props.size}
          dangerouslySetInnerHTML={{
            __html:
              `
          <g id="Layer_1">
          </g>
          <g id="Layer_2">
            <polygon fill="mediumpurple" stroke="${
              props.node.isSelected() ? 'white' : '#000000'
            }" stroke-width="3" stroke-miterlimit="10" points="10,` +
              props.size / 2 +
              ` ` +
              props.size / 2 +
              `,10 ` +
              (props.size - 10) +
              `,` +
              props.size / 2 +
              ` ` +
              props.size / 2 +
              `,` +
              (props.size - 10) +
              ` "/>
          </g>
        `,
          }}
        /> */}
      <PortWidget
        style={{
          left: size.width / 2 - 8,
          top: -8,
          position: 'absolute',
        }}
        port={props.node.getPort(PortModelAlignment.TOP)}
        engine={props.engine}
      >
        <S.Port />
      </PortWidget>
      <PortWidget
        style={{
          left: size.width / 2 - 8,
          top: size.height - 8,
          position: 'absolute',
        }}
        port={props.node.getPort(PortModelAlignment.BOTTOM)}
        engine={props.engine}
      >
        <S.Port />
      </PortWidget>
    </div>
  )
}

export default DiamondNodeWidget
