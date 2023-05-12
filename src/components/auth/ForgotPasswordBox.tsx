import React, { useState } from 'react'
import Axios from 'axios'

import ModalWrapper from '@/components/global/ModalWrapper'
import { ArrowIcon, AtTheRateIcon } from '@/components/global/Icons'
import PrimaryButton from '@/components/global/PrimaryButton'
import SecondaryButton from '@/components/global/SecondaryButton'
import { HOST_NAME } from '@/constants'
import { toast } from 'react-toastify'

type Props = {
  onSignupClick?: () => void
  onCancelClick?: () => void
  onForgotPasswordSuccess?: () => void
}

const ForgotPasswordBox: React.FC<Props> = ({
  onSignupClick,
  onCancelClick,
  onForgotPasswordSuccess,
}) => {
  const http = Axios
  let [email, setEmail] = useState<string>('')
  let [isLoading, setLoading] = useState<boolean>(false)

  const handlePasswordReset = async (e: any) => {
    e.preventDefault()
    let formData = {
      email,
    }
    setLoading((isLoading = true))
    try {
      let response = await http.post(
        `${HOST_NAME}/api/forget-password`,
        formData,
      )
      if (response) {
        toast('Reset password link sent on your email!')
      }
      setLoading(false)
      onForgotPasswordSuccess && onForgotPasswordSuccess()
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <>
      <ModalWrapper>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all lg:my-8 lg:w-2/4 w-full lg:px-0 px-5">
              <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="mx-auto h-12 w-auto   flex  flex-col justify-center">
                    <svg viewBox="0 0 99 24" aria-hidden="true" className="h-6">
                      <path
                        className="fill-emerald-400 x-auto h-12 w-auto"
                        d="M16 8a5 5 0 0 0-5-5H5a5 5 0 0 0-5 5v13.927a1 1 0 0 0 1.623.782l3.684-2.93a4 4 0 0 1 2.49-.87H11a5 5 0 0 0 5-5V8Z"
                      ></path>
                      <path
                        className="fill-zinc-900 dark:fill-white"
                        d="M26.538 18h2.654v-3.999h2.576c2.672 0 4.456-1.723 4.456-4.333V9.65c0-2.61-1.784-4.333-4.456-4.333h-5.23V18Zm4.58-10.582c1.52 0 2.416.8 2.416 2.241v.018c0 1.441-.896 2.25-2.417 2.25h-1.925V7.418h1.925ZM38.051 18h2.566v-5.414c0-1.371.923-2.206 2.382-2.206.396 0 .791.061 1.178.15V8.287a3.843 3.843 0 0 0-.958-.123c-1.257 0-2.136.615-2.443 1.661h-.159V8.323h-2.566V18Zm11.55.202c2.979 0 4.772-1.88 4.772-5.036v-.018c0-3.128-1.82-5.036-4.773-5.036-2.953 0-4.772 1.916-4.772 5.036v.018c0 3.146 1.793 5.036 4.772 5.036Zm0-2.013c-1.372 0-2.145-1.116-2.145-3.023v-.018c0-1.89.782-3.023 2.144-3.023 1.354 0 2.145 1.134 2.145 3.023v.018c0 1.907-.782 3.023-2.145 3.023Zm10.52 1.846c.492 0 .967-.053 1.283-.114v-1.907a6.057 6.057 0 0 1-.755.044c-.87 0-1.24-.387-1.24-1.257v-4.544h1.995V8.323H59.41V6.012h-2.592v2.311h-1.495v1.934h1.495v5.133c0 1.88.949 2.645 3.304 2.645Zm7.287.167c2.98 0 4.772-1.88 4.772-5.036v-.018c0-3.128-1.82-5.036-4.772-5.036-2.954 0-4.773 1.916-4.773 5.036v.018c0 3.146 1.793 5.036 4.773 5.036Zm0-2.013c-1.372 0-2.145-1.116-2.145-3.023v-.018c0-1.89.782-3.023 2.145-3.023 1.353 0 2.144 1.134 2.144 3.023v.018c0 1.907-.782 3.023-2.144 3.023Zm10.767 2.013c2.522 0 4.034-1.353 4.297-3.463l.01-.053h-2.374l-.017.036c-.229.966-.853 1.467-1.908 1.467-1.37 0-2.135-1.08-2.135-3.04v-.018c0-1.934.755-3.006 2.135-3.006 1.099 0 1.74.615 1.908 1.556l.008.017h2.391v-.026c-.228-2.162-1.749-3.56-4.315-3.56-3.033 0-4.738 1.837-4.738 5.019v.017c0 3.217 1.714 5.054 4.738 5.054Zm10.257 0c2.98 0 4.772-1.88 4.772-5.036v-.018c0-3.128-1.82-5.036-4.772-5.036-2.953 0-4.773 1.916-4.773 5.036v.018c0 3.146 1.793 5.036 4.773 5.036Zm0-2.013c-1.371 0-2.145-1.116-2.145-3.023v-.018c0-1.89.782-3.023 2.145-3.023 1.353 0 2.144 1.134 2.144 3.023v.018c0 1.907-.782 3.023-2.144 3.023ZM95.025 18h2.566V4.623h-2.566V18Z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                    No password?
                  </h3>
                </div>
                <div className="mx-auto mt-2 h-12 w-auto flex  flex-col justify-center">
                  <PrimaryButton type="button">
                    Sign in with Google{' '}
                  </PrimaryButton>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">
                        Or, reset with your email
                      </span>
                    </div>
                  </div>
                  <div className="bg-white  sm:rounded-lg sm:px-2">
                    <form className="space-y-6" onSubmit={handlePasswordReset}>
                      <div>
                        {/* <ErrorMaster  ref="ErrorLog"/> */}
                        <div className="mt-1">
                          <div className="group relative flex h-12">
                            <AtTheRateIcon />
                            <input
                              className=" flex-auto appearance-none bg-transparent pl-10 text-zinc-900  placeholder:text-zinc-500 focus:w-full  dark:text-white sm:text-sm &::-webkit-search-cancel-button]:hidden &::-webkit-search-decoration]:hidden &::-webkit-search-results-button]:hidden &::-webkit-search-results-decoration]:hidden pr-4 rounded-md border border-gray-300 "
                              name="email"
                              autoComplete="off"
                              placeholder="Email"
                              maxLength={512}
                              type="text"
                              value={email}
                              onChange={(e: any) =>
                                setEmail((email = e.target.value))
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <a
                            className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500"
                            href="#"
                            onClick={onSignupClick}
                          >
                            Sign up
                            <ArrowIcon />
                          </a>
                        </div>
                        <div className="text-sm space-x-2">
                          <SecondaryButton
                            type="button"
                            onClick={onCancelClick}
                          >
                            Cancel
                          </SecondaryButton>
                          <PrimaryButton type="submit" loading={isLoading}>
                            Reset
                          </PrimaryButton>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  )
}

export default ForgotPasswordBox
