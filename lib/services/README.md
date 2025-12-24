# Service Layer

## Purpose
The service layer provides business logic and data transformation between the UI and storage layers.

## Rules
1. ✅ **DO** import from `lib/storage.ts`
2. ✅ **DO** import from `lib/logger.ts`
3. ✅ **DO** export pure functions
4. ✅ **DO** handle validation and error cases
5. ❌ **DON'T** import React or React hooks
6. ❌ **DON'T** import from components
7. ❌ **DON'T** access localStorage directly

## Pattern

```typescript
// lib/services/exampleService.ts
import { getData, saveData, type DataType } from '@/lib/storage'
import logger from '@/lib/logger'

export const exampleService = {
  getAll: (): DataType[] => {
    logger.trackDataOperation('Service', 'getAll', 'Fetching all data')
    return getData()
  },

  getById: (id: string): DataType | null => {
    const items = getData()
    return items.find(item => item.id === id) || null
  },

  create: (data: Omit<DataType, 'id' | 'createdAt'>): DataType => {
    // Validation
    if (!data.name) {
      throw new Error('Name is required')
    }

    // Business logic
    const newItem = {
      ...data,
      id: `item_${Date.now()}`,
      createdAt: new Date().toISOString()
    }

    saveData(newItem)
    logger.trackDataOperation('Service', 'create', 'Created new item', { id: newItem.id })
    
    return newItem
  },

  // ... more methods
}
```

## Available Services
- `contactService.ts` - Contact and client management
- `businessPlanService.ts` - Business plan operations
- `financialService.ts` - Financial records and transactions
- More to be added as needed

