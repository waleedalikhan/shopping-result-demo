import { useCallback, useEffect, useState } from 'react'
import { DropzoneState, useDropzone } from 'react-dropzone'
import Papa from 'papaparse'
import { CloseIcon, FileIcon, UploadIcon } from '@/components/global/Icons'

interface InputProps {
  dropzone: DropzoneState
  onChange?: (e: any) => void
}

interface HasFileProps {
  file?: File
  removeFile: () => void
}

type Props = {
  onFileUpload?: (files: string[]) => void
}

const FileInput: React.FC<Props> = ({ onFileUpload }) => {
  const [submittedFile, setFile] = useState<File | null>(null)

  const removeFile = useCallback(() => {
    setFile(null)
    onFileUpload && onFileUpload([])
  }, [submittedFile])

  const onDrop = useCallback((files: File[]) => {
    // @ts-ignore
    setFile(files[0])
  }, [])

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/csv': ['.csv'],
    },
  })

  useEffect(() => {
    if (submittedFile !== null) {
      Papa.parse(submittedFile, {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          const valuesArray: any[] = []

          // Iterating data to get column name and their values
          results.data.map((d: any) => {
            valuesArray.push(Object.entries(d))
          })
          onFileUpload && onFileUpload(valuesArray[0][0])
        },
      })
    }
  }, [submittedFile])

  if (submittedFile)
    return <HasFile file={submittedFile} removeFile={removeFile} />

  return <Input dropzone={dropzone} />
}

const Input = ({ dropzone, onChange }: InputProps) => {
  const { getRootProps, getInputProps, isDragActive } = dropzone

  return (
    <div
      {...getRootProps()}
      className={`w-full h-full rounded-lg border-dashed border-2 transition-all ease-in-out duration-300 hover:opacity-60
      ${
        isDragActive
          ? 'border-primary dark:border-secondary'
          : 'border-primary dark:border-white'
      }`}
    >
      <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full h-full">
          <UploadIcon
            className={`w-10 h-10 mb-3 ${
              isDragActive
                ? 'text-primary dark:text-secondary'
                : 'text-primary dark:text-white'
            }`}
          />
          {isDragActive ? (
            <p className="font-bold text-lg text-primary dark:text-white">
              Upload file!
            </p>
          ) : (
            <>
              <p className="mb-2 text-lg text-primary dark:text-white">
                <span className="font-bold">Drag n Drop</span> or upload
              </p>
              <p className="text-primary dark:text-white text-sm">CSV</p>
            </>
          )}
        </div>
      </label>
      <input {...getInputProps()} className="hidden" onChange={onChange} />
    </div>
  )
}

const HasFile = ({ file, removeFile }: HasFileProps) => {
  return (
    <>
      <div className="w-full h-full rounded-lg border-dashed border-2 flex justify-center items-center border-primary dark:border-secondary p-6">
        <div className="bg-white dark:bg-dark-bg w-full rounded-md shadow-md dark:shadow-none flex gap-3 items-center justify-between p-4">
          <div className="flex gap-4 items-center">
            <FileIcon className="w-5 h-5 text-primary dark:text-white" />
            <span className="text-sm text-primary dark:text-white">
              {file?.name}
            </span>
          </div>
          <button type="button" onClick={removeFile}>
            <CloseIcon className="w-5 h-5 text-primary dark:text-white" />
          </button>
        </div>
      </div>
    </>
  )
}

export default FileInput
