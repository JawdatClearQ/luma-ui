import { Command } from 'commander'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'

const COMPONENT_LIST = [
  'Button', 'Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch', 'Slider',
  'Modal', 'Drawer', 'Tooltip', 'Popover', 'Toast', 'Alert', 'Card', 'Table',
  'Avatar', 'Badge', 'Tabs', 'Breadcrumb', 'Pagination', 'Progress', 'Spinner',
  'Skeleton', 'Accordion', 'Box', 'Flex', 'Grid', 'Container', 'Stack',
  'FormControl', 'FormLabel', 'Heading', 'Text', 'Paragraph', 'Link', 'List',
]

export async function addCommand(components: string[], options: { all?: boolean }) {
  const targetDir = process.cwd()

  if (options.all || components.includes('--all')) {
    components = COMPONENT_LIST
  }

  if (components.length === 0) {
    // Interactive selection
    const { default: inquirer } = await import('inquirer')
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'components',
        message: 'Select components to add:',
        choices: COMPONENT_LIST.map(c => ({ name: c, value: c })),
        validate: (input: string[]) => input.length > 0 || 'Select at least one component',
      },
    ])
    components = answers.components
  }

  const spinner = ora(`Adding ${components.length} component(s)...`).start()

  // Create components directory
  const componentsDir = path.join(targetDir, 'components', 'ui')
  await fs.ensureDir(componentsDir)

  // For each component, we need to create the component file.
  // Since @luma/ui is installed as a dependency, we just need to document usage.
  // The actual component source is in node_modules.
  // We'll create wrapper files that re-export from @luma/ui (shadcn-style).

  for (const component of components) {
    const componentPath = path.join(componentsDir, `${component.toLowerCase()}.tsx`)
    const content = `import { ${component} as Luma${component} } from '@luma/ui'
import type { ${component}Props } from '@luma/ui'

export function ${component}(props: ${component}Props) {
  return <Luma${component} {...props} />
}

export type { ${component}Props }
`
    await fs.writeFile(componentPath, content)
  }

  spinner.succeed(`Added ${components.length} component(s)`)

  // Install required deps
  const installSpinner = ora('Ensuring dependencies...').start()
  try {
    const { execSync } = require('child_process')
    execSync(`npm install @luma/ui`, { cwd: targetDir, stdio: 'pipe' })
    installSpinner.succeed('Dependencies installed')
  } catch {
    installSpinner.fail('Could not install dependencies')
  }

  console.log(chalk.green(`\n  ✨ ${components.length} component(s) added successfully!\n`))
  console.log(`  ${chalk.dim('Import from:')} ${chalk.cyan('@/components/ui/button')}\n`)
  console.log(chalk.dim('  Built with Luma.\n'))
}
