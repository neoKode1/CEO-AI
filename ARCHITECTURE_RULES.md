# Architecture Rules & Boundaries
**CEO AI - Enforced Architecture Patterns**  
**Last Updated**: 2025-12-24

---

## LAYER ARCHITECTURE

```
┌─────────────────────────────────────────┐
│         UI LAYER (app/, components/)     │
│  - React Components                      │
│  - Pages                                 │
│  - UI Logic Only                         │
│  ❌ NO direct storage access             │
│  ✅ USE hooks and services only          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       HOOKS LAYER (hooks/)               │
│  - Custom React Hooks                    │
│  - State Management                      │
│  - Data Fetching                         │
│  ❌ NO direct localStorage access        │
│  ✅ USE services only                    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│     SERVICE LAYER (lib/services/)        │
│  - Business Logic                        │
│  - Data Transformation                   │
│  - Validation                            │
│  ❌ NO React dependencies                │
│  ✅ USE storage layer only               │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│     STORAGE LAYER (lib/storage.ts)       │
│  - localStorage CRUD                     │
│  - Data Persistence                      │
│  - Type Definitions                      │
│  ❌ NO business logic                    │
│  ✅ Pure data operations only            │
└─────────────────────────────────────────┘
```

---

## IMPORT RULES

### ✅ ALLOWED IMPORTS

#### UI Layer (app/, components/)
```typescript
// ✅ Hooks
import { useContacts } from '@/hooks/useContacts'
import { useBusinessPlans } from '@/hooks/useBusinessPlans'

// ✅ Services (for non-hook scenarios)
import { contactService } from '@/lib/services/contactService'

// ✅ Types
import type { Contact, Project } from '@/lib/storage'

// ✅ UI Libraries
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
```

#### Hooks Layer (hooks/)
```typescript
// ✅ Services
import { contactService } from '@/lib/services/contactService'

// ✅ Types
import type { Contact } from '@/lib/storage'

// ✅ React hooks
import { useState, useEffect, useCallback } from 'react'
```

#### Service Layer (lib/services/)
```typescript
// ✅ Storage functions
import { getContacts, saveContact } from '@/lib/storage'

// ✅ Logger
import logger from '@/lib/logger'

// ✅ Types
import type { Contact, Project } from '@/lib/storage'
```

### ❌ FORBIDDEN IMPORTS

#### UI Layer (app/, components/)
```typescript
// ❌ NEVER import storage directly
import { getContacts, saveContact } from '@/lib/storage'

// ❌ NEVER access localStorage directly
localStorage.getItem('ceo-ai-contacts')
```

#### Hooks Layer (hooks/)
```typescript
// ❌ NEVER import storage directly
import { getContacts } from '@/lib/storage'

// ❌ NEVER access localStorage directly
localStorage.setItem('key', 'value')
```

#### Service Layer (lib/services/)
```typescript
// ❌ NEVER import React
import { useState } from 'react'

// ❌ NEVER import components
import { Button } from '@/components/ui/button'
```

---

## FILE ORGANIZATION

```
CEO-AI/
├── app/                      # UI Layer - Pages
│   ├── dashboard/
│   ├── clients/
│   └── ...
├── components/               # UI Layer - Components
│   ├── AIChatAssistant.tsx
│   ├── Sidebar.tsx
│   └── ...
├── hooks/                    # Hooks Layer (NEW)
│   ├── useContacts.ts
│   ├── useBusinessPlans.ts
│   ├── useFinancialRecords.ts
│   └── ...
├── lib/
│   ├── services/            # Service Layer (NEW)
│   │   ├── contactService.ts
│   │   ├── businessPlanService.ts
│   │   ├── financialService.ts
│   │   └── ...
│   ├── storage.ts           # Storage Layer
│   └── logger.ts            # Infrastructure
└── __tests__/               # Tests
    ├── hooks/
    ├── services/
    └── ...
```

---

## RESPONSIBILITY MATRIX

| Layer | Responsibilities | Forbidden |
|-------|-----------------|-----------|
| **UI** | Rendering, User Events, Display Logic | Business Logic, Data Access |
| **Hooks** | State Management, Data Fetching, Side Effects | Direct Storage Access |
| **Services** | Business Logic, Validation, Transformation | React Dependencies, Direct Storage |
| **Storage** | CRUD Operations, Persistence | Business Logic, Validation |

---

## MIGRATION STRATEGY

### Phase 1: Create Infrastructure (Current)
1. ✅ Create `hooks/` directory
2. ✅ Create `lib/services/` directory
3. ✅ Document rules (this file)

### Phase 2: Build Service Layer
1. Create service modules for each domain
2. Move business logic from components to services
3. Add validation and error handling

### Phase 3: Build Hooks Layer
1. Create custom hooks wrapping services
2. Add proper state management
3. Handle loading and error states

### Phase 4: Refactor Components
1. Replace direct storage imports with hooks
2. Remove business logic from components
3. Simplify component code

### Phase 5: Enforce Rules
1. Add ESLint rules to prevent violations
2. Update tests to match new architecture
3. Document patterns in code reviews

---

## BENEFITS

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Clear separation of concerns
3. **Reusability**: Services and hooks can be shared
4. **Type Safety**: Better TypeScript inference
5. **Performance**: Easier to optimize data fetching
6. **Scalability**: Easy to add new features

---

## NEXT STEPS

See implementation in:
- `lib/services/README.md` - Service layer patterns
- `hooks/README.md` - Hook patterns and examples
- Individual service and hook files for specific domains

