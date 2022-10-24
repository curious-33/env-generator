import { NodePlopAPI, Actions, Prompts, DynamicActionsFunction, ActionType } from 'node-plop'
import path from 'path'
import fs from 'fs'
import { GeneratorConfig } from './index'

const atomicComponent = (plop: NodePlopAPI, config: Partial<GeneratorConfig>) => {
  const prompts: Prompts = []

  const defaultConfig: GeneratorConfig = {
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

  prompts.push({
    type: 'input',
    name: 'type',
    message: 'DOM API type: ',
  })

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
    const CURRENT_DIR = path.resolve(__dirname)
    const actions: Actions = []

    console.log({ data })

    if (fullConfig.createIndex) {
      const indexPath = fullConfig.basePath + '/index.ts'
      if (!fs.existsSync(fullConfig.basePath)) {
        fs.mkdirSync(fullConfig.basePath)
        fs.writeFileSync(indexPath, `// Component imports \n\nexport {\n// Component exports\n}`, {
          encoding: 'utf8',
        })
      }

      actions.push({
        type: 'modify',
        path: indexPath,
        template: "import { {{pascalCase name}} } from './{{pascalCase name}}';\n$1",
        pattern: /(\/\/ Component imports)/g,
      })
      actions.push({
        type: 'modify',
        path: indexPath,
        template: '\t{{pascalCase name}},\n$1',
        pattern: /(\/\/ Component exports)/g,
      })
    }

    // console.log({ config, plop })

    actions.push({
      type: 'addMany',
      destination: fullConfig.basePath + '/{{pascalCase name}}',
      templateFiles: CURRENT_DIR + '/templates/ts/components/*.hbs',
      base: CURRENT_DIR + '/templates/ts/components',
      // skipIfExists: true,
    })

    return actions
  }

  return {
    description: 'react component',
    prompts,
    actions,
  }
}

export default atomicComponent
