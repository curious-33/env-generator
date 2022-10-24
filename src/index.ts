import { NodePlopAPI } from 'node-plop'
import atomicComponent from './atomic'

export interface GeneratorConfig {
  createIndex: boolean
  functional: boolean
  basePath: string
  test: boolean
  story: boolean
  style: boolean
  templateIndex?: string
  templateStory?: string
  templateStyles?: string
  templateTest?: string
  templateComponentFunctional?: string
  templateComponentClassBased?: string
  [key: string]: unknown
}

const generator = (plop: NodePlopAPI, config: Partial<GeneratorConfig>): void => {
  const component = atomicComponent(plop, config)
  plop.setDefaultInclude({ generators: true })
  plop.setGenerator('atomic-component', component)
}

export default generator
