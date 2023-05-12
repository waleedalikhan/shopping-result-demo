import React, { useState } from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import FileInput from '@/components/global/FileInput'
import BtnWithAnimation from '@/components/global/BtnWithAnimation'
import { HOST_NAME } from '@/constants'

type Props = {
  language?: string
  marketPlace?: string
  toneOfVoice?: string
  onGenerateClick?: () => void
  isLandingPage?: boolean
}

const UploadCSVFile: React.FC<Props> = ({
  language,
  toneOfVoice,
  marketPlace,
  onGenerateClick,
  isLandingPage,
}) => {
  const http = Axios
  let [CSVEans, setCSVEans] = useState<string[]>([])

  const getCSVEans = (eans: string[]) => setCSVEans((CSVEans = eans))

  const generateCSVData = async () => {
    if (isLandingPage) {
      onGenerateClick && onGenerateClick()
    } else {
      let formData = {
        batch_token: uuidv4(),
        country: null,
        ean: CSVEans,
        languages: language,
        marketplace: marketPlace,
        ton_of_voice: toneOfVoice,
      }
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      }
      try {
        const res = await http.post(`${HOST_NAME}/api/store-eans`, formData, {
          headers: headers,
        })
        console.log(res)
        onGenerateClick && onGenerateClick()
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="relative text-dark-bg dark:text-white mb-10">
            <h1 className="font-semibold text-xl">Upload CSV file</h1>

            <p className="font-light mb-1 mt-2 text-dark-bg dark:text-white">
              Upload a CSV file to get details of multiple products using EANs
            </p>
          </div>
        </div>
        <div className="w-full mb-6">
          <FileInput onFileUpload={getCSVEans} />
        </div>
        {CSVEans.length !== 0 && (
          <div className="w-full">
            <div className="sm:w-1/4">
              <BtnWithAnimation type="button" onClick={generateCSVData}>
                Generate
              </BtnWithAnimation>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UploadCSVFile
