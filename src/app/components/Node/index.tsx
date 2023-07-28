import Image from 'next/image'

interface NodeProps {
  icon?: string
  title?: string
  description?: string
}

const Node = ({ icon, title, description }: NodeProps) => {
  return (
    <div className="bg-slate-200 p-8 flex flex-col rounded-xl text-slate-900 max-w-[25rem] gap-4">
      <div className="flex gap-4 items-center h-10">
        {icon ? <Image src={icon} width={48} height={48} alt="Icon" /> : null}
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
      <p>{description}</p>
    </div>
  )
}

export default Node
