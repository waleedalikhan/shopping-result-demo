import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

type Props = {
  linkPath: string
  linkText?: string
  linkIcon?: any
}

const SidebarLink: React.FC<Props> = ({ linkPath, linkText, linkIcon }) => {
  const [state, setState] = useState<any>({ value: 10 })

  const forceUpdate = () =>
    setState((prev: any) => {
      return { ...prev }
    })

  useEffect(() => {
    console.log(window.location.pathname, linkPath)
  }, [state])

  return (
    <>
      <span onClick={forceUpdate}>
        <Link to={linkPath}>
          <a
            className={cn(
              'flex justify-between gap-2 py-1 pr-3 text-sm transition-all ease-in-out duration-300 pl-4 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
              {
                'border-l-4 border-l-primary dark:border-l-secondary':
                  window.location.pathname === linkPath,
              },
            )}
          >
            <span className="truncate flex">
              <div className="mr-4">{linkIcon}</div>
              {linkText}
            </span>
          </a>
        </Link>
      </span>
    </>
  )
}

export default SidebarLink
