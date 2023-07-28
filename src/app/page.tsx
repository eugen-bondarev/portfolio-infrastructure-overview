import Node from './components/Node'

export default function Home() {
  return (
    <div>
      <Node
        icon="icons/Chrome.svg"
        title="Browser"
        description="Request to *.eugen-bondarev.com"
      />
      <Node
        icon="icons/Google.svg"
        title="Google Cloud DNS"
        description="Traffic is redirected to 143.42.223.193"
      />
      <Node
        icon="icons/Linode.svg"
        title="Linode Load Balancer"
        description="Traffic is redirected to ingress inside the k8s cluster"
      />
      <Node
        icon="icons/Ingress.svg"
        title="Ingress"
        description="Traffic is redirected to one of the subdomains of eugen-bondarev.com"
      />
    </div>
  )
}
