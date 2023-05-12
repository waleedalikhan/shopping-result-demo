import React from 'react'

type Props = {
  href: string
  children: any
  onClick?: () => void
}

const LinkWithoutIcon: React.FC<Props> = ({ href, children, onClick }) => {
  return (
    <>
      <a
        href={href}
        className="justify-center overflow-hidden text-sm font-medium transition text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500"
        onClick={onClick}
      >
        {children}
      </a>
    </>
  )
}

export default LinkWithoutIcon
