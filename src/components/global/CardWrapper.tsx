import React from 'react'

type Props = {
  children?: any
}

const CardWrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="bg-white dark:bg-dark-bg dark:border dark:border-gray-500 mb-10 flex lg:flex-nowrap flex-wrap p-5 rounded-lg">
        {children}
      </div>
    </>
  )
}

export default CardWrapper
