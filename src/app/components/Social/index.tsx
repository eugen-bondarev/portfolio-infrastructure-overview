import Image from 'next/image'
import { useState } from 'react'

const copyToClipBoard = (content: string) =>
  navigator.clipboard.writeText(content)

interface Link {
  url: string
  title: string
}

const Social = () => {
  const email = 'eug.bondarev@gmail.com'
  const [copyCounter, setCopyCounter] = useState(0)
  const copy = () => {
    copyToClipBoard(email)
    setCopyCounter((current) => current + 1)
    setTimeout(() => setCopyCounter((current) => current + 1), 1000)
  }
  const iconToShow = copyCounter % 2 === 0 ? 'Copy' : 'Checkmark'
  console.log({ copyCounter, iconToShow })

  const links: Link[] = [
    {
      url: 'https://github.com/eugen-bondarev',
      title: 'GitHub',
    },
    {
      url: 'https://eugen-bondarev.com',
      title: 'Portfolio',
    },
  ]

  return (
    <div className="absolute bottom-8 left-8 bg-white shadow-lg z-10 p-4 rounded-sm">
      <ul className="flex flex-col gap-2">
        {links.map((link, i) => (
          <li key={i}>
            <a
              className="underline hover:decoration-2"
              href={link.url}
              target="_blank"
            >
              {link.title}
            </a>
          </li>
        ))}

        <li className="flex gap-2 items-center">
          {email}
          <button onClick={copy}>
            <Image
              src={`icons/${iconToShow}.svg`}
              alt={'Copy'}
              width={24}
              height={24}
            />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Social
