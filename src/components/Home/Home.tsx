import React, { useEffect, useState } from 'react'
import CardWrapper from '@/components/global/CardWrapper'
import LiveSearch from '@/components/LiveSearch/LiveSearch'
import History from '@/components/History/History'
import { CrossIcon } from '@/components/global/Icons'

const HomePage: React.FC = () => {
  let [showIntro, setShowIntro] = useState<boolean>(true)

  const closeIntro = () => {
    setShowIntro(false)
    localStorage.setItem('saveIntro', 'true')
  }

  useEffect(() => {
    if (localStorage.hasOwnProperty('saveIntro')) setShowIntro(false)
  }, [])

  return (
    <>
      <div className="xl:container mx-auto xl:px-0 md:px-6 px-4 select-none">
        {showIntro && (
          <CardWrapper>
            <div className="relative w-full md:pt-0 pt-5">
              <button
                type="button"
                className="outline-none focus:outline-none bg-transparent absolute top-0 right-0 dark:text-white"
                onClick={closeIntro}
              >
                <CrossIcon />
              </button>
              <div className="w-full">
                <h2 className="font-semibold text-xl text-dark-bg dark:text-white">
                  Introducing GPTxt: AI-powered content generation using unique
                  product identifiers.
                </h2>
              </div>
              <div className="w-full my-10 flex flex-wrap gap-y-8 md:justify-between justify-center items-center">
                <div className="flex flex-col items-center space-y-3 w-56 md:mx-auto">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary dark:bg-secondary text-white">
                    1
                  </div>
                  <div>
                    <p className="font-light text-lg dark:text-white">
                      Enter EAN codes
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-3 w-56 md:mx-auto">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary dark:bg-secondary text-white">
                    2
                  </div>
                  <div>
                    <p className="font-light text-lg dark:text-white text-center">
                      Select language, tone of voice and marketplace
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-3 w-56 md:mx-auto">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary dark:bg-secondary text-white">
                    3
                  </div>
                  <div>
                    <p className="font-light text-lg dark:text-white text-center">
                      Relax and let GPTxt do the magic
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardWrapper>
        )}
        <div className="w-full">
          <LiveSearch hasTable={false} isLandingPage />
        </div>
        <div>
          <History />
        </div>
      </div>
    </>
  )
}

export default HomePage
