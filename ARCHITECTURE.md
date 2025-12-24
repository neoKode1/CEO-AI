# ARCHITECTURE
**CEO AI - System Architecture**  
**Status**: STABILIZATION SPRINT - Documenting Current State  
**Last Updated**: 2025-12-24

---

## CURRENT ARCHITECTURE

### Overview
CEO AI is a **client-side only** Next.js 14 application with no backend services. All data is stored in browser localStorage. The application presents itself as an AI-powered business management system, but currently has **no actual AI integration** despite having AI SDKs installed.

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + TypeScript
- **Styling**: TailwindCSS
- **State**: React Hooks + localStorage
- **Charts**: Recharts
- **Icons**: Heroicons

---

## LAYER ARCHITECTURE (TARGET STATE)

```
┌─────────────────────────────────────────┐
│           PRESENTATION LAYER            │
│  (React Components, Pages, UI Logic)    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          SERVICE/DOMAIN LAYER           │
│   (Business Logic, Validation, Rules)   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│           ADAPTER LAYER                 │
│  (Storage, External APIs, Providers)    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│        INFRASTRUCTURE LAYER             │
│   (localStorage, Network, Browser APIs) │
└─────────────────────────────────────────┘
```

---

## CURRENT STATE VIOLATIONS

### ❌ No Layer Separation
- UI components directly import and call `lib/storage.ts`
- No service layer exists
- Business logic scattered across components
- Storage implementation details leak into UI

### ❌ No Validation Layer
- Data written to localStorage without validation
- No schema enforcement
- Type safety only at compile time, not runtime
- Malformed data can corrupt state

### ❌ No Error Boundaries
- React errors can crash entire application
- No graceful degradation
- No error recovery mechanisms

### ❌ Tight Coupling
- Components know about storage keys
- Components know about data structure
- Changing storage would require changing all components

---

## ARCHITECTURAL RULES (TO BE ENFORCED)

### Rule 1: UI Layer Isolation
**UI components MUST NOT:**
- Directly access localStorage
- Know about storage keys
- Know about data serialization
- Handle persistence errors

**UI components MUST:**
- Call service layer functions
- Handle UI state only
- Display errors from services
- Be testable without storage

### Rule 2: Service Layer Responsibilities
**Services MUST:**
- Validate all inputs
- Enforce business rules
- Handle errors gracefully
- Return typed results
- Be storage-agnostic

**Services MUST NOT:**
- Know about React
- Know about UI state
- Know about storage implementation

### Rule 3: Storage Adapter Isolation
**Storage adapters MUST:**
- Implement defined interfaces
- Handle serialization/deserialization
- Manage storage errors
- Be swappable

**Storage adapters MUST NOT:**
- Contain business logic
- Validate business rules
- Know about UI

### Rule 4: No Side Effects in Renders
**Components MUST NOT:**
- Write to storage during render
- Make network calls during render
- Mutate global state during render

---

## DATA FLOW (TARGET)

### Read Flow
```
User Action → Component → Service → Adapter → Storage
                ↓           ↓         ↓
              Update     Validate  Deserialize
               State      Data      Data
```

### Write Flow
```
User Input → Component → Service → Adapter → Storage
               ↓           ↓         ↓
            Validate   Enforce   Serialize
             Input     Rules      Data
```

---

## CURRENT DATA MODELS

### Core Entities
1. **OnboardingData** - User onboarding information
2. **UserProfile** - User profile and preferences
3. **Contact** - Clients and collaborators
4. **Project** - Client projects
5. **BusinessPlan** - Strategic plans
6. **GoalItem** - Goals and milestones
7. **FinancialRecord** - Financial transactions
8. **DocumentItem** - Document metadata + base64 data
9. **ContractItem** - Contract information

### Storage Keys
All prefixed with `ceo-ai-`:
- `onboarding`
- `user-profile`
- `contacts`
- `business-plans`
- `goals`
- `financial-records`
- `documents`
- `contracts`
- `logs`

---

## SECURITY ARCHITECTURE

### Current State: ❌ INSECURE
- No authentication
- No authorization
- No encryption
- All data in plaintext localStorage
- Logs may contain sensitive data
- No secret management

### Required Changes
1. **Never store secrets in localStorage**
2. **Implement proper env var handling**
3. **Add request/response sanitization**
4. **Implement structured logging with PII filtering**
5. **Add Content Security Policy**

---

## TESTING ARCHITECTURE (TO BE IMPLEMENTED)

### Unit Tests
- Service layer functions
- Validation logic
- Data transformations
- Utility functions

### Integration Tests
- Component + Service interactions
- Storage adapter operations
- Error handling flows

### Smoke Tests
- Module imports
- Build artifacts
- Configuration validity

---

## DEPLOYMENT ARCHITECTURE

### Current: Static Export Capable
- No server-side rendering required
- No API routes
- Can be deployed to static hosting
- No backend dependencies

### Constraints
- All computation client-side
- No server secrets
- No server-side data processing
- Limited by browser storage quotas

---

## FUTURE CONSIDERATIONS

### If AI Integration Added
1. API calls MUST go through service layer
2. API keys MUST be server-side only
3. Implement rate limiting
4. Add request/response caching
5. Handle API failures gracefully

### If Authentication Added
1. Use established auth provider (Clerk, Auth0, Supabase)
2. Never roll custom auth
3. Implement proper session management
4. Add CSRF protection
5. Implement proper logout

### If Backend Added
1. Separate API from frontend
2. Implement proper CORS
3. Add request validation
4. Implement rate limiting
5. Add monitoring and logging

---

**END OF ARCHITECTURE DOCUMENT**

