# Hooks Layer

## Purpose
Custom React hooks that provide state management and data fetching for components.

## Rules
1. ✅ **DO** import from `lib/services/`
2. ✅ **DO** use React hooks (useState, useEffect, useCallback, etc.)
3. ✅ **DO** handle loading and error states
4. ✅ **DO** return consistent interfaces
5. ❌ **DON'T** import from `lib/storage.ts` directly
6. ❌ **DON'T** access localStorage directly
7. ❌ **DON'T** import components

## Pattern

```typescript
// hooks/useExample.ts
import { useState, useEffect, useCallback } from 'react'
import { exampleService } from '@/lib/services/exampleService'
import type { DataType } from '@/lib/storage'

export function useExample() {
  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load data
  const loadData = useCallback(() => {
    try {
      setLoading(true)
      setError(null)
      const result = exampleService.getAll()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  // Load on mount
  useEffect(() => {
    loadData()
  }, [loadData])

  // Create item
  const create = useCallback(async (item: Omit<DataType, 'id' | 'createdAt'>) => {
    try {
      const newItem = exampleService.create(item)
      setData(prev => [newItem, ...prev])
      return newItem
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create')
      throw err
    }
  }, [])

  // Update item
  const update = useCallback(async (id: string, updates: Partial<DataType>) => {
    try {
      const updated = exampleService.update(id, updates)
      setData(prev => prev.map(item => item.id === id ? updated : item))
      return updated
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
      throw err
    }
  }, [])

  // Delete item
  const remove = useCallback(async (id: string) => {
    try {
      exampleService.delete(id)
      setData(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
      throw err
    }
  }, [])

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    reload: loadData,
  }
}
```

## Usage in Components

```typescript
// components/ExampleComponent.tsx
import { useExample } from '@/hooks/useExample'

export function ExampleComponent() {
  const { data, loading, error, create, update, remove } = useExample()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

## Available Hooks
- `useContacts.ts` - Contact management
- `useBusinessPlans.ts` - Business plan operations
- `useFinancialRecords.ts` - Financial data
- More to be added as needed

## Benefits
1. **Consistent API**: All hooks follow the same pattern
2. **Error Handling**: Built-in error states
3. **Loading States**: Automatic loading indicators
4. **Reusability**: Share logic across components
5. **Testability**: Easy to mock and test
6. **Type Safety**: Full TypeScript support

