# SYSTEM MAP
**CEO AI - System Inventory**  
**Generated**: 2025-12-24  
**Purpose**: Complete inventory of system components, routes, dependencies, and data flows

---

## 1. ROUTES & PAGES

### Public Routes
- `/` - Onboarding flow (app/page.tsx)

### Protected Routes (No Auth Implementation)
- `/dashboard` - Main dashboard with KPIs, charts, and business overview
- `/agenda` - Company agenda and priority management
- `/goals` - Goals and benchmarks tracking
- `/plans` - Business plans and execution tracking
- `/clients` - Client management
- `/collaborators` - Vendor and collaborator management
- `/projects` - Project management
- `/accounting` - Invoices and transactions
- `/payments` - Payment processing and invoicing
- `/budget` - Budget tracking and financial planning
- `/funding` - Funding opportunities database
- `/marketing` - Marketing content generation
- `/communications` - Internal/external messaging
- `/team` - Team management
- `/documents` - Document storage and management
- `/contracts` - Contract management
- `/tax-forms` - Tax form management
- `/profile` - User profile management
- `/settings` - System configuration

**TOTAL ROUTES**: 20 pages

---

## 2. API ROUTES

**NONE FOUND** - This is a client-side only application with no Next.js API routes.

---

## 3. EXTERNAL INTEGRATIONS

### AI Providers (Installed but NOT Implemented)
- `@anthropic-ai/sdk` (v0.18.0) - **INSTALLED, NO USAGE FOUND**
- `openai` (v4.20.0) - **INSTALLED, NO USAGE FOUND**

### Network Calls
- **NONE** - No actual API calls found in codebase
- AI chat assistant has placeholder logic but makes no real API calls
- All "AI responses" are client-side pattern matching

### Webhooks (Documented but NOT Implemented)
- Zapier webhooks - mentioned in docs, not implemented
- Discord webhooks - mentioned in docs, not implemented

---

## 4. PERSISTENCE LAYERS

### LocalStorage Keys
All data stored in browser localStorage with prefix `ceo-ai-`:

1. `ceo-ai-onboarding` - Onboarding wizard data
2. `ceo-ai-user-profile` - User profile information
3. `ceo-ai-business-plans` - Business plans
4. `ceo-ai-contacts` - Client and collaborator contacts
5. `ceo-ai-financial-records` - Financial transactions
6. `ceo-ai-goals` - Goals and milestones
7. `ceo-ai-documents` - Document metadata + base64 data
8. `ceo-ai-contracts` - Contract information
9. `ceo-ai-logs` - Application logs

### SessionStorage Keys
1. `ceoAgendaShown` - Flag to show CEO agenda once per session

### No Server-Side Persistence
- No database
- No file system storage
- No OPFS usage
- No IndexedDB usage

---

## 5. COMPONENTS

### Core Components
- `AIChatAssistant.tsx` - AI chat interface with voice recognition (NO REAL AI)
- `Sidebar.tsx` - Navigation sidebar
- `HomeButton.tsx` - Navigation helper
- `CEOAgenda.tsx` - Agenda display component
- `ClientManagement.tsx` - Client CRUD interface
- `PlansExecution.tsx` - Business plans display
- `UserProfile.tsx` - User profile form
- `DebugPanel.tsx` - Development debugging tools
- `DebugPanelWrapper.tsx` - Debug panel wrapper
- `URLContactImporter.tsx` - Mock URL-based contact import

**TOTAL COMPONENTS**: 10

---

## 6. LIBRARIES & UTILITIES

### lib/storage.ts
- All localStorage CRUD operations
- Type definitions for data models
- Industry-specific configurations (hardcoded)
- No validation layer
- No error recovery

### lib/logger.ts
- Client-side logging system
- Stores logs in localStorage
- Console output in development
- **SECURITY RISK**: May log sensitive data

---

## 7. DEPENDENCIES

### Production Dependencies (package.json)
- Next.js 14.2.35
- React 18.2.0
- TypeScript 5.0.0
- TailwindCSS 3.3.0
- @anthropic-ai/sdk 0.18.0 **UNUSED**
- openai 4.20.0 **UNUSED**
- axios 1.6.0 **UNUSED**
- recharts 2.8.0 (charts)
- @heroicons/react 2.0.0 (icons)
- framer-motion 10.16.0 **MINIMAL USAGE**
- react-hook-form 7.47.0 **MINIMAL USAGE**
- zod 3.22.0 **UNUSED**
- date-fns 2.30.0
- clsx 2.0.0
- lucide-react 0.292.0 **UNUSED**

### Dev Dependencies
- ESLint + TypeScript ESLint
- TypeScript compiler

---

## 8. ENVIRONMENT VARIABLES

### Expected (from docs)
- `ANTHROPIC_API_KEY` - **NOT USED IN CODE**
- `OPENAI_API_KEY` - **NOT USED IN CODE**
- `NEXT_PUBLIC_LLM_API_KEY` - **NOT USED IN CODE**
- `NEXT_PUBLIC_ZAPIER_WEBHOOK` - **NOT USED IN CODE**
- `NEXT_PUBLIC_DISCORD_WEBHOOK` - **NOT USED IN CODE**
- `NEXT_PUBLIC_APP_NAME` - **NOT USED IN CODE**
- `NEXT_PUBLIC_COMPANY_NAME` - **NOT USED IN CODE**
- `NEXT_PUBLIC_AI_CEO_NAME` - **NOT USED IN CODE**
- `CUSTOM_KEY` (next.config.js) - **NOT USED IN CODE**

### Actual Usage
**NONE** - No environment variables are actually consumed by the application

---

## 9. BUILD & DEPLOYMENT

### Scripts (package.json)
- `dev` - Next.js development server
- `build` - Production build
- `start` - Production server
- `lint` - ESLint
- `type-check` - TypeScript type checking

### No CI/CD
- No GitHub Actions
- No test runner
- No pre-commit hooks
- No deployment configuration

---

## 10. DEAD CODE & TECH DEBT

### Unused Dependencies
- @anthropic-ai/sdk - Installed but never imported
- openai - Installed but never imported
- axios - Installed but never imported
- zod - Installed but never imported
- lucide-react - Installed but never imported
- framer-motion - Minimal usage
- react-hook-form - Minimal usage
- @hookform/resolvers - Unused
- @headlessui/react - Minimal usage

### Mock/Placeholder Code
- Settings page has hardcoded mock data (integrations, security settings)
- AI chat has no real AI - just pattern matching
- URL contact importer is completely mocked
- All "AI CEO" features are UI-only with no backend

### Template Artifacts
- install.bat - Windows batch file for setup
- Multiple environment variable references that aren't used
- Documentation references features that don't exist

---

## 11. SECURITY CONCERNS

### Current State
- No authentication system
- No authorization
- No session management
- No CSRF protection
- No rate limiting
- Logs may contain sensitive data
- All data in localStorage (client-accessible)
- No encryption at rest
- No secure secret management

---

## 12. ARCHITECTURE VIOLATIONS

### Current Issues
1. **No Layer Separation**: UI components directly call localStorage
2. **No Service Layer**: Business logic mixed with UI
3. **No Validation**: Data written to storage without validation
4. **No Error Boundaries**: React errors can crash entire app
5. **No Type Safety**: Many `any` types, implicit types
6. **Tight Coupling**: Components know about storage implementation

---

**END OF SYSTEM MAP**

