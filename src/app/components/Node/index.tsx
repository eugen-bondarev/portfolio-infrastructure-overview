import Image from 'next/image'
import clsx from 'clsx'

interface NodeProps {
  className?: string
  icon?: string
  title?: string
  description?: string
  id?: string
}

const Node = ({ className, id, icon, title, description }: NodeProps) => {
  return (
    <div
      id={id}
      className={clsx(
        className,
        'bg-slate-200 p-8 flex flex-col rounded-xl text-slate-900 w-[400px] gap-4'
      )}
    >
      <div className="flex gap-4 items-center h-10">
        {icon ? <Image src={icon} width={48} height={48} alt="Icon" /> : null}
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
      <p>{description}</p>
    </div>
  )
}

export default Node
