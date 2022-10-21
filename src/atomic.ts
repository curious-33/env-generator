import { NodePlopAPI } from 'node-plop'
import path from 'path'
import { GeneratorConfig } from './index'

const atomicComponent = (config: Partial<GeneratorConfig>, plop: NodePlopAPI) => {
  const prompts = []
  const actions = []

  // prompts.push({
  //   type: 'list',
  //   name: 'type',
  //   message: 'component type',
  //   choices: ['Atom', 'Molecule', 'Organism', 'Template', 'Page'],
  // })

  const CURRENT_DIR = path.resolve(__dirname)

  prompts.push({
    type: 'input',
    name: 'name',
    message: 'component name',
  })

  actions.push({
    type: 'add',
    path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
    templateFile: CURRENT_DIR + '/templates/test.ts.hbs',
  })

  return {
    description: 'react component',
    prompts,
    actions,
  }
}

export default atomicComponent
