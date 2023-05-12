import React, { useEffect } from 'react'
import HomePage from '@/components/Home/Home'

const Home: React.FC = () => {
  useEffect(() => {
    if (localStorage.hasOwnProperty('accessToken')) {
      window.location.href = '/start'
    }
  }, [localStorage.getItem('accessToken')])

  return (
    <>
      <HomePage />
    </>
  )
}

export default Home
