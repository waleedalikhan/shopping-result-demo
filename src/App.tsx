import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from '@/pages/Home'
import LiveSearchPage from '@/pages/LiveSearchPage'
import Layout from '@/components/layouts/Layout'
import { AuthProvider } from '@/context/auth'
import HistoryPage from '@/pages/HistoryPage'
import './App.css'
import LandingPageLayout from '@/components/layouts/LandingPageLayout'
import ProfilePage from '@/pages/ProfilePage'
import DocPage from '@/pages/DocPage'
import PricingPage from '@/pages/PricingPage'

const App: React.FC = () => {
  return (
    <div className="bg-light-gray dark:bg-[#18181b] min-h-screen absolute inset-x-0 top-0">
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route element={<LandingPageLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/start" element={<LiveSearchPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/documentation" element={<DocPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
