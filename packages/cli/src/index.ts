import { Command } from 'commander'
import { initCommand } from './commands/init'
import { addCommand } from './commands/add'
import { listCommand } from './commands/list'

const program = new Command()

program
  .name('luma')
  .description('Luma UI component library CLI - Built with Luma.')
  .version('1.0.0')

program
  .command('init')
  .description('Initialize Luma in a project')
  .action(initCommand)

program
  .command('add [components...]')
  .description('Add components to project')
  .option('--all', 'Add all components')
  .action((components: string[], options: { all?: boolean }) => {
    addCommand(components, options)
  })

program
  .command('list')
  .description('List available components')
  .action(listCommand)

program
  .command('update [components...]')
  .description('Update components')
  .action((components: string[]) => {
    console.log('Update command not yet implemented')
  })

program
  .command('check')
  .description('Check for updates')
  .action(() => {
    console.log('Check command not yet implemented')
  })

program.parse(process.argv)
