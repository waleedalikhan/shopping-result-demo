import React from 'react'
import Axios from 'axios'
import cn from 'classnames'

import { DownloadIcon } from '@/components/global/Icons'
import { HOST_NAME } from '@/constants'

type Props = {
  tableContent: any[]
  onHeaderCheck?: (e: any) => void
  onEntryCheck?: (index: number) => void
  hasCheckboxes?: boolean
}

const ContentTable: React.FC<Props> = ({
  tableContent,
  onHeaderCheck,
  onEntryCheck,
  hasCheckboxes = true,
}) => {
  const http = Axios

  const downloadFile = (file: string) => {
    const url = file
    const link = document.createElement('a')
    link.href = url
    document.body.appendChild(link)
    link.download = url
    link.click()
    document.body.removeChild(link)
  }

  const downloadPDF = async (ean: string) => {
    let formData = {
      ean: ean,
    }
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
    try {
      const res = await http.post(`${HOST_NAME}/api/download-pdf`, formData, {
        headers: headers,
      })
      downloadFile(res.data.filename)
    } catch (err) {
      console.error(err)
    }
  }

  const downloadDOC = async (ean: string) => {
    let formData = {
      ean: ean,
    }
    let headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
    try {
      const res = await http.post(`${HOST_NAME}/api/download-doc`, formData, {
        headers: headers,
      })
      downloadFile(res.data.url)
    } catch (err) {
      console.error(err)
    }
  }

  const renderTableRows = tableContent.map((content: any, index: number) => {
    let result = JSON.parse(content.api_response)['shoppingscraper'].results[0]

    return (
      <React.Fragment key={`${content.id}${content.eanCode}${index}`}>
        <tr>
          {hasCheckboxes && (
            <td className="w-16 relative">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary sm:left-6 dark:text-secondary dark:focus:ring-secondary cursor-pointer bg-transparent"
                checked={content.isChecked}
                onChange={() => onEntryCheck && onEntryCheck(index)}
              />
            </td>
          )}
          <td className="px-3 py-3.5 text-left text-sm truncate">
            <span className="flex items-center space-x-4 truncate">
              <span className="w-10 rounded-full">
                <img
                  src={content.imageUrl}
                  alt="img"
                  className="rounded-full w-full h-full object-cover"
                />
              </span>
              <span className="text-sm text-dark-bg dark:text-white font-medium w-48 truncate">
                {
                  JSON.parse(content.api_response)['shoppingscraper'].results[0]
                    .title
                }
              </span>
            </span>
          </td>
          <td className="px-3 py-3.5 text-left text-sm">
            <span className="text-dark-bg dark:text-white font-light">
              {content.ean}
            </span>
          </td>
          <td className="px-3 py-3.5 text-left text-sm">
            <span className="text-dark-bg dark:text-white font-light">
              {content.marketplace}
            </span>
          </td>
          <td className="px-3 py-3.5 text-left text-sm">
            <span className="text-dark-bg dark:text-white font-light">
              {content.language}
            </span>
          </td>
          <td className="px-3 py-3.5 text-left text-sm">
            <span className="text-dark-bg dark:text-white font-light">
              {content.tone_of_voice}
            </span>
          </td>
          <td className="px-3 py-3.5 text-left text-sm">
            <span className="flex items-center space-x-2">
              <span
                className={cn('w-2 h-2 rounded-full', {
                  'bg-green-500':
                    content.status === 200 && result.offers.length > 0,
                  'bg-red-500':
                    content.status === 200 &&
                    result.offers.length > 0 &&
                    result.title &&
                    result.content.description === '',
                  'bg-red-600':
                    content.status === 404 && result.offers.length === 0,
                  'bg-yellow-500':
                    content.status !== 200 &&
                    result.offers.length > 0 &&
                    result.title !== '' &&
                    result.content.description !== '',
                })}
              ></span>
              {content.status === 200 && result.offers.length > 0 && (
                <span className="text-green-800">Ok</span>
              )}
              {content.status === 200 &&
                result.offers.length > 0 &&
                result.title &&
                result.content.description === '' && (
                  <span className="text-red-800">GPT Error</span>
                )}
              {content.status === 404 && result.offers.length === 0 && (
                <span className="text-red-800">Not found</span>
              )}
              {content.status !== 200 &&
                result.offers.length > 0 &&
                result.title !== '' &&
                result.content.description !== '' && (
                  <span className="text-yellow-800">Missing</span>
                )}
            </span>
          </td>
          <td>
            <span className="flex items-center space-x-4">
              <button
                type="button"
                className="outline-none focus:outline-none flex items-center space-x-1 text-green-800 text-2xs font-medium cursor-pointer"
                onClick={() => downloadDOC(content.ean)}
              >
                <span className="uppercase">doc</span>
                <span>
                  <DownloadIcon />
                </span>
              </button>
              <button
                type="button"
                className="outline-none focus:outline-none flex items-center space-x-1 text-green-800 text-2xs font-medium"
                onClick={() => downloadPDF(content.ean)}
              >
                <span className="uppercase">pdf</span>
                <span>
                  <DownloadIcon />
                </span>
              </button>
            </span>
          </td>
        </tr>
      </React.Fragment>
    )
  })

  return (
    <>
      <table className="min-w-full divide-y divide-gray-300 overflow-x-auto xl:table-fixed xl:table block">
        <thead>
          <tr>
            {hasCheckboxes && (
              <th scope="col" className="relative w-14">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary sm:left-6 dark:text-secondary dark:focus:ring-secondary cursor-pointer bg-transparent"
                  onChange={onHeaderCheck}
                />
              </th>
            )}
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-primary dark:text-white w-72 truncate"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-primary dark:text-white truncate"
            >
              Ean
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-primary dark:text-white truncate"
            >
              Marketplace
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-primary dark:text-white truncate"
            >
              Language
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-primary dark:text-white truncate"
            >
              Tone Of Voice
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-primary dark:text-white truncate"
            >
              Result
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-primary dark:text-white truncate"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {!tableContent?.length ? (
            <tr>
              <td
                className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"
                colSpan={234}
              >
                No data found!
              </td>
            </tr>
          ) : (
            <>{renderTableRows}</>
          )}
        </tbody>
      </table>
    </>
  )
}

export default ContentTable
