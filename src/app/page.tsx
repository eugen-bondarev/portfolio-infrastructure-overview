'use client'
import Node from './components/Node'
import { useLayoutEffect, useState } from 'react'
import Image from 'next/image'

const useElements = ({
  fromSelector,
  toSelector,
}: {
  fromSelector: string
  toSelector: string
}) => {
  const [from, setFrom] = useState<HTMLElement | undefined>()
  const [to, setTo] = useState<HTMLElement | undefined>()

  useLayoutEffect(() => {
    if (from && to) {
      return
    }
    const timeoutId = setTimeout(() => {
      setFrom(
        (document.querySelector(fromSelector) as HTMLElement) || undefined
      )
      setTo((document.querySelector(toSelector) as HTMLElement) || undefined)
    }, 10)
    return () => clearTimeout(timeoutId)
  }, [fromSelector, toSelector])

  return { from, to }
}

interface ConnectionProps {
  from: string
  to: string
}

const toDeg = (rad: number) => (rad * 180) / Math.PI

const Connection = ({
  from: fromSelector,
  to: toSelector,
}: ConnectionProps) => {
  const { from, to } = useElements({ fromSelector, toSelector })

  if (!from || !to) {
    return
  }

  const start = {
    x: from.offsetLeft + from.clientWidth / 2,
    y: from.offsetTop + from.clientHeight,
  }

  const end = {
    x: to.offsetLeft + to.clientWidth / 2,
    y: to.offsetTop,
  }

  const angleRad = Math.atan2(end.y - start.y, end.x - start.x)
  const angle = -toDeg(angleRad)
  const rotation = angle === -90 ? 0 : angle

  const length = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  )

  return (
    <div
      className="absolute w-1 bg-slate-200"
      style={{
        left: `${start.x}px`,
        top: `${start.y}px`,
        height: `${length}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    ></div>
  )
}

export default function Home() {
  return (
    <div className="flex items-center p-20 flex-col gap-[4rem]">
      <Image src="schema.svg" width={2000} height={2000} alt="Icon" />
      {/* <Connection from="#a" to="#b" />
      <Connection from="#b" to="#c" />
      <Connection from="#c" to="#d" />
      <Node
        id="a"
        icon="icons/Chrome.svg"
        title="Browser"
        description="Request to *.eugen-bondarev.com"
      />
      <Node
        id="b"
        icon="icons/Google.svg"
        title="Google Cloud DNS"
        description="Traffic is redirected to 143.42.223.193"
        // className="ml-[200px]"
      />
      <Node
        id="c"
        icon="icons/Linode.svg"
        title="Linode Load Balancer"
        description="Traffic is redirected to ingress inside the k8s cluster"
      />
      <Node
        id="d"
        icon="icons/Ingress.svg"
        title="Ingress"
        description="Traffic is redirected to one of the subdomains of eugen-bondarev.com"
      /> */}
    </div>
  )
}
