import { NodePlopAPI } from 'node-plop'
import atomicComponent from './component'

import { GeneratorConfig } from './types'

const generator = (plop: NodePlopAPI, config: Partial<GeneratorConfig>): void => {
  const component = atomicComponent(plop, config)
  plop.setDefaultInclude({ generators: true })
  plop.setGenerator('atomic-component', component)
}

export default generator
