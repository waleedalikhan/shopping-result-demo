import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import SidebarLink from '@/components/global/SidebarLink'
import { CrossIcon } from '@/components/global/Icons'
import Logo from '@/assets/logo.svg'
import { SIDEBAR_LINKS } from '@/constants'
import { ISidebarLink } from '@/interfaces'

type Props = {
  isSidebarOpen?: boolean
  onCrossClick?: () => void
}

const Sidebar: React.FC<Props> = ({ isSidebarOpen, onCrossClick }) => {
  const renderSidebarLinks = SIDEBAR_LINKS.map(
    (link: ISidebarLink, index: number) => {
      return (
        <React.Fragment key={`${link.id}${link.title}${index}`}>
          <li className="mb-4">
            <SidebarLink
              linkText={link.title}
              linkPath={link.path}
              linkIcon={<link.icon />}
            />
          </li>
        </React.Fragment>
      )
    },
  )

  return (
    <>
      <aside
        className={cn(
          'lg:block px-10 pb-10 pt-8 lg:static fixed lg:w-auto w-52 z-[9999999] bg-white dark:bg-dark-bg h-[90vh] lg:shadow-none shadow-lg lg:dark:shadow-none dark:shadow-white dark:shadow-glow lg:rounded-tr-none rounded-tr-3xl lg:rounded-br-none rounded-br-3xl lg:mt-0 mt-5 transition-all ease-in-out duration-300 lg:h-screen',
          {
            'left-0': isSidebarOpen,
            '-left-56': !isSidebarOpen,
          },
        )}
      >
        <div className="hidden lg:flex mb-8 border-b pb-5">
          <Link to="/start">
            <img
              className="h-12 w-auto sm:mx-auto"
              src={Logo}
              alt="Logo"
              id="logo"
            />
          </Link>
        </div>
        <ul role="list relative">
          <button
            className="absolute top-5 right-5 lg:hidden bg-transparent outline-none focus:outline-none text-primary dark:text-white"
            onClick={onCrossClick}
          >
            <CrossIcon />
          </button>
          <li className="relative mt-6 md:mt-0">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6 text-left">
              AI content
            </h2>
            <div className="relative mt-3">
              <ul role="list" className="border-l border-transparent">
                <div
                  style={{
                    transform: 'none',
                  }}
                ></div>
                {renderSidebarLinks}
              </ul>
            </div>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar
