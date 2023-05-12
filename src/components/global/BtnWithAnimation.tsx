import React from 'react'
import cn from 'classnames'

type Props = {
  className?: any
  children?: any
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
}

const BtnWithAnimation: React.FC<Props> = ({
  className,
  children,
  type = 'button',
  onClick,
}) => {
  return (
    <>
      <button
        type={type}
        className={cn(
          "px-2 py-1 text-primary dark:text-white before:[content:''] relative z-[5] before:absolute before:left-0 before:h-full before:bg-primary before:dark:bg-secondary hover:text-white no-underline transition-all ease-in-out duration-300 hover:before:w-full before:transition-all before:ease-in-out before:duration-300 before:z-[-1] flex justify-center items-center text-sm font-semibold before:w-0 border dark:border-secondary border-primary w-full",
          className,
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default BtnWithAnimation
