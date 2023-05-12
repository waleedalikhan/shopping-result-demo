import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { v4 as uuid4 } from 'uuid'
import Spinner from 'react-spinner-material'

import CardWrapper from '@/components/global/CardWrapper'
import ContentTable from '@/components/global/ContentTable'
import BtnWithAnimation from '@/components/global/BtnWithAnimation'
import { DownloadIcon } from '../global/Icons'
import { ITableData } from '@/interfaces'
import { HOST_NAME } from '@/constants'

const History: React.FC = () => {
  const http = Axios
  let [contentOverview, setContentOverview] = useState<any[]>([])
  let [_selectedContent, setSelectedContent] = useState<ITableData[]>([])
  let [isContentLoading, setContentLoading] = useState<boolean>(false)

  const selectAllContent = (e: any) => {
    let updatedContentOverview: any[] = [...contentOverview]
    if (e.target.checked) {
      updatedContentOverview.forEach(
        (content: ITableData) => (content.isChecked = true),
      )
      setSelectedContent((_selectedContent = updatedContentOverview))
    } else {
      updatedContentOverview.forEach(
        (content: ITableData) => (content.isChecked = false),
      )
      setSelectedContent((_selectedContent = []))
    }
    setContentOverview((contentOverview = updatedContentOverview))
  }

  const updateSelectedEntry = (index: number) => {
    let updatedContentOverview: any[] = [...contentOverview]
    updatedContentOverview[index].isChecked = !updatedContentOverview[index]
      .isChecked
    setContentOverview((contentOverview = updatedContentOverview))
  }

  const downloadContentCSV = async () => {
    let formData = {
      ean: 'all',
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
    try {
      const res = await http.post(`${HOST_NAME}/api/download-csv`, formData, {
        headers: headers,
      })
      const url = res.data.url
      const aLink = document.createElement('a')
      aLink.href = url
      document.body.appendChild(aLink)
      aLink.download = 'all-content.csv'
      aLink.click()
      document.body.removeChild(aLink)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const getContentHistory = async () => {
      setContentLoading((isContentLoading = true))
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }

        let res = await http.post(
          `${HOST_NAME}/api/get-all-eans-details`,
          {
            load: true,
            batch_token: uuid4(),
          },
          {
            headers: headers,
          },
        )
        let updatedHistory: any[] = res.data.server_data.data
        setContentOverview((contentOverview = updatedHistory))
      } catch (err) {
        console.log(err)
      }
      setContentLoading((isContentLoading = false))
    }
    getContentHistory()
  }, [])

  return (
    <>
      <CardWrapper>
        <div className="flex flex-wrap w-full">
          <div className="w-full mb-5">
            <div className="relative text-dark-bg dark:text-white">
              <h1 className="font-semibold text-xl">Content Overview</h1>
              <p className="font-light mb-5 mt-2">
                Content generated with gpt-3
              </p>
            </div>
          </div>
          {isContentLoading ? (
            <div className="w-full flex justify-center mb-6">
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
          ) : (
            <>
              <div className="w-full">
                <ContentTable
                  tableContent={contentOverview}
                  onHeaderCheck={selectAllContent}
                  onEntryCheck={updateSelectedEntry}
                />
              </div>
              <>
                <div className="mt-10 mb-5 flex ml-auto">
                  <BtnWithAnimation className="w-40 rounded-2xl before:rounded-2xl hover:before:rounded-2xl">
                    <button
                      type="button"
                      className="flex items-center space-x-2"
                      onClick={downloadContentCSV}
                    >
                      <span>Download CSV</span>
                      <span>
                        <DownloadIcon />
                      </span>
                    </button>
                  </BtnWithAnimation>
                </div>
              </>
            </>
          )}
        </div>
      </CardWrapper>
    </>
  )
}

export default History
