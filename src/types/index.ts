export interface IConfig {
  name: string
  version: string | number
}

export interface GeneratorConfig {
  typescript: boolean
  autoExport: boolean
  createIndex: boolean
  basePath: string
  test: boolean
  story: boolean
  style: boolean
  templateIndex?: string
  templateStory?: string
  templateStyles?: string
  templateTest?: string
  [key: string]: unknown
}
