import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { v4 as uuid4 } from 'uuid'

import CardWrapper from '@/components/global/CardWrapper'
import EANGenerator from '@/components/global/EANGenerator'
import UploadCSVFile from '@/components/global/UploadCSVFile'
import ContentTable from '@/components/global/ContentTable'
import { HOST_NAME } from '@/constants'
import LoginBox from '@/components/auth/LoginBox'
import ForgotPasswordBox from '@/components/auth/ForgotPasswordBox'
import SignupBox from '@/components/auth/SignupBox'

type Props = {
  hasTable?: boolean
  isLandingPage?: boolean
}

const LiveSearch: React.FC<Props> = ({ hasTable = true, isLandingPage }) => {
  const http = Axios
  let [language, setLanguage] = useState<string>('')
  let [toneOfVoice, setToneOfVoice] = useState<string>('')
  let [marketPlace, setMarketPlace] = useState<string>('')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const [showSignup, setShowSignup] = useState<boolean>(false)
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false)

  useEffect(() => {
    const getRealTimeData = async () => {
      const formData = {
        ean: true,
        batch_token: uuid4(),
      }
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
      try {
        const res = await http.post(
          `${HOST_NAME}/api/get-eans-refresh`,
          formData,
          {
            headers: headers,
          },
        )
        console.log(res)
      } catch (err) {
        console.error(err)
      }
    }
    getRealTimeData()
    localStorage.hasOwnProperty('accessToken')
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false)
  }, [])

  return (
    <>
      <div>
        <CardWrapper>
          <div className="mx-auto space-y-10 pb-10 w-full">
            <div className="flex">
              <div className="flex w-full flex-wrap">
                <div className="relative text-dark-bg dark:text-white mb-5 w-full">
                  <h1 className="font-semibold text-xl">
                    Create product content
                  </h1>
                  <p className="font-light mb-1 mt-2 text-dark-bg dark:text-white">
                    AI-powered content generation using unique product
                    identifiers. Fast, accurate, and engaging e-commerce content
                  </p>
                </div>
                <div className="w-full">
                  <EANGenerator
                    getLanguage={setLanguage}
                    getToneOfVoice={setToneOfVoice}
                    getMarketPlace={setMarketPlace}
                    onGenerateClick={() => {
                      !isLoggedIn ? setShowLogin(true) : null
                    }}
                    isLandingPage={isLandingPage}
                  />
                </div>
                <div className="w-full text-center mt-10 before:content-[''] before:h-px before:w-1/2 before:bg-gray-400 relative before:absolute before:left-0 before:top-1/2 after:content-[''] after:h-px after:w-1/2 after:bg-gray-400 after:absolute after:right-0 after:top-1/2">
                  <h2 className="text-gray-400 dark:text-white uppercase bg-white dark:bg-dark-bg px-8 py-2 inline-block z-20 relative text-sm">
                    or
                  </h2>
                </div>
                <div className="w-full">
                  <UploadCSVFile
                    language={language}
                    toneOfVoice={toneOfVoice}
                    marketPlace={marketPlace}
                    onGenerateClick={() => {
                      !isLoggedIn ? setShowLogin(true) : null
                    }}
                    isLandingPage={isLandingPage}
                  />
                </div>
                <div className="w-full">
                  {hasTable && (
                    <ContentTable tableContent={[]} hasCheckboxes={false} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardWrapper>
      </div>
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
    </>
  )
}

export default LiveSearch
