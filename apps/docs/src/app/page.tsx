import Link from 'next/link'

const features = [
  {
    title: 'Cross-Platform',
    description: 'Works on React Native (iOS/Android), React Native Web, and Next.js/Remix/Vite.',
    icon: '📱',
  },
  {
    title: 'Accessible',
    description: 'WAI-ARIA compliant, keyboard navigable, screen reader friendly.',
    icon: '♿',
  },
  {
    title: 'Dark Mode',
    description: 'Built-in dark mode support with system preference detection.',
    icon: '🌙',
  },
  {
    title: 'TypeScript First',
    description: 'Fully typed with comprehensive type definitions.',
    icon: '📘',
  },
  {
    title: 'Tree-shakeable',
    description: 'Only bundle what you import with zero-cost abstractions.',
    icon: '🌳',
  },
  {
    title: 'Beautiful Animations',
    description: 'Smooth, meaningful animations that respect prefers-reduced-motion.',
    icon: '✨',
  },
]

const categories = [
  { name: 'Layout', components: 'Box, Flex, Grid, Container, Stack, Spacer, Divider, AspectRatio' },
  { name: 'Typography', components: 'Text, Heading, Paragraph, Code, Blockquote, List, Link' },
  { name: 'Form', components: 'Input, Textarea, Select, Checkbox, Radio, Switch, Slider, DatePicker' },
  { name: 'Button', components: 'Button, IconButton, ButtonGroup, FloatingActionButton' },
  { name: 'Navigation', components: 'Breadcrumb, Tabs, Stepper, Pagination, SkipNav' },
  { name: 'Overlay', components: 'Modal, Drawer, Popover, Tooltip, DropdownMenu, Dialog' },
  { name: 'Data Display', components: 'Avatar, Badge, Chip, Card, Table, DataTable, Stat, Timeline' },
  { name: 'Feedback', components: 'Alert, Toast, Progress, Skeleton, Spinner, EmptyState' },
  { name: 'Media', components: 'Image, Icon, Carousel, Gallery, Lightbox' },
  { name: 'Utility', components: 'Portal, VisuallyHidden, Collapse, Accordion, ScrollArea' },
  { name: 'Advanced', components: 'CommandPalette, SearchBar, Autocomplete, Combobox, RichTextEditor' },
]

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 0',
    borderBottom: '1px solid #e2e8f0',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  hero: {
    textAlign: 'center' as const,
    padding: '6rem 0 4rem',
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroTagline: {
    fontSize: '1.25rem',
    color: '#64748b',
    marginBottom: '0.5rem',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  heroDesc: {
    fontSize: '1.25rem',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto 2.5rem',
    lineHeight: 1.7,
  },
  ctaRow: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  ctaPrimary: {
    display: 'inline-block',
    padding: '0.875rem 2rem',
    background: '#3b82f6',
    color: '#fff',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  ctaSecondary: {
    display: 'inline-block',
    padding: '0.875rem 2rem',
    background: 'transparent',
    color: '#3b82f6',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1rem',
    border: '2px solid #3b82f6',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  section: {
    padding: '5rem 0',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    textAlign: 'center' as const,
    marginBottom: '3rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    background: 'var(--background)',
    transition: 'box-shadow 0.2s, transform 0.2s',
    cursor: 'default',
  },
  cardIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  cardDesc: {
    color: '#64748b',
    lineHeight: 1.6,
  },
  codeBlock: {
    background: '#1e293b',
    color: '#e2e8f0',
    padding: '1.5rem',
    borderRadius: '8px',
    overflowX: 'auto' as const,
    fontSize: '0.875rem',
    lineHeight: 1.7,
    marginBottom: '1rem',
  },
  codeComment: { color: '#94a3b8' },
  codeKeyword: { color: '#c084fc' },
  codeString: { color: '#34d399' },
  codeFn: { color: '#60a5fa' },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
  },
  categoryCard: {
    padding: '1.5rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
  },
  categoryName: {
    fontSize: '1rem',
    fontWeight: 700,
    marginBottom: '0.75rem',
    color: '#3b82f6',
  },
  categoryList: {
    color: '#64748b',
    lineHeight: 1.8,
    fontSize: '0.9rem',
  },
  footer: {
    textAlign: 'center' as const,
    padding: '3rem 0',
    borderTop: '1px solid #e2e8f0',
    color: '#64748b',
  },
}

export default function Home() {
  return (
    <div>
      <nav style={styles.nav}>
        <div style={styles.container}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: '1.25rem' }}>Luma UI</strong>
            <div style={styles.navLinks}>
              <Link href="/">Home</Link>
              <Link href="/installation">Installation</Link>
              <Link href="/components">Components</Link>
              <a href="https://github.com/luma-ui/luma" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </nav>

      <section style={{ ...styles.hero, ...styles.container }}>
        <p style={styles.heroTagline}>Built with Luma.</p>
        <h1 style={styles.heroTitle}>Luma UI</h1>
        <p style={styles.heroDesc}>
          A beautiful, accessible, cross-platform component library for React and React Native. Light up your UI.
        </p>
        <div style={styles.ctaRow}>
          <Link href="/installation" style={styles.ctaPrimary}>Get Started</Link>
          <Link href="/components" style={styles.ctaSecondary}>Browse Components</Link>
        </div>
      </section>

      <section style={{ ...styles.section, background: '#f8fafc' }}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Features</h2>
          <div style={styles.grid}>
            {features.map((f) => (
              <div key={f.title} style={styles.card}>
                <div style={styles.cardIcon}>{f.icon}</div>
                <h3 style={styles.cardTitle}>{f.title}</h3>
                <p style={styles.cardDesc}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Quick Start</h2>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <pre style={styles.codeBlock}>
              <span style={styles.codeComment}># Install Luma UI</span>{'\n'}
              <span style={styles.codeFn}>npm</span> install <span style={styles.codeString}>@luma/ui</span>
            </pre>
            <pre style={styles.codeBlock}>
              <span style={styles.codeComment}>// Import and use components</span>{'\n'}
              <span style={styles.codeKeyword}>import</span> {'{'} Button, Text, Container {'}'} <span style={styles.codeKeyword}>from</span> <span style={styles.codeString}>'@luma/ui'</span>{'\n\n'}
              <span style={styles.codeKeyword}>function</span> <span style={styles.codeFn}>App</span>() {'{'}{'\n'}
              {'  '}<span style={styles.codeKeyword}>return</span> ({'\n'}
              {'    '}&lt;Container&gt;{'\n'}
              {'      '}&lt;Text variant=<span style={styles.codeString}>"h1"</span>&gt;Welcome to Luma&lt;/Text&gt;{'\n'}
              {'      '}&lt;Button variant=<span style={styles.codeString}>"primary"</span>&gt;Get Started&lt;/Button&gt;{'\n'}
              {'    '}&lt;/Container&gt;{'\n'}
              {'  '}){'\n'}
              {'}'}
            </pre>
          </div>
        </div>
      </section>

      <section style={{ ...styles.section, background: '#f8fafc' }}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Components</h2>
          <div style={styles.categoryGrid}>
            {categories.map((cat) => (
              <div key={cat.name} style={styles.categoryCard}>
                <div style={styles.categoryName}>{cat.name}</div>
                <div style={styles.categoryList}>{cat.components}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/components" style={styles.ctaSecondary}>View All Components →</Link>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.container}>
          <p>Built with Luma.</p>
        </div>
      </footer>
    </div>
  )
}
