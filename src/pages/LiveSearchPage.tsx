import LiveSearch from '@/components/LiveSearch/LiveSearch'
import React, { useEffect } from 'react'

const Home: React.FC = () => {
  useEffect(() => {
    if (!localStorage.hasOwnProperty('accessToken')) {
      window.location.href = '/'
    }
  }, [localStorage.getItem('accessToken')])

  return (
    <>
      <LiveSearch />
    </>
  )
}

export default Home
