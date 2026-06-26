'use client'

import Link from 'next/link'
import { useState } from 'react'

const categories = [
  {
    name: 'Layout',
    description: 'Build responsive layouts with ease.',
    components: [
      { name: 'Box', desc: 'A primitive box element with responsive style props.' },
      { name: 'Flex', desc: 'Flexbox container with gap and alignment controls.' },
      { name: 'Grid', desc: 'CSS Grid container with responsive column definitions.' },
      { name: 'Container', desc: 'Centered container with max-width constraint.' },
      { name: 'Stack', desc: 'Stack children vertically or horizontally with consistent spacing.' },
      { name: 'Spacer', desc: 'Flexible spacer for distributing space in layouts.' },
      { name: 'Divider', desc: 'Visual separator between sections.' },
      { name: 'AspectRatio', desc: 'Container that maintains a specific aspect ratio.' },
    ],
  },
  {
    name: 'Typography',
    description: 'Text components with consistent styling.',
    components: [
      { name: 'Text', desc: 'Base text component with variant and size props.' },
      { name: 'Heading', desc: 'Heading component for section titles (h1-h6).' },
      { name: 'Paragraph', desc: 'Paragraph text with proper line-height.' },
      { name: 'Code', desc: 'Inline code and code block display.' },
      { name: 'Blockquote', desc: 'Quoted text with styling.' },
      { name: 'List', desc: 'Ordered and unordered lists.' },
      { name: 'Link', desc: 'Anchor link component with variants.' },
    ],
  },
  {
    name: 'Form',
    description: 'Form inputs and controls.',
    components: [
      { name: 'Input', desc: 'Text input with label and validation states.' },
      { name: 'Textarea', desc: 'Multi-line text input.' },
      { name: 'Select', desc: 'Native select dropdown.' },
      { name: 'Checkbox', desc: 'Checkbox input with label.' },
      { name: 'Radio', desc: 'Radio input group.' },
      { name: 'Switch', desc: 'Toggle switch component.' },
      { name: 'Slider', desc: 'Range slider input.' },
      { name: 'NumberInput', desc: 'Numeric input with increment/decrement.' },
      { name: 'PinInput', desc: 'One-time code/pin input.' },
      { name: 'ColorPicker', desc: 'Color selection input.' },
      { name: 'DatePicker', desc: 'Date selection component.' },
      { name: 'FileInput', desc: 'File upload input.' },
      { name: 'FormControl', desc: 'Wrapper for form inputs with label and error.' },
      { name: 'FormLabel', desc: 'Form field label.' },
      { name: 'FormErrorMessage', desc: 'Validation error message.' },
      { name: 'FormHelperText', desc: 'Helper text below form fields.' },
    ],
  },
  {
    name: 'Button',
    description: 'Clickable action elements.',
    components: [
      { name: 'Button', desc: 'Primary action button with variants.' },
      { name: 'IconButton', desc: 'Circular button for icon-only actions.' },
      { name: 'ButtonGroup', desc: 'Group of connected buttons.' },
      { name: 'FloatingActionButton', desc: 'FAB for primary actions.' },
      { name: 'CloseButton', desc: 'Close/dismiss button.' },
      { name: 'BackButton', desc: 'Navigation back button.' },
    ],
  },
  {
    name: 'Navigation',
    description: 'Navigation and routing components.',
    components: [
      { name: 'Breadcrumb', desc: 'Breadcrumb trail for navigation hierarchy.' },
      { name: 'Tabs', desc: 'Tabbed content switcher.' },
      { name: 'Stepper', desc: 'Multi-step progress indicator.' },
      { name: 'Pagination', desc: 'Page navigation control.' },
      { name: 'SkipNav', desc: 'Skip-to-content link for accessibility.' },
    ],
  },
  {
    name: 'Overlay',
    description: 'Overlay and floating components.',
    components: [
      { name: 'Modal', desc: 'Dialog modal overlay.' },
      { name: 'Drawer', desc: 'Slide-in panel from any edge.' },
      { name: 'Popover', desc: 'Floating popover triggered by click.' },
      { name: 'Tooltip', desc: 'Hover tooltip with positioning.' },
      { name: 'DropdownMenu', desc: 'Context menu dropdown.' },
      { name: 'Dialog', desc: 'Alert dialog for confirmations.' },
      { name: 'ActionSheet', desc: 'Bottom sheet action menu.' },
    ],
  },
  {
    name: 'Data Display',
    description: 'Display data and information.',
    components: [
      { name: 'Avatar', desc: 'User avatar with image or initials.' },
      { name: 'AvatarGroup', desc: 'Stacked avatar group.' },
      { name: 'Badge', desc: 'Notification badge.' },
      { name: 'Chip', desc: 'Compact chip/tag element.' },
      { name: 'Tag', desc: 'Label tag for categorization.' },
      { name: 'Card', desc: 'Content container card.' },
      { name: 'Table', desc: 'Data table with headers and rows.' },
      { name: 'DataTable', desc: 'Advanced data table with sorting and filtering.' },
      { name: 'Stat', desc: 'Statistical display card.' },
      { name: 'KPI', desc: 'Key performance indicator.' },
      { name: 'Timeline', desc: 'Chronological timeline display.' },
      { name: 'TreeView', desc: 'Hierarchical tree view.' },
    ],
  },
  {
    name: 'Feedback',
    description: 'User feedback and status indicators.',
    components: [
      { name: 'Alert', desc: 'Contextual alert banner.' },
      { name: 'Toast', desc: 'Temporary notification toast.' },
      { name: 'Progress', desc: 'Progress bar indicator.' },
      { name: 'Skeleton', desc: 'Skeleton loading placeholder.' },
      { name: 'Spinner', desc: 'Loading spinner indicator.' },
      { name: 'EmptyState', desc: 'Empty state placeholder.' },
      { name: 'ErrorBoundary', desc: 'React error boundary fallback.' },
      { name: 'Result', desc: 'Success/error result display.' },
    ],
  },
  {
    name: 'Media',
    description: 'Media display components.',
    components: [
      { name: 'Image', desc: 'Optimized image component.' },
      { name: 'Icon', desc: 'Icon component with library support.' },
      { name: 'Carousel', desc: 'Image/content carousel.' },
      { name: 'Gallery', desc: 'Image gallery grid.' },
      { name: 'Lightbox', desc: 'Full-screen image viewer.' },
    ],
  },
  {
    name: 'Utility',
    description: 'Utility and helper components.',
    components: [
      { name: 'Portal', desc: 'Portal children to a different DOM node.' },
      { name: 'VisuallyHidden', desc: 'Visually hidden but accessible element.' },
      { name: 'Collapse', desc: 'Collapsible content with animation.' },
      { name: 'Accordion', desc: 'Expandable accordion sections.' },
      { name: 'ScrollArea', desc: 'Custom scrollable container.' },
      { name: 'Sticky', desc: 'Sticky positioned element.' },
      { name: 'NoSsr', desc: 'Skip server-side rendering for children.' },
      { name: 'ClientOnly', desc: 'Only render children on the client.' },
      { name: 'InfiniteScroll', desc: 'Infinite scroll container.' },
    ],
  },
  {
    name: 'Advanced',
    description: 'Advanced and complex components.',
    components: [
      { name: 'CommandPalette', desc: 'Command/action search palette.' },
      { name: 'SearchBar', desc: 'Search input with suggestions.' },
      { name: 'Autocomplete', desc: 'Autocomplete input field.' },
      { name: 'Combobox', desc: 'Combobox with dropdown options.' },
      { name: 'MentionInput', desc: 'Input with @mention support.' },
      { name: 'RichTextEditor', desc: 'Rich text editing component.' },
      { name: 'Markdown', desc: 'Markdown renderer.' },
      { name: 'QRCode', desc: 'QR code generator.' },
      { name: 'SignaturePad', desc: 'Signature drawing pad.' },
      { name: 'Calendar', desc: 'Full calendar component.' },
      { name: 'Kanban', desc: 'Kanban board component.' },
    ],
  },
]

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 0',
    borderBottom: '1px solid #e2e8f0',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: '0.5rem',
    paddingTop: '3rem',
  },
  pageDesc: {
    color: '#64748b',
    fontSize: '1.125rem',
    marginBottom: '3rem',
  },
  categoryCard: {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    marginBottom: '1rem',
    overflow: 'hidden',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem 1.5rem',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left' as const,
    fontSize: '1rem',
    fontFamily: 'inherit',
    color: 'inherit',
  },
  categoryName: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#3b82f6',
  },
  categoryDesc: {
    color: '#64748b',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  chevron: {
    fontSize: '1.25rem',
    transition: 'transform 0.2s',
    color: '#94a3b8',
  },
  compList: {
    padding: '0 1.5rem 1.25rem',
  },
  compRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 0',
    borderBottom: '1px solid #f1f5f9',
  },
  compName: {
    fontWeight: 600,
    fontSize: '0.95rem',
  },
  compDesc: {
    color: '#64748b',
    fontSize: '0.85rem',
  },
  compLink: {
    color: '#3b82f6',
    fontSize: '0.85rem',
    textDecoration: 'none',
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '2rem',
    color: '#64748b',
  },
  footer: {
    textAlign: 'center' as const,
    padding: '3rem 0',
    borderTop: '1px solid #e2e8f0',
    color: '#64748b',
    marginTop: '4rem',
  },
}

function Category({ category }: { category: typeof categories[number] }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={styles.categoryCard}>
      <button
        onClick={() => setOpen(!open)}
        style={styles.categoryHeader}
        aria-expanded={open}
      >
        <div>
          <div style={styles.categoryName}>{category.name}</div>
          <div style={styles.categoryDesc}>{category.description}</div>
        </div>
        <span style={{ ...styles.chevron, transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▼
        </span>
      </button>
      {open && (
        <div style={styles.compList}>
          {category.components.map((comp) => (
            <div key={comp.name} style={styles.compRow}>
              <div>
                <div style={styles.compName}>{comp.name}</div>
                <div style={styles.compDesc}>{comp.desc}</div>
              </div>
              <Link href={`/components/${comp.name.toLowerCase()}`} style={styles.compLink}>
                Docs →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Components() {
  return (
    <div>
      <nav style={styles.nav}>
        <strong style={{ fontSize: '1.25rem' }}>Luma UI</strong>
        <div style={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/installation">Installation</Link>
          <Link href="/components">Components</Link>
        </div>
      </nav>

      <div style={styles.container}>
        <Link href="/" style={styles.backLink}>← Back to Home</Link>
        <h1 style={styles.pageTitle}>Components</h1>
        <p style={styles.pageDesc}>
          Luma UI ships with 80+ components organized into categories. Click a category to expand and explore.
        </p>

        {categories.map((cat) => (
          <Category key={cat.name} category={cat} />
        ))}
      </div>

      <footer style={styles.footer}>
        <p>Built with Luma.</p>
      </footer>
    </div>
  )
}
