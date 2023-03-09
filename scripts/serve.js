const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const concurrently = require('concurrently')

// 运行环境选项
const envChoices = [
  {
    name: 'DEV环境',
    value: 'dev'
  },
  {
    name: 'TEST环境',
    value: 'test'
  },
  {
    name: 'PROD环境',
    value: 'prod'
  }
]

/**
 * 所有的应用名
 */
const allPackages = ['apps'].reduce((acc, curr) => {
  const appNames = fs.readdirSync(path.resolve(__dirname, `../${curr}`))
  const items = appNames.map((name) => {
    return {
      name,
      value: {
        name,
        type: curr
      }
    }
  })

  return [...acc, ...items]
}, [])

/**
 * 生成应用串行运行命令
 * @param apps 应用列表
 * @param apiEnv 启动环境
 */
const generateCommands = ({ apps, apiEnv } = {}) => {
  console.log('apps', apps)
  // let filterStr = ''
  // for (let i = 0; i < apps.length; i++) {
  //   const { name } = apps[i]
  //   filterStr += ` ${name}`
  // }
  const { name } = apps

  console.log('apiEnv', apiEnv)
  const command = `nx serve ${name}`

  return { command }
}

const serve = async () => {
  // 选择API环境
  const { apiEnv } = await inquirer.prompt([
    {
      type: 'list',
      name: 'apiEnv',
      message: '请选择运行环境',
      choices: envChoices
    }
  ])

  // 需要过滤的应用
  const excluded = ['.DS_Store']
  // 应用选项
  const appChoices = allPackages.filter((item) => !excluded.includes(item.name))
  // 选择应用
  const { apps } = await inquirer.prompt([
    {
      type: 'list',
      name: 'apps',
      message: '请选择需要运行的应用',
      choices: appChoices,
      validate: function (answer) {
        if (!answer.length) {
          return '请至少选择一个应用'
        }
        return true
      }
    }
  ])
  const { command } = generateCommands({
    apps,
    apiEnv
  })

  concurrently([command], {
    killOthers: ['failure'],
    raw: true,
    prefix: 'name'
  })
}

serve()
