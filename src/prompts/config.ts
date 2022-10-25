import { NodePlopAPI, Actions, Prompts, DynamicActionsFunction, ActionType } from 'node-plop'
import { GeneratorConfig } from '../types'

const atomicComponent = (plop: NodePlopAPI, config: Partial<GeneratorConfig>) => {
  const prompts: Prompts = []

  const defaultConfig: GeneratorConfig = {
    typescript: false,
    autoExport: false,
    createIndex: true,
    functional: true,
    basePath: 'src/components',
    test: true,
    story: true,
    style: true,
  }

  const fullConfig: GeneratorConfig = {
    ...defaultConfig,
    ...config,
  }

  prompts.push({
    type: 'input',
    name: 'name',
    message: 'component name: ',
  })

  if (fullConfig.typescript) {
    prompts.push({
      type: 'input',
      name: 'type',
      message: 'DOM API type: ',
    })
  }

  prompts.push({
    type: 'input',
    name: 'tag',
    message: 'tag name: ',
  })

  // prompts.push({
  //   type: 'list',
  //   name: 'type',
  //   message: 'component type',
  //   choices: ['Atom', 'Molecule', 'Organism', 'Template', 'Page'],
  // })

  const actions: DynamicActionsFunction = (
    data: { [key: string]: string } | undefined,
  ): ActionType[] => {
    const _actions: Actions = []
    console.log({ data })

    return _actions
  }

  return {
    description: 'react component',
    prompts,
    actions,
  }
}

export default atomicComponent
