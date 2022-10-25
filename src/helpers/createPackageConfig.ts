import { NodePlopAPI, Prompts, Actions, ActionType, DynamicActionsFunction } from 'node-plop'
import fs from 'fs'
import config from '../config'

function createPackageConfig(plop: NodePlopAPI) {
  const prompts: Prompts = [
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Is this a Typescript project?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'autoExport',
      message: 'Need to export components(auto export components)?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'createIndex',
      message: 'Need to export file?(auto export file)',
      default: true,
    },
    {
      type: 'input',
      name: 'basePath',
      message: 'Base path to generate folders: ',
      default: 'src/components',
    },
  ]

  if (!fs.existsSync('.env-generator')) {
    fs.mkdirSync('.' + config.name)
  }

  const actions: DynamicActionsFunction = (
    data: { [key: string]: string } | undefined,
  ): ActionType[] => {
    const _actions: Actions = []

    // console.log({ data })

    if (!fs.existsSync(`.${config.name}/config.json`)) {
      _actions.push({
        type: 'add',
        path: `.${config.name}/config.json`,
        template: JSON.stringify(data, null, '\t'),
      })
    }

    return _actions
  }

  return {
    description: 'Check config file',
    prompts,
    actions,
  }
}

export default createPackageConfig
