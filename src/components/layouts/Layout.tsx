import React, { useState } from 'react'
import Navbar from '@/components/global/Navbar'
import Sidebar from '@/components/global/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../global/Footer'

const Layout: React.FC = () => {
  let [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
    <>
      <header className="fixed inset-y-0 left-0 z-40 contents w-72 overflow-y-auto border-r border-zinc-900/10 dark:border-white/10 lg:block xl:w-80">
        <Navbar onMobMenuClick={() => setSidebarOpen((isSidebarOpen = true))} />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onCrossClick={() => setSidebarOpen((isSidebarOpen = false))}
        />
      </header>
      <main className="pt-28 pr-6 lg:pl-[350px] pl-6 text-left">
        <Outlet />
      </main>
      <footer className="pt-14 pr-6 lg:pl-[350px] pl-6 text-left">
        <Footer />
      </footer>
    </>
  )
}

export default Layout
