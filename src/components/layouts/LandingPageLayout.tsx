import React, { useState } from 'react'
import Navbar from '@/components/global/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../global/Footer'

const LandingPageLayout: React.FC = () => {
  let [_isSidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
    <>
      <Navbar
        onMobMenuClick={() => setSidebarOpen((_isSidebarOpen = true))}
        isLandingPage
      />
      <main className="pt-28 pr-6 pl-6 text-left">
        <Outlet />
      </main>
      <footer className="pt-14 px-6 text-left">
        <Footer isLandingPage />
      </footer>
    </>
  )
}

export default LandingPageLayout
