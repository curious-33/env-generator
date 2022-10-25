import { NodePlopAPI, Actions, Prompts, DynamicActionsFunction, ActionType } from 'node-plop'
import path from 'path'
import fs from 'fs'
import { GeneratorConfig } from './types'
import useAutoExport from './actions/autoExport'

const ComponentGenerator = (plop: NodePlopAPI, config: Partial<GeneratorConfig>) => {
  const prompts: Prompts = []

  const defaultConfig: GeneratorConfig = {
    typescript: false,
    autoExport: false,
    createIndex: true,
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
    const CURRENT_DIR = path.resolve(__dirname)
    const extensions: string[] = fullConfig.typescript ? ['ts', 'tsx'] : ['js', 'jsx']
    const _actions: Actions = []

    console.log({ data })

    if (fullConfig.autoExport) {
      useAutoExport(_actions as Actions, fullConfig)
    }

    _actions.push({
      type: 'add',
      path: `${fullConfig.basePath}/{{pascalCase name}}/{{pascalCase name}}.${extensions[1]}`,
      templateFile: `${CURRENT_DIR}/templates/${extensions[0]}/components/component.hbs`,
      skipIfExists: true,
    })

    if (fullConfig.createIndex) {
      let indexTemplateFile = `${CURRENT_DIR}/templates/${extensions[0]}/components/index.hbs`
      if (fullConfig.templateIndex !== undefined) {
        if (fs.existsSync(fullConfig.templateIndex)) {
          indexTemplateFile = fullConfig.templateIndex
        }
      }

      _actions.push({
        type: 'add',
        path: `${fullConfig.basePath}/{{pascalCase name}}/index.${extensions[0]}`,
        templateFile: indexTemplateFile,
        skipIfExists: true,
      })
    }

    if (fullConfig.test) {
      let indexTemplateFile = `${CURRENT_DIR}/templates/${extensions[0]}/components/component.test.hbs`
      if (fullConfig.templateTest !== undefined) {
        if (fs.existsSync(fullConfig.templateTest)) {
          indexTemplateFile = fullConfig.templateTest
        }
      }

      _actions.push({
        type: 'add',
        path: `${fullConfig.basePath}/{{pascalCase name}}/{{pascalCase name}}.test.${extensions[1]}`,
        templateFile: indexTemplateFile,
        skipIfExists: true,
      })
    }

    if (fullConfig.story) {
      let indexTemplateFile = `${CURRENT_DIR}/templates/${extensions[0]}/components/component.stories.hbs`
      if (fullConfig.templateStory !== undefined) {
        if (fs.existsSync(fullConfig.templateStory)) {
          indexTemplateFile = fullConfig.templateStory
        }
      }

      _actions.push({
        type: 'add',
        path: `${fullConfig.basePath}/{{pascalCase name}}/{{pascalCase name}}.stories.${extensions[1]}`,
        templateFile: indexTemplateFile,
        skipIfExists: true,
      })
    }

    if (fullConfig.style) {
      let indexTemplateFile = `${CURRENT_DIR}/templates/${extensions[0]}/components/component.styles.hbs`
      if (fullConfig.templateStyles !== undefined) {
        if (fs.existsSync(fullConfig.templateStyles)) {
          indexTemplateFile = fullConfig.templateStyles
        }
      }

      _actions.push({
        type: 'add',
        path: `${fullConfig.basePath}/{{pascalCase name}}/{{pascalCase name}}.styles.scss`,
        templateFile: indexTemplateFile,
        skipIfExists: true,
      })
    }

    return _actions
  }

  return {
    description: 'react component',
    prompts,
    actions,
  }
}

export default ComponentGenerator

// _actions.push({
//   type: 'addMany',
//   destination: fullConfig.basePath + '/{{pascalCase name}}',
//   templateFiles: CURRENT_DIR + '/templates/ts/components/*.hbs',
//   base: CURRENT_DIR + '/templates/ts/components',
//   // skipIfExists: true,
// })
