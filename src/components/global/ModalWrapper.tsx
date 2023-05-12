import React from 'react'

type Props = {
  children?: any
}

const ModalWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="duration-200 transition ease-in-out delay-50 overflow-hidden ">
      <div>
        <div className="fixed inset-0 z-50" role="dialog">
          <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-sm dark:bg-black/40 opacity-100"></div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalWrapper
