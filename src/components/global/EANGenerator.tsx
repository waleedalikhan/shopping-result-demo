import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import { SearchIconSm } from '@/components/global/Icons'
import EANProductPopup from '@/components/popups/EANProductPopup'
import BtnWithAnimation from '@/components/global/BtnWithAnimation'
import { HOST_NAME } from '@/constants'
import Spinner from 'react-spinner-material'

type Props = {
  isLandingPage?: boolean
  onPopupClose?: () => void
  getLanguage?: (language: string) => void
  getToneOfVoice?: (toneOfVoice: string) => void
  getMarketPlace?: (marketPlace: string) => void
  onGenerateClick?: () => void
}

const EANGenerator: React.FC<Props> = ({
  isLandingPage,
  onPopupClose,
  getLanguage,
  getMarketPlace,
  getToneOfVoice,
  onGenerateClick,
}) => {
  const http = Axios
  let [eanCode, setEanCode] = useState<string>('')
  let [showProductPopup, setShowProductPopup] = useState<boolean>(false)
  let [isPopupLoading, setIsPopupLoading] = useState<boolean>(false)
  let [languages, setLanguages] = useState<string[]>([])
  let [language, setLanguage] = useState<string>('English')
  let [toneOfVoices, setToneOfVoices] = useState<string[]>([])
  let [tonOfVoice, setTonOfVoice] = useState<string>('Informational')
  let [marketPlaces, setMarketPlaces] = useState<string[]>([])
  let [marketPlace, setMarketPlace] = useState<string>('Amazon')
  let [accessToken, setAccessToken] = useState<string | null>('')
  let [imgUrl, setImgUrl] = useState<string>('')
  let [product, setProduct] = useState<any>()
  let [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setAccessToken((accessToken = localStorage.getItem('accessToken')))
    getLanguage && getLanguage(language)
    getToneOfVoice && getToneOfVoice(tonOfVoice)
    getMarketPlace && getMarketPlace(marketPlace)
    const loadFieldsData = async () => {
      const formData = {
        isLoad: true,
      }
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }

      try {
        const res = await http.post(`${HOST_NAME}/api/gpt_language`, formData, {
          headers: headers,
        })
        setLanguages((languages = res.data.language_list))
        try {
          const res = await http.post(
            `${HOST_NAME}/api/gpt_ton_of_voice_options`,
            {
              ...formData,
              language: language,
            },
          )
          setToneOfVoices((toneOfVoices = res.data.load_ton_of_voice))
          try {
            const res = await http.post(
              `${HOST_NAME}/api/load-gs-country`,
              formData,
              {
                headers: headers,
              },
            )
            let marketPlaceData = Object.keys(res.data.marketplace)
            setMarketPlaces((marketPlaces = marketPlaceData))
          } catch (err) {
            console.error(err)
            setIsLoading(false)
          }
        } catch (err) {
          console.log(err)
          setIsLoading(false)
        }
      } catch (err) {
        console.error(err)
        setIsLoading(false)
      }
      setIsLoading(false)
    }
    loadFieldsData()
  }, [])

  const updateToneOfVoices = async (language: string) => {
    const formData = {
      isLoad: true,
      language: language,
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
    try {
      const res = await http.post(
        `${HOST_NAME}/api/gpt_ton_of_voice_options`,
        formData,
        {
          headers: headers,
        },
      )
      setToneOfVoices((toneOfVoices = res.data.load_ton_of_voice))
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (isLandingPage) {
      onGenerateClick && onGenerateClick()
    } else {
      setIsPopupLoading((isPopupLoading = true))
      setShowProductPopup((showProductPopup = true))
      let formData = {
        ean: eanCode,
        country: '',
        languages: language,
        ton_of_voice: tonOfVoice,
        marketplace: marketPlace,
      }
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      }

      try {
        const liveSearch = await http.post(
          `${HOST_NAME}/api/live-search`,
          {
            batchToken: uuidv4(),
            ...formData,
          },
          {
            headers: headers,
          },
        )
        try {
          // @ts-ignore
          const liveSearchProcess = await http.post(
            `${HOST_NAME}/api/live-search-process`,
            {
              id: liveSearch.data.id,
              ...formData,
            },
            {
              headers: headers,
            },
          )
          try {
            const displayProductInfo = await http.post(
              `${HOST_NAME}/api/display-product-info`,
              {
                id: liveSearch.data.id,
              },
              {
                headers: headers,
              },
            )
            const formattedData = JSON.parse(displayProductInfo.data.gpt_data)
            const formattedFullRes = JSON.parse(
              displayProductInfo.data.full_response,
            )
            setImgUrl((imgUrl = formattedFullRes.imageUrl))
            setProduct((product = formattedData))
            console.log(formattedData)
            console.log(formattedFullRes)
            setIsPopupLoading((isPopupLoading = false))
          } catch (err) {
            console.error('display product info error =====>>>>', err)
          }
        } catch (err) {
          console.error('live search process error ====>>>>', err)
        }
      } catch (err) {
        console.error('live search error ===>>>', err)
      }
    }
  }

  const closePopup = () => {
    setShowProductPopup((showProductPopup = false))
    onPopupClose && onPopupClose()
  }

  const calcHeight = (value: any) => {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length
    let newHeight = 20 + numberOfLineBreaks * 25 + 12 + 2

    return newHeight
  }

  const resizeTextArea = () => {
    const textArea = document.getElementById('ean-text-area')
    // @ts-ignore
    textArea.style.height = textArea && `${calcHeight(textArea.value)}px`
  }

  const renderToneOfVoices = toneOfVoices.map(
    (toneOfVoice: string, index: number) => {
      return (
        <React.Fragment key={`${toneOfVoice}${index}`}>
          <option value={toneOfVoice}>{toneOfVoice}</option>
        </React.Fragment>
      )
    },
  )

  return (
    <>
      {isLoading ? (
        <>
          <div className="py-8">
            <Spinner
              size={120}
              color={
                document.documentElement.classList.toggle('dark')
                  ? '#FF446C'
                  : '#26005b'
              }
              width={2}
              visible={true}
            />
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5 flex-wrap justify-between">
            <div className="w-full flex flex-wrap items-end gap-4">
              <div className="flex items-start flex-1 border md:w-1/3">
                <div className="w-8 h-8 flex pt-1.5 items-start justify-center">
                  <SearchIconSm />
                </div>
                <div className="w-full">
                  <textarea
                    name="ean"
                    id="ean-text-area"
                    cols={30}
                    rows={1}
                    className="text-primary dark:text-white w-full outline-none focus:outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 border-0 bg-transparent overflow-hidden"
                    placeholder="Find EAN..."
                    required
                    value={eanCode}
                    onChange={(e: any) =>
                      setEanCode((eanCode = e.target.value))
                    }
                    onKeyUp={resizeTextArea}
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:w-2/3 w-full">
                <div className="flex flex-col">
                  <label
                    htmlFor="language"
                    className="font-light text-xs mb-1 text-dark-bg dark:text-white"
                  >
                    Select language
                  </label>
                  <select
                    name="language"
                    id="language"
                    className="border-primary dark:border-white shadow-none outline-none focus:outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 cursor-pointer bg-transparent text-primary dark:text-white text-sm"
                    value={language}
                    onChange={(e: any) => {
                      setLanguage((language = e.target.value))
                      getLanguage && getLanguage(language)
                      updateToneOfVoices(language)
                    }}
                    required
                  >
                    {languages.map((language: string, index: number) => {
                      return (
                        <React.Fragment key={`${language}${index}`}>
                          <option value={language}>{language}</option>
                        </React.Fragment>
                      )
                    })}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="tonOfVoice"
                    className="font-light text-xs mb-1 text-dark-bg dark:text-white"
                  >
                    Select Tone of Voice
                  </label>
                  <select
                    name="tonOfVoice"
                    id="tonOfVoice"
                    className="border-primary dark:border-white shadow-none outline-none focus:outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 cursor-pointer bg-transparent text-primary dark:text-white text-sm"
                    value={tonOfVoice}
                    onChange={(e: any) => {
                      setTonOfVoice((tonOfVoice = e.target.value))
                      getToneOfVoice && getToneOfVoice(tonOfVoice)
                    }}
                    required
                  >
                    {renderToneOfVoices}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="marketPlace"
                    className="font-light text-xs mb-1 text-dark-bg dark:text-white"
                  >
                    Select Marketplace
                  </label>
                  <select
                    name="marketPlace"
                    id="marketPlace"
                    className="border-primary dark:border-white shadow-none outline-none focus:outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 cursor-pointer bg-transparent text-primary dark:text-white text-sm"
                    value={marketPlace}
                    onChange={(e: any) => {
                      setMarketPlace((marketPlace = e.target.value))
                      getMarketPlace && getMarketPlace(marketPlace)
                    }}
                    required
                  >
                    {marketPlaces.map((marketplace: string, index: number) => {
                      return (
                        <React.Fragment key={`${marketplace}${index}`}>
                          <option value={marketplace}>{marketplace}</option>
                        </React.Fragment>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="sm:w-1/4">
                <BtnWithAnimation type="submit">Generate</BtnWithAnimation>
              </div>
            </div>
          </div>
        </form>
      )}
      {showProductPopup && (
        <EANProductPopup
          eanCode={eanCode}
          isLoading={isPopupLoading}
          closePopup={() => closePopup()}
          language={language}
          tonOfVoice={tonOfVoice}
          product={product}
          imgUrl={imgUrl}
        />
      )}
    </>
  )
}

export default EANGenerator
