import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import cn from 'classnames'

import ModalWrapper from '@/components/global/ModalWrapper'
import { RadioGroup } from '@headlessui/react'
import SecondaryButton from '@/components/global/SecondaryButton'
import PrimaryButton from '@/components/global/PrimaryButton'
import { CardLoadingAnimation } from '@/components/global/LoadingAnimations'
import { HOST_NAME } from '@/constants'
import { toast } from 'react-toastify'

type Props = {
  onCancelClick?: () => void
}

const PriceBox: React.FC<Props> = ({ onCancelClick }) => {
  const http = Axios
  let [isLoading, setLoading] = useState<boolean>(false)
  let [planDetails, setPlanDetails] = useState<any[]>([])
  let [cardNumber, setCardNumber] = useState<string>('4242424242424242')
  let [cardHolderName, setCardHolderName] = useState<string>('Div')
  let [expirationDate, setExpirationDate] = useState<string>('12/25')
  let [cardCVV, setCardCVV] = useState<string>('123')

  useEffect(() => {
    ;(async () => {
      setLoading((isLoading = true))
      const formData = {
        dynamic: true,
      }

      try {
        const res = await http.post(
          `${HOST_NAME}/api/list-all-subscription-item`,
          formData,
        )
        if (res.data.type === 'error') {
          toast('An error occurred while fetching payment plans')
        } else {
          setPlanDetails((planDetails = res.data.server_data))
        }
        setLoading((isLoading = false))

        console.log(planDetails)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  const handlePayment = (e: any) => {
    e.preventDefault()
  }

  const selectPaymentMethod = (method: any) => {
    console.log(method)
  }

  return (
    <>
      <ModalWrapper>
        <div className="fixed inset-0 z-[99999999999999] overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-2/4">
              <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <form className="space-y-6" onSubmit={handlePayment}>
                  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="mt-1 pt-1">
                      <RadioGroup onChange={selectPaymentMethod}>
                        <RadioGroup.Label className="text-base font-medium text-gray-900">
                          Plan
                        </RadioGroup.Label>
                        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                          {isLoading && (
                            <>
                              <CardLoadingAnimation />
                              <CardLoadingAnimation />
                            </>
                          )}
                          {planDetails.map((plan: any) => {
                            return (
                              <React.Fragment key={plan.id}>
                                <RadioGroup.Option value={plan}>
                                  {({ active, checked }) => (
                                    <div
                                      className={cn(
                                        'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
                                        {
                                          'border-transparent': checked,
                                          'border-gray-300': !checked,
                                          'border-indigo-500 ring-2 ring-indigo-500': active,
                                        },
                                      )}
                                    >
                                      <span className="flex flex-1 space-x-3">
                                        <div>
                                          <span
                                            className={cn(
                                              'w-4 h-4 rounded-full flex items-center justify-center',
                                              {
                                                'bg-primary dark:bg-secondary': checked,
                                                'border border-gray-300': !checked,
                                              },
                                            )}
                                          >
                                            <span className="w-2 h-2 rounded-full bg-white"></span>
                                          </span>
                                        </div>
                                        <span className="flex flex-col -mt-1">
                                          <RadioGroup.Label
                                            as="span"
                                            className="block text-sm font-medium text-gray-900"
                                          >
                                            {plan.plan_name}
                                          </RadioGroup.Label>
                                          <RadioGroup.Description
                                            as="span"
                                            className="mt-1 flex items-center text-sm text-gray-500"
                                          >
                                            {plan.plan_description}
                                          </RadioGroup.Description>
                                          <RadioGroup.Description
                                            as="span"
                                            className="mt-6 text-sm font-medium text-gray-900"
                                          >
                                            €{' '}
                                            {parseFloat(
                                              // @ts-ignore
                                              plan.plan_price / 100,
                                            ).toFixed(2)}
                                          </RadioGroup.Description>
                                        </span>
                                      </span>
                                    </div>
                                  )}
                                </RadioGroup.Option>
                              </React.Fragment>
                            )
                          })}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="mt-10 border-t border-gray-200 pt-10">
                      <h2 className="text-lg font-medium text-gray-900">
                        Payment
                      </h2>
                      <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                        <div className="col-span-4">
                          <label
                            htmlFor="card-number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Card number
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              value={cardNumber}
                              autoComplete="off"
                              placeholder="123456789012"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              onChange={(e: any) =>
                                setCardNumber((cardNumber = e.target.value))
                              }
                            />
                          </div>
                        </div>
                        <div className="col-span-4">
                          <label
                            htmlFor="name-on-card"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name on card
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              value={cardHolderName}
                              autoComplete="off"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              onChange={(e: any) =>
                                setCardHolderName(
                                  (cardHolderName = e.target.value),
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-span-3">
                          <label
                            htmlFor="expiration-date"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Expiration date (MM/YY)
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              value={expirationDate}
                              autoComplete="off"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              onChange={(e: any) =>
                                setExpirationDate(
                                  (expirationDate = e.target.value),
                                )
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="cvc"
                            className="block text-sm font-medium text-gray-700"
                          >
                            CVC
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="cvc"
                              value={cardCVV}
                              autoComplete="off"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              onChange={(e: any) =>
                                setCardCVV((expirationDate = e.target.value))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-10">
                      <div className="flex items-center">
                        <SecondaryButton onClick={onCancelClick} type="button">
                          Close
                        </SecondaryButton>
                      </div>
                      <div className="text-sm space-x-2">
                        <PrimaryButton type="submit">Save</PrimaryButton>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  )
}

export default PriceBox
