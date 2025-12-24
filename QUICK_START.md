# 🚀 CEO AI - Quick Start Guide

---

## 📋 COMMANDS

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
```

### Testing
```bash
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Code Quality
```bash
npm run lint         # Check for linting errors
npm run lint:fix     # Auto-fix linting errors
npm run type-check   # Check TypeScript types
```

---

## 📁 PROJECT STRUCTURE

```
CEO-AI/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── onboarding/        # Onboarding flow
│   ├── dashboard/         # Main dashboard
│   ├── contacts/          # Contact management
│   └── ...
│
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...
│
├── hooks/                 # Custom React hooks
│   ├── useContacts.ts    # Contact state management
│   └── README.md         # Hook patterns
│
├── lib/
│   ├── services/         # Business logic layer
│   │   ├── contactService.ts
│   │   └── README.md
│   ├── storage.ts        # Data persistence
│   ├── logger.ts         # Logging utility
│   └── errors.ts         # Error handling
│
├── __tests__/            # Test files
│   └── smoke.test.ts
│
└── lib/__tests__/
    ├── storage.test.ts
    └── logger.test.ts
```

---

## 🎯 COMMON TASKS

### Adding a New Feature

1. **Create Service** (if needed)
   ```typescript
   // lib/services/myService.ts
   export const myService = {
     create: (data) => { /* ... */ },
     getAll: () => { /* ... */ },
     // ...
   }
   ```

2. **Create Hook** (if needed)
   ```typescript
   // hooks/useMyFeature.ts
   export function useMyFeature() {
     const [data, setData] = useState([])
     // ...
     return { data, /* ... */ }
   }
   ```

3. **Use in Component**
   ```typescript
   // components/MyComponent.tsx
   import { useMyFeature } from '@/hooks/useMyFeature'
   
   export function MyComponent() {
     const { data } = useMyFeature()
     // ...
   }
   ```

4. **Write Tests**
   ```typescript
   // lib/__tests__/myService.test.ts
   import { describe, it, expect } from 'vitest'
   import { myService } from '@/lib/services/myService'
   
   describe('myService', () => {
     it('should work', () => {
       // ...
     })
   })
   ```

---

## 🔧 ARCHITECTURE RULES

### ✅ DO
- Use hooks for component state management
- Use services for business logic
- Use storage layer for data persistence
- Handle errors with structured error types
- Write tests for new features

### ❌ DON'T
- Access localStorage directly from components
- Put business logic in components
- Hardcode API keys or secrets
- Skip error handling
- Forget to write tests

---

## 🧪 TESTING

### Run Tests
```bash
npm test                 # Run once
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage
```

### Test Structure
```typescript
import { describe, it, expect, beforeEach } from 'vitest'

describe('Feature Name', () => {
  beforeEach(() => {
    // Setup
  })

  it('should do something', () => {
    // Arrange
    const input = 'test'
    
    // Act
    const result = myFunction(input)
    
    // Assert
    expect(result).toBe('expected')
  })
})
```

---

## 🔒 SECURITY

### Environment Variables
```bash
# .env.local (never commit!)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
```

### Vercel Configuration
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add variables (without `NEXT_PUBLIC_` prefix)

### Safe Logging
```typescript
// ❌ DON'T
logger.log('User logged in', { password: '...' })

// ✅ DO
logger.log('User logged in', { userId: 'user_123' })
```

---

## 📚 DOCUMENTATION

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview |
| `ARCHITECTURE.md` | System architecture |
| `ARCHITECTURE_RULES.md` | Architecture boundaries |
| `SECURITY_CHECKLIST.md` | Security verification |
| `STATUS_REPORT.md` | Current status |
| `FINAL_SUMMARY.md` | Comprehensive summary |

---

## 🐛 TROUBLESHOOTING

### Build Fails
```bash
# Check TypeScript errors
npm run type-check

# Check linting
npm run lint

# Clear cache
rm -rf .next node_modules
npm install
```

### Tests Fail
```bash
# Run specific test
npm test -- storage.test.ts

# Run with verbose output
npm test -- --reporter=verbose

# Clear test cache
npm test -- --clearCache
```

### localStorage Issues
```bash
# Clear browser storage
# Open DevTools → Application → Local Storage → Clear
```

---

## 🚀 DEPLOYMENT

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Manual Build
```bash
npm run build
npm run start
```

---

## 💡 TIPS

1. **Use TypeScript** - Let the types guide you
2. **Write Tests** - Catch bugs early
3. **Follow Patterns** - Check service/hook READMEs
4. **Read Docs** - Comprehensive guides available
5. **Ask Questions** - Documentation is your friend

---

## 📞 SUPPORT

- Check `ARCHITECTURE.md` for system design
- Check `SECURITY_CHECKLIST.md` for security
- Check `lib/services/README.md` for service patterns
- Check `hooks/README.md` for hook patterns

---

## ✨ NEXT STEPS

1. **Start Development**
   ```bash
   npm run dev
   ```

2. **Add Features**
   - Follow architecture patterns
   - Write tests
   - Update documentation

3. **Deploy**
   ```bash
   vercel --prod
   ```

**Happy coding! 🎉**

