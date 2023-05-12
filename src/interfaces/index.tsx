export interface IUploadCSVSteps {
  name?: string
  href?: string
  status?: string
}

export interface ISidebarLink {
  id?: string | number
  title?: string
  path: string
  icon?: any
}

export interface ITableData {
  id?: string | number
  name?: string
  eanCode?: string
  marketPlace?: string
  language?: string
  toneOfVoice?: string
  result?: string
  isChecked?: boolean
  onCheck?: (e: any) => void
}

export interface IIconProps {
  className?: string
}
