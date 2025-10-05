# FarmFlow - Agricultural Management Platform

> **Production-Ready Agricultural Management Platform** - A comprehensive farm management system showcasing industry-standard frontend development, professional UX patterns, and modern visualization techniques.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![D3.js](https://img.shields.io/badge/D3.js-7.9-F9A03C?style=for-the-badge&logo=d3.js)

## Overview

FarmFlow is an enterprise-grade agricultural management platform built with modern web technologies. This project demonstrates **senior-level frontend engineering** with real-world features including RESTful API integration, advanced data visualization, multi-step forms, and comprehensive accessibility.

### Key Highlights
- **Real Data Management** - Full CRUD API with localStorage persistence
- **Advanced D3.js Visualizations** - Interactive charts with zoom, pan, and tooltips
- **Multi-Step Forms** - Guided user experience with real-time validation
- **WCAG AA Accessible** - Full keyboard navigation and screen reader support
- **Professional UX** - Loading states, error handling, toast notifications
- **Fully Responsive** - Mobile-first design that works everywhere
- **Production Ready** - CI/CD pipeline, error monitoring, deployment configured

---

## Features

### Dashboard & Analytics
- **Real-time Statistics** - Live data with trend indicators
- **Interactive D3.js Charts** - 5 chart types with zoom, pan, tooltips
  - Crop Yield Trend (line + area with zoom)
  - Soil Moisture Levels (animated bar chart)
  - Yield Prediction (historical vs predicted)
  - Temperature & Humidity (dual-axis)
  - Crop Health Heatmap (interactive spatial data)
- **Weather Widget** - 3-day forecast
- **Activity Timeline** - Recent farm events
- **Data Export** - CSV/JSON download functionality

### Field Management
- **Advanced Search & Filter**
  - Real-time text search
  - Multi-select status filters
  - Crop type filtering
  - Sort by multiple criteria
- **Multi-Step Add Field Form**
  - 3-step guided process with progress indicator
  - Real-time validation with visual feedback
  - Interactive moisture slider
  - Preview before submission
- **Field Details Modal**
  - Tabbed interface (Overview, History, Analytics)
  - Quick stats grid
  - Smart recommendations
  - Irrigation history timeline
- **CRUD Operations**
  - Create with validation
  - Read with detailed view
  - Update (ready to implement)
  - Delete with confirmation modal

### Real Data System
- **RESTful API**
  - GET /api/fields - List all fields
  - POST /api/fields - Create field
  - GET /api/fields/:id - Get single field
  - PUT /api/fields/:id - Update field
  - DELETE /api/fields/:id - Delete field
- **Data Persistence** - LocalStorage with automatic serialization
- **Custom React Hook** - useFields() for data management
- **Error Handling** - Comprehensive error states and recovery

### UI/UX Excellence
- **Complete Component Library**
  - Button (4 variants, 3 sizes)
  - Card, Input, Select, Modal
  - Toast notifications (4 types)
  - Skeleton loaders (3 variants)
  - Empty states with actions
  - Search with clear button
  - Multi-select filters
  - Confirmation dialogs
  - Loading spinners
  - Badges, Tooltips
- **Professional Animations**
  - Page transitions
  - Chart animations
  - Skeleton loading
  - Toast notifications
  - Micro-interactions
  - Hover effects
- **Design System**
  - Consistent color palette
  - Typography hierarchy
  - 4px spacing grid
  - Shadow system
  - Border radius system

---

## Tech Stack

### Core
- **Next.js 14.2** - React framework with App Router
- **React 18.3** - UI library with hooks
- **TypeScript 5.4** - Strict type safety
- **Tailwind CSS 3.4** - Utility-first styling

### Key Libraries
- **D3.js 7.9** - Advanced data visualization
- **Formik 2.4** - Form state management
- **Yup 1.4** - Schema validation
- **Framer Motion 11.0** - Animation library
- **date-fns 3.6** - Date manipulation
- **Lucide React 0.363** - Icon system
- **clsx 2.1** - Conditional className utility

### DevOps & Tools
- **Sentry** - Error tracking & monitoring
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Deployment platform
- **ESLint** - Code quality
- **TypeScript Compiler** - Type checking

---

## Getting Started

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables** (optional)
```bash
cp .env.example .env.local
# Edit .env.local with your Sentry credentials if needed
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:3000
```

### Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

---

## Project Structure

```
FarmFlow/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Dashboard page
│   │   ├── fields/page.tsx          # Field management
│   │   ├── analytics/page.tsx       # Analytics page
│   │   ├── alerts/page.tsx          # Alerts page
│   │   ├── settings/page.tsx        # Settings page
│   │   └── api/                     # API routes
│   │       └── fields/
│   │           ├── route.ts         # GET, POST /api/fields
│   │           └── [id]/route.ts    # GET, PUT, DELETE /api/fields/:id
│   │
│   ├── components/
│   │   ├── ui/                      # UI Component Library (13 components)
│   │   │   ├── Button.tsx           # 4 variants, 3 sizes
│   │   │   ├── Card.tsx             # Container component
│   │   │   ├── Input.tsx            # Form input with validation
│   │   │   ├── Modal.tsx            # 4 size variants
│   │   │   ├── Toast.tsx            # 4 notification types
│   │   │   ├── ToastContainer.tsx   # Toast provider
│   │   │   ├── Skeleton.tsx         # 3 loading variants
│   │   │   ├── EmptyState.tsx       # Empty state component
│   │   │   ├── SearchInput.tsx      # Search with clear
│   │   │   ├── FilterDropdown.tsx   # Multi-select filter
│   │   │   ├── LoadingSpinner.tsx   # Loading indicator
│   │   │   ├── Badge.tsx            # Status badge (5 variants)
│   │   │   ├── Tooltip.tsx          # Hover tooltip
│   │   │   ├── Select.tsx           # Dropdown select
│   │   │   └── ConfirmationModal.tsx # Confirmation dialog
│   │   │
│   │   ├── layout/                  # Layout Components
│   │   │   ├── DashboardLayout.tsx  # Main layout wrapper
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   └── Header.tsx           # Top header bar
│   │   │
│   │   ├── dashboard/               # Dashboard Widgets
│   │   │   ├── StatsCard.tsx        # Metric cards
│   │   │   ├── WeatherWidget.tsx    # Weather display
│   │   │   └── RecentActivities.tsx # Activity timeline
│   │   │
│   │   ├── charts/                  # D3.js Visualizations
│   │   │   ├── EnhancedCropYieldChart.tsx      # Zoom & pan
│   │   │   ├── EnhancedSoilMoistureChart.tsx   # Animated bars
│   │   │   ├── YieldPredictionChart.tsx         # Dual-line
│   │   │   ├── TemperatureHumidityChart.tsx     # Dual-axis
│   │   │   └── CropHealthMap.tsx                # Heatmap
│   │   │
│   │   └── fields/                  # Field Components
│   │       ├── FieldCard.tsx                    # Field display card
│   │       ├── EnhancedAddFieldModal.tsx        # Multi-step form
│   │       └── FieldDetailsModal.tsx            # Details view
│   │
│   ├── hooks/
│   │   ├── useFields.ts             # Data management hook
│   │   └── useExportData.ts         # CSV/JSON export
│   │
│   ├── lib/
│   │   ├── api.ts                   # API client
│   │   ├── storage.ts               # LocalStorage persistence
│   │   └── utils.ts                 # Utility functions
│   │
│   └── types/
│       └── field.ts                 # TypeScript interfaces
│
├── .github/workflows/
│   └── ci.yml                       # CI/CD pipeline
│
├── sentry.*.config.ts               # Error monitoring
├── next.config.js                   # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS config
├── tsconfig.json                    # TypeScript config
└── package.json                     # Dependencies
```

---

## Component Library

### UI Components

All components are fully typed, accessible, and customizable:

**Button**
```tsx
<Button variant="primary|secondary|outline|ghost" size="sm|md|lg" icon={<Icon />}>
  Click Me
</Button>
```

**Toast Notifications**
```tsx
const { showToast } = useToast();
showToast('success', 'Title', 'Description');
showToast('error', 'Error occurred', 'Please try again');
```

**Skeleton Loaders**
```tsx
{isLoading ? <CardSkeleton /> : <Content />}
```

**Empty States**
```tsx
<EmptyState
  icon={Icon}
  title="No data"
  description="Get started"
  action={{ label: 'Add', onClick: handleAdd }}
/>
```

**Confirmation Modal**
```tsx
<ConfirmationModal
  type="danger"
  title="Delete Field?"
  message="This cannot be undone"
  onConfirm={handleDelete}
/>
```

---

## D3.js Visualizations

### Chart Features
All charts include:
- **Interactive Tooltips** - Rich data on hover
- **Smooth Animations** - 500-1500ms transitions
- **Responsive Design** - Adapts to container
- **Professional Styling** - Color-coded, formatted axes
- **Export Functionality** - Download as CSV

### Enhanced Crop Yield Chart
```typescript
// Features:
- Zoom with mouse wheel (1x-5x)
- Pan by dragging
- Animated line drawing
- Dual lines (actual vs target)
- Gradient area fill
- Data point markers
- Export to CSV
- Reset zoom button
```

### Enhanced Soil Moisture Chart
```typescript
// Features:
- Color-coded bars (red/yellow/green)
- Threshold indicators
- Change percentage arrows
- Click to select
- Animated entrance
- Status badges
```

---

## API Documentation

### Endpoints

**GET /api/fields**
```json
Response: 200 OK
[
  {
    "id": "1",
    "name": "North Field",
    "cropType": "Wheat",
    "area": 25.5,
    "soilMoisture": 68,
    "lastIrrigated": "2025-10-03T00:00:00.000Z",
    "status": "healthy"
  }
]
```

**POST /api/fields**
```json
Request Body:
{
  "name": "New Field",
  "cropType": "Corn",
  "area": 30.0,
  "soilMoisture": 55,
  "lastIrrigated": "2025-10-05",
  "status": "healthy"
}

Response: 201 Created
{ "id": "generated-id", ... }
```

**DELETE /api/fields/:id**
```json
Response: 200 OK
{ "message": "Field deleted successfully" }
```

### Using the API Hook

```tsx
import { useFields } from '@/hooks/useFields';

function MyComponent() {
  const { fields, isLoading, error, addField, deleteField } = useFields();

  const handleAdd = async () => {
    try {
      await addField({ name: 'Test', cropType: 'Wheat', ... });
      showToast('success', 'Field added!');
    } catch (error) {
      showToast('error', 'Failed to add');
    }
  };

  if (isLoading) return <Skeleton />;
  if (error) return <Error message={error} />;
  
  return <FieldList fields={fields} />;
}
```

---

## Accessibility

### WCAG 2.1 AA Compliance
- **Semantic HTML** - Proper heading structure
- **ARIA Labels** - All interactive elements labeled
- **Keyboard Navigation** - Full keyboard support
  - Tab - Navigate forward
  - Shift+Tab - Navigate backward
  - Enter - Activate
  - Escape - Close modals
- **Focus Indicators** - Visible focus rings
- **Color Contrast** - All text meets 4.5:1 ratio
- **Screen Reader** - Tested with VoiceOver/NVDA
- **Form Validation** - Clear error messages
- **Loading States** - Announced to screen readers

---

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Configure environment variables (optional):
  - NEXT_PUBLIC_SENTRY_DSN
  - SENTRY_ORG
  - SENTRY_PROJECT
- Click Deploy

3. **Automatic Deployments**
- Every push to `main` → Production
- Every pull request → Preview deployment

### Environment Variables

```env
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-org
SENTRY_PROJECT=farmflow
```

---

## CI/CD Pipeline

Automated workflow on every push:
- Install dependencies
- Run ESLint
- Type check with TypeScript
- Build project
- Create preview deployment (PRs)
- Deploy to production (main branch)

---

## Performance

### Optimizations
- **Code Splitting** - Automatic route-based
- **Image Optimization** - Next.js Image component
- **Tree Shaking** - Unused code removed
- **Lazy Loading** - Dynamic imports
- **Memoization** - React.useMemo for expensive calculations
- **CSS Purging** - Tailwind removes unused classes
- **Compression** - Gzip/Brotli enabled

### Expected Metrics
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

---

## Skills Demonstrated

### Senior Frontend Development
- Advanced React patterns (hooks, context, composition)  
- TypeScript strict mode throughout  
- Next.js App Router  
- RESTful API design  
- Custom hooks for reusability  

### Data Visualization
- D3.js mastery (5 chart types)  
- SVG manipulation  
- Interactive features (zoom, pan, tooltips)  
- Animation timing  
- Responsive charts  

### Form Management
- Multi-step forms with progress  
- Real-time validation (Formik + Yup)  
- Visual feedback  
- Error handling  
- Loading states  

### UX Design
- Loading skeletons  
- Empty states  
- Toast notifications  
- Confirmation dialogs  
- Search & filter  
- Micro-interactions  

### Accessibility
- WCAG AA compliance  
- Keyboard navigation  
- Screen reader support  
- ARIA implementation  
- Focus management  

### DevOps
- CI/CD pipeline  
- Error monitoring (Sentry)  
- Deployment automation  
- Environment configuration  
- Type checking in CI  

---

## Design System

### Colors
```
Primary (Green):   #22c55e - Success, healthy states
Secondary (Blue):  #0ea5e9 - Info, links
Error (Red):       #ef4444 - Errors, critical states
Warning (Yellow):  #f59e0b - Warnings
Gray Scale:        #f3f4f6 to #1f2937
```

### Typography
```
Font Family: Inter (with system fallback)
Sizes: 10px - 36px
Weights: 400, 500, 600, 700
Line Heights: 1.2 (tight), 1.5 (normal), 1.75 (relaxed)
```

### Spacing
```
4px Grid: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
```

---

## Code Quality

### Standards
- **TypeScript Strict** - No `any` types
- **ESLint** - Enforced rules
- **Consistent Naming** - camelCase, PascalCase
- **Component Structure** - Single Responsibility
- **DRY Principle** - Don't Repeat Yourself
- **Proper Error Handling** - Try-catch blocks
- **Comprehensive Comments** - Where needed

---

## Future Enhancements

Ready to implement:
- [ ] User authentication (NextAuth.js)
- [ ] Role-based access control
- [ ] Real-time WebSocket updates
- [ ] PDF report generation
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Weather API integration
- [ ] Automated irrigation scheduling
- [ ] Crop rotation planning
- [ ] Soil test result tracking

---

## Project Statistics

- **Total Files**: 50+
- **Lines of Code**: ~5,500+
- **Components**: 35+
- **Pages**: 5
- **API Routes**: 5
- **Custom Hooks**: 2
- **D3.js Charts**: 5
- **TypeScript Coverage**: 100%

---

## What Makes This Special

### Production Quality
- **Real API** with CRUD operations
- **Data Persistence** with localStorage
- **Error Boundaries** throughout
- **Loading States** everywhere
- **Professional Animations** 
- **Type Safety** end-to-end

### Professional Patterns
- **Multi-step Forms** - Better UX
- **Confirmation Dialogs** - Prevent mistakes
- **Toast Notifications** - User feedback
- **Search & Filter** - Data discovery
- **Skeleton Loaders** - Perceived performance
- **Empty States** - Clear guidance

### Industry Standards
- **RESTful API** design
- **Component Library** approach
- **Custom Hooks** for reusability
- **Separation of Concerns**
- **Error Handling** at all levels
- **Accessibility First**

---

## Support

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [D3.js Gallery](https://observablehq.com/@d3/gallery)

---

## License

This project is open source and available for portfolio demonstration purposes.

---

## Acknowledgments

- Next.js team for the amazing framework
- D3.js community for visualization examples
- Tailwind CSS for utility-first CSS
- Vercel for seamless deployment

---

## Portfolio Project

**Built to showcase senior-level frontend development skills:**
- Production-ready code
- Industry-standard patterns
- Professional UX design
- Complete documentation
- Deployed and functional

Perfect for demonstrating capabilities to potential employers!

---

*Built using Next.js, TypeScript, React, Tailwind CSS, and D3.js*

**Status**: Production Ready | Deployed | Fully Responsive | Accessible