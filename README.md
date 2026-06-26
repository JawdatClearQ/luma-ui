# 🌟 Luma UI

> **Built with Luma.**

A beautiful, accessible, cross-platform component library for React and React Native. Light up your UI.

[![npm version](https://img.shields.io/npm/v/@luma/ui.svg)](https://www.npmjs.com/package/@luma/ui)
[![license](https://img.shields.io/npm/l/@luma/ui.svg)](https://github.com/luma-ui/luma/blob/main/LICENSE)

## ✨ Features

- **Cross-Platform** — Works on React Native (iOS/Android), React Native Web, and Next.js/Remix/Vite
- **Accessible** — WAI-ARIA compliant, keyboard navigable, screen reader friendly
- **Dark Mode** — Built-in dark mode support with system preference detection
- **TypeScript** — Fully typed with comprehensive type definitions
- **Tree-shakeable** — Only bundle what you import
- **Animations** — Smooth, meaningful animations that respect `prefers-reduced-motion`
- **Responsive** — All components adapt to any screen size
- **RTL Support** — Right-to-left language support throughout

## 📦 Installation

```bash
npm install @luma/ui
```

### Quick Start

```tsx
import { Button, Text, Container } from '@luma/ui'

function App() {
  return (
    <Container>
      <Text variant="h1">Welcome to Luma</Text>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </Container>
  )
}
```

### Framework Guides

<details>
<summary>Next.js</summary>

```tsx
// app/layout.tsx
import { LumaProvider } from '@luma/ui'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LumaProvider>{children}</LumaProvider>
      </body>
    </html>
  )
}
```
</details>

## 🎨 Components

### Layout
Box, Flex, Grid, Container, Stack, Spacer, Divider, AspectRatio

### Typography
Text, Heading, Paragraph, Code, Blockquote, List, Link

### Form
Input, Textarea, Select, Checkbox, Radio, Switch, Slider, NumberInput, PinInput, ColorPicker, DatePicker, FileInput, FormControl, FormLabel, FormErrorMessage, FormHelperText

### Button
Button, IconButton, ButtonGroup, FloatingActionButton, CloseButton, BackButton

### Navigation
Breadcrumb, Tabs, Stepper, Pagination, SkipNav

### Overlay
Modal, Drawer, Popover, Tooltip, DropdownMenu, Dialog, ActionSheet

### Data Display
Avatar, AvatarGroup, Badge, Chip, Tag, Card, Table, DataTable, Stat, KPI, Timeline, TreeView

### Feedback
Alert, Toast, Progress, Skeleton, Spinner, EmptyState, ErrorBoundary, Result

### Media
Image, Icon, Carousel, Gallery, Lightbox

### Utility
Portal, VisuallyHidden, Collapse, Accordion, ScrollArea, Sticky, NoSsr, ClientOnly, InfiniteScroll

### Advanced
CommandPalette, SearchBar, Autocomplete, Combobox, MentionInput, RichTextEditor, Markdown, QRCode, SignaturePad, Calendar, Kanban

## 🪝 Hooks

useDisclosure, useMediaQuery, useClipboard, useDebounce, useLocalStorage, useEventListener, useIntersectionObserver, useIdle, useWindowSize, useScrollPosition, useHover, useFocus, useBreakpointValue, useColorMode, useToast, useForm, usePagination, useInfiniteScroll

## 🛠 CLI

```bash
# Initialize Luma in your project
npx luma init

# Add components
npx luma add button
npx luma add button modal toast
npx luma add button --all

# List all available components
npx luma list

# Update components
npx luma update
```

## 📄 License

MIT

---

<p align="center">Built with Luma.</p>
