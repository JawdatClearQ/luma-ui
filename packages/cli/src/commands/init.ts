import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'

export async function initCommand() {
  console.log(chalk.cyan('\n  ✨ Setting up Luma UI in your project...\n'))

  // Detect framework
  const spinner = ora('Detecting framework...').start()
  const framework = await detectFramework()
  spinner.succeed(`Detected: ${framework}`)

  // Ask questions
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Are you using TypeScript?',
      default: true,
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager do you use?',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' },
        { name: 'bun', value: 'bun' },
      ],
      default: 'npm',
    },
    {
      type: 'checkbox',
      name: 'components',
      message: 'Select components to add (space to select):',
      choices: [
        { name: 'Button', checked: true },
        { name: 'Input', checked: true },
        { name: 'Card' },
        { name: 'Modal' },
        { name: 'Toast' },
        { name: 'Tabs' },
        { name: 'Select' },
        { name: 'Switch' },
        { name: 'All components' },
      ],
    },
  ])

  // Install dependency
  const installSpinner = ora('Installing @luma/ui...').start()
  try {
    await installPackage(answers.packageManager)
    installSpinner.succeed('@luma/ui installed successfully')
  } catch (err) {
    installSpinner.fail('Failed to install @luma/ui')
    console.error(err)
    process.exit(1)
  }

  // Create config
  const configSpinner = ora('Creating configuration...').start()
  await createConfig(answers.typescript)
  configSpinner.succeed('Configuration created')

  // Add provider
  const providerSpinner = ora('Adding Luma provider...').start()
  await addProvider(framework, answers.typescript)
  providerSpinner.succeed('Provider added')

  console.log(chalk.green('\n  ✅ Luma UI is ready!\n'))
  console.log(`  ${chalk.dim('Get started:')}`)
  console.log(`  ${chalk.cyan('  import { Button } from "@luma/ui"')}`)
  console.log(`  ${chalk.cyan('  <Button variant="primary">Click me</Button>')}\n`)
  console.log(chalk.dim('  Built with Luma.\n'))
}

async function detectFramework(): Promise<string> {
  const pkgPath = path.resolve(process.cwd(), 'package.json')
  if (!fs.existsSync(pkgPath)) return 'Unknown'
  const pkg = fs.readJsonSync(pkgPath)
  const deps = { ...pkg.dependencies, ...pkg.devDependencies } || {}
  if (deps.next) return 'Next.js'
  if (deps['@remix-run/react']) return 'Remix'
  if (deps.vite) return 'Vite'
  if (deps.expo) return 'Expo'
  if (deps['react-native']) return 'React Native'
  return 'React'
}

async function installPackage(pm: string) {
  const { execSync } = require('child_process')
  const cmd = pm === 'npm' ? 'npm install' : pm === 'yarn' ? 'yarn add' : pm === 'pnpm' ? 'pnpm add' : 'bun add'
  execSync(`${cmd} @luma/ui`, { cwd: process.cwd(), stdio: 'pipe' })
}

async function createConfig(typescript: boolean) {
  const ext = typescript ? 'ts' : 'js'
  const configContent = `// Luma UI Configuration
export default {
  theme: {
    primary: '#3b82f6',
    // Customize your theme here
  },
  // Add component-specific overrides
  components: {},
}
`
  fs.writeFileSync(path.resolve(process.cwd(), `luma.config.${ext}`), configContent)
}

async function addProvider(framework: string, typescript: boolean) {
  const ext = typescript ? 'tsx' : 'jsx'
  // Try to find layout/app file
  const possibleFiles = [
    'src/app/layout.tsx', 'src/app/layout.jsx', 'app/layout.tsx', 'app/layout.jsx',
    'src/App.tsx', 'src/App.jsx', 'App.tsx', 'App.jsx',
    'pages/_app.tsx', 'pages/_app.jsx',
  ]

  const providerCode = `import { LumaProvider } from '@luma/ui'

// Wrap your app with LumaProvider
// <LumaProvider>
//   <YourApp />
// </LumaProvider>
`

  for (const file of possibleFiles) {
    const fullPath = path.resolve(process.cwd(), file)
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf-8')
      if (!content.includes('LumaProvider')) {
        const importLine = typescript
          ? `import { LumaProvider } from '@luma/ui'\n`
          : `import { LumaProvider } from '@luma/ui'\n`
        console.log(chalk.dim(`\n  ℹ Add LumaProvider to ${file}:\n${importLine}`))
      }
      return
    }
  }
  console.log(chalk.dim(`\n  ℹ Add LumaProvider to your app root. Example:\n${providerCode}`))
}
