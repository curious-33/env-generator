import { NodePlopAPI } from 'node-plop'
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

  prompts.push({
    type: 'input',
    name: 'name',
    message: 'component name',
  })

  actions.push({
    type: 'add',
    path: 'src/components/{{pascalCase name}}.ts',
    templateFile: './template/test.ts.hbs',
  })

  return {
    description: 'react component',
    prompts,
    actions,
  }
}

export default atomicComponent
