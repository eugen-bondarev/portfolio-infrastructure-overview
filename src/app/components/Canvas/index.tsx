'use client'
import { CanvasWidget } from '@projectstorm/react-canvas-core'
import NodeData from '@/app/types/nodeData'
import Graph from '@/app/types/graph'
import useEngine from '@/app/util/hooks/useEngine'

const middle = (window.innerWidth - 200) / 2
const startHeight = 100

const graph: Graph<NodeData> = {
  nodes: [
    {
      id: 'Terraform',
      position: [middle - 475, startHeight + 460],
      data: {
        forceWidth: 1300,
        forceHeight: 1400,
        icon: 'icons/Terraform.svg',
        title: 'Terraform',
        forceColor: '#fafbfc',
        // description: 'Request to *.eugen-bondarev.com',
      },
    },
    {
      id: 'Browser',
      position: [middle, startHeight],
      data: {
        icon: 'icons/Chrome.svg',
        title: 'Browser',
        description: 'Request to *.eugen-bondarev.com',
      },
    },
    {
      id: 'Google Cloud DNS',
      position: [middle - 100, startHeight + 250],
      data: {
        icon: 'icons/Google.svg',
        title: 'Google Cloud DNS',
        description: 'Traffic is redirected to 143.42.223.193',
      },
    },
    {
      id: 'Linode',
      position: [middle + 100, startHeight + 250 * 2],
      data: {
        icon: 'icons/Linode.svg',
        title: 'Linode Load Balancer',
        description: 'Traffic is redirected to ingress inside the k8s cluster',
      },
    },
    {
      id: 'Ingress',
      position: [middle - 100, startHeight + 250 * 3],
      data: {
        icon: 'icons/Ingress.svg',
        title: 'Ingress',
        description:
          'Traffic is redirected to one of the subdomains of eugen-bondarev.com',
      },
    },
    {
      id: 'pipelines',
      position: [middle - 400, startHeight + 250 * 4],
      data: {
        description: 'https://pipelines.eugen-bondarev.com',
      },
    },
    {
      id: 'portfolio',
      position: [middle, startHeight + 250 * 4],
      data: {
        description: 'https://eugen-bondarev.com',
      },
    },
    {
      id: 'metrics',
      position: [middle + 400, startHeight + 250 * 4],
      data: {
        description: 'https://metrics.eugen-bondarev.com',
      },
    },
    {
      id: 'Nginx',
      position: [middle, startHeight + 250 * 5],
      data: {
        icon: 'icons/Nginx.svg',
        title: 'Nginx',
        description:
          'Traffic is redirected to the WordPress instance or handled directly in case of static files',
      },
    },
    {
      id: 'WordPress',
      position: [middle, startHeight + 250 * 6],
      data: {
        icon: 'icons/WordPress.svg',
        title: 'WordPress',
      },
    },
    {
      id: 'MySQL',
      position: [middle, startHeight + 250 * 7],
      data: {
        icon: 'icons/MySQL.svg',
        title: 'MySQL',
      },
    },
    {
      id: 'Jenkins',
      position: [middle - 400, startHeight + 250 * 5],
      data: {
        icon: 'icons/Jenkins.svg',
        title: 'Jenkins',
      },
    },
    {
      id: 'Grafana',
      position: [middle + 400, startHeight + 250 * 5],
      data: {
        icon: 'icons/Grafana.svg',
        title: 'Grafana',
      },
    },
    {
      id: 'Prometheus',
      position: [middle + 400, startHeight + 250 * 6],
      data: {
        icon: 'icons/Prometheus.svg',
        title: 'Prometheus',
        description: 'Metrics from the entire cluster get gathered',
      },
    },
  ],
  edges: [
    {
      source: 'Browser',
      target: 'Google Cloud DNS',
    },
    {
      source: 'Google Cloud DNS',
      target: 'Linode',
    },
    {
      source: 'Linode',
      target: 'Ingress',
    },
    ...['pipelines', 'portfolio', 'metrics'].map((target) => ({
      source: 'Ingress',
      target,
    })),
    {
      source: 'portfolio',
      target: 'Nginx',
    },
    {
      source: 'Nginx',
      target: 'WordPress',
    },
    {
      source: 'WordPress',
      target: 'MySQL',
    },
    {
      source: 'pipelines',
      target: 'Jenkins',
    },
    {
      source: 'metrics',
      target: 'Grafana',
    },
    {
      source: 'Grafana',
      target: 'Prometheus',
    },
  ],
}

const Canvas = () => {
  const engine = useEngine(graph)

  return (
    <div className="canvas-container">
      <CanvasWidget engine={engine} />
    </div>
  )
}

export default Canvas
