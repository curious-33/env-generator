import { Actions } from 'node-plop'
import fs from 'fs'
import { GeneratorConfig } from '../types'

function useAutoExport(actions: Actions, fullConfig: GeneratorConfig) {
  let extension = 'ts'
  if (!fullConfig.typescript) {
    extension = 'js'
  }
  const indexPath = `${fullConfig.basePath}/index.${extension}`
  if (!fs.existsSync(fullConfig.basePath)) {
    fs.mkdirSync(fullConfig.basePath)
    fs.writeFileSync(indexPath, `// Component imports \n\nexport {\n// Component exports\n}`, {
      encoding: 'utf8',
    })
  }

  if (Array.isArray(actions)) {
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
}

export default useAutoExport
