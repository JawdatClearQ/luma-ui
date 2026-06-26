import chalk from 'chalk'

const COMPONENT_CATEGORIES: Record<string, string[]> = {
  Layout: ['Box', 'Flex', 'Grid', 'Container', 'Stack', 'Spacer', 'Divider', 'AspectRatio'],
  Typography: ['Text', 'Heading', 'Paragraph', 'Code', 'Blockquote', 'List', 'Link'],
  Form: ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch', 'Slider', 'NumberInput', 'PinInput', 'ColorPicker', 'DatePicker', 'FileInput', 'FormControl', 'FormLabel', 'FormErrorMessage', 'FormHelperText'],
  Button: ['Button', 'IconButton', 'ButtonGroup', 'FloatingActionButton', 'CloseButton', 'BackButton'],
  Navigation: ['Breadcrumb', 'Tabs', 'Stepper', 'Pagination', 'SkipNav'],
  Overlay: ['Modal', 'Drawer', 'Popover', 'Tooltip', 'DropdownMenu', 'Dialog', 'ActionSheet'],
  'Data Display': ['Avatar', 'AvatarGroup', 'Badge', 'Chip', 'Tag', 'Card', 'Table', 'DataTable', 'Stat', 'KPI', 'Timeline', 'TreeView'],
  Feedback: ['Alert', 'Toast', 'Progress', 'Skeleton', 'Spinner', 'EmptyState', 'ErrorBoundary', 'Result'],
  Media: ['Image', 'Icon', 'Carousel', 'Gallery', 'Lightbox'],
  Utility: ['Portal', 'VisuallyHidden', 'Collapse', 'Accordion', 'ScrollArea', 'Sticky', 'NoSsr', 'ClientOnly', 'InfiniteScroll'],
  'Layout Patterns': ['Sidebar', 'Header', 'Footer', 'SplitPane', 'Masonry'],
  Advanced: ['CommandPalette', 'SearchBar', 'Autocomplete', 'Combobox', 'MentionInput', 'RichTextEditor', 'Markdown', 'QRCode', 'SignaturePad', 'Calendar', 'Kanban'],
}

export async function listCommand() {
  console.log(chalk.cyan('\n  📦 Luma UI Components\n'))

  let total = 0
  for (const [category, components] of Object.entries(COMPONENT_CATEGORIES)) {
    console.log(`  ${chalk.bold(category)}`)
    for (const comp of components) {
      console.log(`    ${chalk.green('✓')} ${comp}`)
      total++
    }
    console.log('')
  }

  console.log(chalk.dim(`  Total: ${total} components\n`))
  console.log(chalk.dim('  Built with Luma.\n'))
}
