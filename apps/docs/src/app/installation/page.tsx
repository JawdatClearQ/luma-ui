import Link from 'next/link'

const s = {
  c: { maxWidth: '900px', margin: '0 auto', padding: '0 2rem' },
  n: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 0', borderBottom: '1px solid #e2e8f0', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' },
  nl: { display: 'flex', gap: '2rem', alignItems: 'center' },
  pt: { fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', paddingTop: '3rem' },
  pd: { color: '#64748b', fontSize: '1.125rem', marginBottom: '3rem' },
  se: { marginBottom: '3rem' },
  st: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' },
  cb: { background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto' as const, fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem', fontFamily: "'JetBrains Mono','Fira Code',monospace" },
  gc: { padding: '1.5rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1rem' },
  gt: { fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' },
  gtxt: { color: '#64748b', lineHeight: 1.7, marginBottom: '0.75rem' },
  bl: { display: 'inline-block', marginBottom: '2rem', color: '#64748b' },
  f: { textAlign: 'center' as const, padding: '3rem 0', borderTop: '1px solid #e2e8f0', color: '#64748b', marginTop: '4rem' },
  cta: { display: 'inline-block', padding: '0.75rem 1.5rem', background: '#3b82f6', color: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' },
}

export default function Installation() {
  return (
    <div>
      <nav style={s.n}>
        <strong style={{ fontSize: '1.25rem' }}>Luma UI</strong>
        <div style={s.nl}>
          <Link href="/">Home</Link>
          <Link href="/installation">Installation</Link>
          <Link href="/components">Components</Link>
        </div>
      </nav>

      <div style={s.c}>
        <Link href="/" style={s.bl}>← Back to Home</Link>
        <h1 style={s.pt}>Installation</h1>
        <p style={s.pd}>Get Luma UI up and running in your project in minutes.</p>

        <div style={s.se}>
          <h2 style={s.st}>npm</h2>
          <pre style={s.cb}>npm install @luma/ui</pre>
          <pre style={s.cb}>{`# or with yarn
yarn add @luma/ui

# or with pnpm
pnpm add @luma/ui`}</pre>
        </div>

        <div style={s.se}>
          <h2 style={s.st}>Quick Start</h2>
          <pre style={s.cb}>{`import { Button, Text, Container } from '@luma/ui'

function App() {
  return (
    <Container>
      <Text variant="h1">Welcome to Luma</Text>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </Container>
  )
}`}</pre>
        </div>

        <div style={s.se}>
          <h2 style={s.st}>Provider Setup</h2>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1rem' }}>
            Wrap your application with LumaProvider to enable theming, dark mode, and global configuration.
          </p>
          <pre style={s.cb}>{`import { LumaProvider } from '@luma/ui'

function App() {
  return (
    <LumaProvider theme="light">
      <YourApp />
    </LumaProvider>
  )
}`}</pre>
        </div>

        <div style={s.se}>
          <h2 style={s.st}>Theme Customization</h2>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '1rem' }}>
            Customize the theme by passing a configuration object to LumaProvider:
          </p>
          <pre style={s.cb}>{`import { LumaProvider } from '@luma/ui'

const theme = {
  colors: {
    primary: '#6366f1',
    background: '#0f172a',
    foreground: '#f8fafc',
  },
}

function App() {
  return (
    <LumaProvider themeConfig={theme}>
      <YourApp />
    </LumaProvider>
  )
}`}</pre>
        </div>

        <div style={s.se}>
          <h2 style={s.st}>Framework Guides</h2>

          <div style={s.gc}>
            <h3 style={s.gt}>Next.js</h3>
            <p style={s.gtxt}>
              Luma UI works seamlessly with Next.js App Router and Pages Router. Add the LumaProvider to your root layout.
            </p>
            <pre style={s.cb}>{`// app/layout.tsx
import { LumaProvider } from '@luma/ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LumaProvider>{children}</LumaProvider>
      </body>
    </html>
  )
}`}</pre>
          </div>

          <div style={s.gc}>
            <h3 style={s.gt}>Vite</h3>
            <p style={s.gtxt}>
              For Vite projects, wrap your app with LumaProvider in main.tsx or App.tsx.
            </p>
            <pre style={s.cb}>{`// src/main.tsx
import { LumaProvider } from '@luma/ui'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LumaProvider>
    <App />
  </LumaProvider>
)`}</pre>
          </div>

          <div style={s.gc}>
            <h3 style={s.gt}>Expo / React Native</h3>
            <p style={s.gtxt}>
              For Expo and React Native projects, wrap your app at the entry point.
            </p>
            <pre style={s.cb}>{`// App.tsx
import { LumaProvider } from '@luma/ui'
import { SafeAreaView } from 'react-native'

export default function App() {
  return (
    <LumaProvider>
      <SafeAreaView>
        <Text>Hello Luma</Text>
      </SafeAreaView>
    </LumaProvider>
  )
}`}</pre>
          </div>
        </div>

        <div style={s.se}>
          <h2 style={s.st}>Next Steps</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/components" style={s.cta}>
              Browse Components →
            </Link>
          </div>
        </div>
      </div>

      <footer style={s.f}>
        <p>Built with Luma.</p>
      </footer>
    </div>
  )
}
