import React from 'react'
import Spinner from 'react-spinner-material'

type Props = {
  isLoading?: boolean
  closePopup?: () => void
  eanCode: string
  language?: string
  tonOfVoice?: string
  product?: any
  imgUrl?: string
}

const EANProductPopup: React.FC<Props> = ({
  isLoading,
  closePopup,
  eanCode,
  language,
  tonOfVoice,
  product,
  imgUrl,
}) => {
  return (
    <>
      <div className="fixed inset-0 z-[9999999999999999999] w-full py-20 backdrop-blur-sm overflow-y-auto flex justify-center items-center">
        <div className="p-10 bg-white dark:bg-dark-bg rounded-lg md:w-[70vw] w-full md:shadow-glow dark:shadow-white md:max-h-[800px] h-full overflow-y-auto relative">
          <button
            type="button"
            className="outline-none focus:outline-none bg-transparent absolute top-5 right-5 text-primary dark:text-white"
            onClick={closePopup}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-wrap">
            <div className="w-full mb-10">
              <p className="md:text-3xl text-xl font-bold text-primary dark:text-white">
                Product Details
              </p>
            </div>
            {isLoading ? (
              <>
                <div className="w-full relative">
                  <div>
                    <p className="text-dark-bg dark:text-white">
                      Searching for product with EAN code of <b>{eanCode}</b> in{' '}
                      <b>{language}</b> language and tone of voice is{' '}
                      <b>{tonOfVoice}</b>
                    </p>
                  </div>
                  <div className="py-8 w-full flex justify-center">
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
                </div>
              </>
            ) : (
              <>
                <div className="w-full flex flex-wrap gap-y-8">
                  <div className="w-full flex items-start border-b pb-5 dark:border-b-white">
                    <div className="w-[200px]">
                      <p className="md:text-lg text-base text-primary dark:text-white p-0 leading-none">
                        Product image:
                      </p>
                    </div>
                    <div className="w-32 h-32 overflow-hidden flex items-center justify-center border-2 border-primary dark:border-secondary">
                      <img
                        src={imgUrl}
                        alt="product img"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full flex items-start border-b pb-5 dark:border-b-white">
                    <div className="w-[200px]">
                      <p className="md:text-lg text-base text-primary dark:text-white p-0 leading-none">
                        Product EAN:
                      </p>
                    </div>
                    <div>
                      <p className="leading-normal text-primary dark:text-white p-0">
                        {eanCode}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex items-start border-b pb-5 dark:border-b-white">
                    <div className="w-[200px]">
                      <p className="md:text-lg text-base text-primary dark:text-white p-0 leading-none">
                        Product description:
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="leading-normal text-primary dark:text-white p-0">
                        {product.productDescription}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex items-start border-b pb-5 dark:border-b-white">
                    <div className="w-[200px]">
                      <p className="md:text-lg text-base text-primary dark:text-white p-0 leading-none">
                        Product type:
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="leading-normal text-primary dark:text-white p-0">
                        {product.productType}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex items-start border-b pb-5 dark:border-b-white">
                    <div className="w-[200px]">
                      <p className="md:text-lg text-base text-primary dark:text-white p-0 leading-none">
                        key features:
                      </p>
                    </div>
                    <div className="flex-1">
                      <ul className="marker:text-primary dark:marker:text-secondary list-disc space-y-4">
                        {product.productKeyFeatures.map(
                          (item: any, index: number) => {
                            return (
                              <React.Fragment key={`${item}${index}`}>
                                <li>
                                  <p className="leading-normal text-primary dark:text-white p-0">
                                    {item}
                                  </p>
                                </li>
                              </React.Fragment>
                            )
                          },
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="w-full flex items-start border-b pb-5 dark:border-b-white">
                    <div className="w-[200px]">
                      <p className="md:text-lg text-base text-primary dark:text-white p-0 leading-none">
                        Product specs:
                      </p>
                    </div>
                    <div className="flex-1">
                      <ul className="marker:text-primary dark:marker:text-secondary list-disc space-y-4">
                        {product.productSpecifications.map(
                          (item: string, index: number) => {
                            return (
                              <React.Fragment key={`${item}${index}`}>
                                <li>
                                  <p className="leading-normal text-primary dark:text-white p-0">
                                    {item}
                                  </p>
                                </li>
                              </React.Fragment>
                            )
                          },
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="w-full flex items-start border-b pb-5 dark:border-b-white">
                    <div className="w-[200px]">
                      <p className="md:text-lg text-base text-primary dark:text-white p-0 leading-none">
                        Product category:
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="leading-normal text-primary dark:text-white p-0">
                        {product.productCategory}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex items-start">
                    <div className="w-[200px]">
                      <p className="md:text-lg text-base text-primary dark:text-white p-0 leading-none">
                        Product Ad copy:
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="leading-normal text-primary dark:text-white p-0">
                        {product.productBrand}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default EANProductPopup
