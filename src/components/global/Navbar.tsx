import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { toast } from 'react-toastify'
import cn from 'classnames'

import {
  DarkModeIcon,
  LightModeIcon,
  SearchIcon,
} from '@/components/global/Icons'
import Logo from '@/assets/logo.svg'
import LogoDark from '@/assets/logo-dark.svg'
import LoginBox from '@/components/auth/LoginBox'
import ForgotPasswordBox from '@/components/auth/ForgotPasswordBox'
import SignupBox from '@/components/auth/SignupBox'
import { useAuth } from '@/context/auth'
import { HOST_NAME } from '@/constants'
import PriceBox from '@/components/popups/PriceBox'

type Props = {
  onMobMenuClick?: () => void
  isLandingPage?: boolean
}

const Navbar: React.FC<Props> = ({ onMobMenuClick, isLandingPage }) => {
  const http = Axios
  let { token, setToken } = useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const [showSignup, setShowSignup] = useState<boolean>(false)
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false)
  const [showPricing, setShowPricing] = useState<boolean>(false)
  let [userEmail, setUserEmail] = useState<string>('')

  const toggleDarkMode = () => {
    let appLogo = document.getElementById('logo')
    let appLogoMob = document.getElementById('logo-mob')
    let appLogoHome = document.getElementById('logo-home')
    document.documentElement.classList.toggle('dark')

    if (document.getElementsByTagName('html')[0]?.classList.contains('dark')) {
      appLogo?.setAttribute('src', LogoDark)
      appLogoMob?.setAttribute('src', LogoDark)
      appLogoHome?.setAttribute('src', LogoDark)
    } else {
      appLogo?.setAttribute('src', Logo)
      appLogoMob?.setAttribute('src', Logo)
      appLogoHome?.setAttribute('src', Logo)
    }
  }

  const handleLogout = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
    const data = {}
    try {
      let res = await http.post(`${HOST_NAME}/api/logout`, data, {
        headers: headers,
      })
      console.log(res.data)
      localStorage.removeItem('accessToken')
      if (setToken) {
        setToken((token = ''))
      }
      toast('Logout Successful')
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }

  const handlePricing = () => {
    if (isLoggedIn) {
      setShowPricing(true)
    } else {
      setShowPricing(false)
      setShowLogin(true)
    }
  }

  const getUserInfo = async () => {
    const formData = {
      load: true,
      user_id: localStorage.getItem('accessToken'),
    }
    const headers = {
      Authorization: `Bearer ${formData.user_id}`,
    }

    const res = await http.post(`${HOST_NAME}/api/get-my-details`, formData, {
      headers: headers,
    })

    setUserEmail((userEmail = res.data.data.users.email))
  }

  useEffect(() => {
    if (localStorage.getItem('accessToken') || token) {
      setIsLoggedIn(true)
      getUserInfo()
    } else {
      setIsLoggedIn(false)
    }
    let appLogo = document.getElementById('logo')
    let appLogoMob = document.getElementById('logo-mob')
    let appLogoHome = document.getElementById('logo-home')

    if (document.getElementsByTagName('html')[0]?.classList.contains('dark')) {
      appLogo?.setAttribute('src', LogoDark)
      appLogoMob?.setAttribute('src', LogoDark)
      appLogoHome?.setAttribute('src', LogoDark)
    } else {
      appLogo?.setAttribute('src', Logo)
      appLogoMob?.setAttribute('src', Logo)
      appLogoHome?.setAttribute('src', Logo)
    }
  }, [])

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 backdrop-blur-sm dark:backdrop-blur bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]',
          {
            'lg:left-72 xl:left-80': !isLandingPage,
            'left-0': isLandingPage,
          },
        )}
        style={{
          // @ts-ignore
          '--bg-opacity-light': 0.5,
          '--bg-opacity-dark': 0.2,
        }}
      >
        <div className="absolute inset-x-0 top-full h-px transition bg-zinc-900/7.5 dark:bg-white/7.5"></div>
        <div className="lg:flex hidden items-center space-x-4">
          {!isLoggedIn && (
            <a>
              <Link to="/">
                <img
                  className="h-8 w-auto sm:mx-auto"
                  src={Logo}
                  alt="Logo"
                  id="logo-home"
                />
              </Link>
            </a>
          )}
          <div className="hidden lg:block lg:max-w-md lg:flex-auto">
            <button
              type="button"
              className="lg:flex hidden gap-2 lg:w-[400px] bg-light-gray dark:bg-dark-bg h-12 rounded-lg items-center px-4 justify-between"
            >
              <div className="flex space-x-2 items-center text-zinc-500">
                <SearchIcon />
                <input
                  type="text"
                  className="outline-none focus:outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 bg-transparent border-0 p-0 text-base font-light"
                  placeholder="Find something..."
                />
              </div>
              <div>
                <kbd className="ml-auto text-2xs text-zinc-400 dark:text-dark-bg flex space-x-1 bg-white dark:bg-zinc-500 p-1 rounded-lg">
                  <kbd>Ctrl</kbd>
                  <kbd>K</kbd>
                </kbd>
              </div>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-5 lg:hidden">
          {!isLandingPage && (
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
              aria-label="Toggle navigation"
              onClick={onMobMenuClick}
            >
              <svg
                viewBox="0 0 10 9"
                fill="none"
                strokeLinecap="round"
                aria-hidden="true"
                className="w-2.5 stroke-zinc-900 dark:stroke-white"
              >
                <path d="M.5 1h9M.5 8h9M.5 4.5h9"></path>
              </svg>
            </button>
          )}
          <a>
            <Link to="/">
              <img
                className="h-8 w-auto sm:mx-auto"
                src={Logo}
                alt="Logo"
                id="logo-mob"
              />
            </Link>
          </a>
        </div>
        <div className="flex items-center gap-5">
          <nav className="hidden md:block">
            <ul role="list" className="flex items-center gap-8">
              <li>
                <span>
                  <a
                    className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    href="#"
                    onClick={handlePricing}
                  >
                    Pricing
                  </a>
                </span>
              </li>
              <li>
                <a
                  className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="../src/#"
                >
                  <Link to="/pricing">Plans</Link>
                </a>
              </li>
              {isLoggedIn && (
                <li>
                  <a
                    className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    href="../src/#"
                  >
                    <Link to="/profile">{userEmail}</Link>
                  </a>
                </li>
              )}
            </ul>
          </nav>
          <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>
          <div className="flex md:gap-4">
            <div className="contents lg:hidden">
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 lg:hidden focus:[&:not(:focus-visible)]:outline-none cursor-pointer"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className="h-5 w-5 stroke-zinc-900 dark:stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
                  ></path>
                </svg>
              </button>
            </div>
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
              aria-label="Toggle dark mode"
              onClick={() => toggleDarkMode()}
            >
              <LightModeIcon />
              <DarkModeIcon />
            </button>
          </div>

          <div>
            {isLoggedIn ? (
              <span>
                <a
                  title="Logout"
                  className="text-primary dark:text-secondary cursor-pointer"
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </a>
              </span>
            ) : (
              <span>
                <button
                  type="button"
                  className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition-all ease-in-out duration-300 rounded-full bg-primary hover:bg-opacity-70 hover:dark:bg-opacity-70 py-1 px-3 text-white dark:bg-secondary truncate"
                  onClick={() => setShowLogin(true)}
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>
      </nav>
      {showLogin && (
        <LoginBox
          onCancelClick={() => setShowLogin(false)}
          onSignupClick={() => {
            setShowLogin(false)
            setShowForgotPassword(false)
            setShowSignup(true)
          }}
          onForgotPasswordClick={() => {
            setShowLogin(false)
            setShowSignup(false)
            setShowForgotPassword(true)
          }}
          onLoginSuccess={() => {
            if (window.location.pathname === '/') {
              window.location.href = '/start'
            }
            setShowLogin(false)
          }}
        />
      )}
      {showSignup && (
        <SignupBox
          onSigninClick={() => {
            setShowSignup(false)
            setShowLogin(true)
          }}
          onSignupSuccess={() => setShowSignup(false)}
        />
      )}
      {showForgotPassword && (
        <ForgotPasswordBox
          onCancelClick={() => setShowForgotPassword(false)}
          onSignupClick={() => {
            setShowForgotPassword(false)
            setShowSignup(true)
          }}
          onForgotPasswordSuccess={() => setShowForgotPassword(false)}
        />
      )}
      {showPricing && <PriceBox onCancelClick={() => setShowPricing(false)} />}
    </>
  )
}

export default Navbar
