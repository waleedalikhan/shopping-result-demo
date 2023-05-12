import React from 'react'
import { ArrowIcon, LoadingIcon } from '@/components/global/Icons'

type Props = {
  type?: any
  children: any
  loading?: boolean
  onClick?: () => void
}

const PrimaryButton: React.FC<Props> = ({
  type = 'button',
  loading,
  children,
  onClick,
}) => {
  return (
    <>
      <button
        type={type}
        className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
        onClick={onClick}
      >
        {children}
        {loading && (
          <div role="status">
            <LoadingIcon />
          </div>
        )}
        <ArrowIcon />
      </button>
    </>
  )
}

export default PrimaryButton
