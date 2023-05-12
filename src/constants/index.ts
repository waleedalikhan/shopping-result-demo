import { ISidebarLink, ITableData, IUploadCSVSteps } from '@/interfaces'
import { DocIcon, HistoryIcon, HomeIcon } from '@/components/global/Icons'

export const HOST_NAME: string = 'https://api.gptxt.io'
export const UPLOAD_CSV_STEPS: IUploadCSVSteps[] = [
  {
    name: 'Upload CSV',
    href: '#',
    status: 'complete',
  },
  {
    name: 'Check EAN from list',
    href: '#',
    status: 'current',
  },
  {
    name: 'Processing...',
    href: '#',
    status: 'upcoming',
  },
  {
    name: 'Done',
    href: '#',
    status: 'upcoming',
  },
]
export const SIDEBAR_LINKS: ISidebarLink[] = [
  {
    id: 1,
    title: 'Start',
    path: '/start',
    icon: HomeIcon,
  },
  {
    id: 2,
    title: 'History',
    path: '/history',
    icon: HistoryIcon,
  },
  {
    id: 2,
    title: 'Documentation',
    path: '/documentation',
    icon: DocIcon,
  },
]
export const CONTENT_OVERVIEW: ITableData[] = [
  {
    id: 1,
    name: 'Product 1',
    eanCode: '123123123',
    marketPlace: 'Amazon',
    language: 'English',
    toneOfVoice: 'Professional',
    result: 'Ok',
    isChecked: false,
  },
  {
    id: 2,
    name: 'Product 2',
    eanCode: '456456456',
    marketPlace: 'Ali Baba',
    language: 'French',
    toneOfVoice: 'Informative',
    result: 'Not found',
    isChecked: false,
  },
  {
    id: 3,
    name: 'Product 3',
    eanCode: '789789789',
    marketPlace: 'Ebay',
    language: 'Arabic',
    toneOfVoice: 'Persuasive',
    result: 'Ok',
    isChecked: false,
  },
]
