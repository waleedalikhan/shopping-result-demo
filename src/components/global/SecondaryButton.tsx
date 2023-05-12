import React from 'react'
import { LoadingIcon } from '@/components/global/Icons'

type Props = {
  type?: any
  children: any
  loading?: boolean
  onClick?: () => void
}

const SecondaryButton: React.FC<Props> = ({
  type,
  loading,
  children,
  onClick,
}) => {
  return (
    <>
      <button
        type={type}
        className="inline-flex items-center  border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full"
        onClick={onClick}
      >
        {children}
        {loading && (
          <div role="status">
            <LoadingIcon />
          </div>
        )}
      </button>
    </>
  )
}

export default SecondaryButton
