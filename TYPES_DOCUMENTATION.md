# Type Definitions Documentation

This project uses TypeScript with organized type definitions in `.d.ts` files for better separation of concerns and improved maintainability.

## 📁 Type File Structure

```
app/types/
├── index.ts           # Main export file - imports all types
├── user.d.ts          # User-related types (User, UserState, etc.)
├── dashboard.d.ts     # Dashboard-specific types  
├── common.d.ts        # Shared/common types (ApiResponse, etc.)
├── redux.d.ts         # Redux-specific types (RootState, AppDispatch)
└── ui.d.ts           # UI component types (ButtonProps, etc.)
```

## 🎯 Type Categories

### **User Types** (`user.d.ts`)
- `User` - User entity with id, name, email, role, status
- `UsersFilter` - Filtering options for user lists
- `UserState` - Redux state for user slice
- `LoginCredentials`, `RegisterData`, `AuthResponse`

### **Dashboard Types** (`dashboard.d.ts`)
- `DashboardStats` - Statistics for dashboard widgets
- `RecentActivity` - Activity feed items
- `DashboardState` - Redux state for dashboard slice

### **Common Types** (`common.d.ts`)
- `ApiResponse<T>` - Generic API response wrapper
- `PaginatedResponse<T>` - Paginated data response
- `LoadingState` - Generic loading/error state
- `SortOption`, `FilterOption` - Sorting and filtering utilities

### **Redux Types** (`redux.d.ts`)
- `RootState` - Root Redux state type
- `AppDispatch` - App-specific dispatch type
- `AsyncThunkConfig` - Configuration for async thunks
- Generic payload types for CRUD operations

### **UI Types** (`ui.d.ts`)
- `ButtonProps`, `CardProps`, `ModalProps` - Component prop types
- `TableColumn<T>`, `TableProps<T>` - Table component types
- `InputProps`, `SelectProps` - Form component types
- `SidebarItem`, `SidebarProps` - Navigation component types

## 📝 Usage Examples

### Import specific types:
```typescript
import { User, UserState } from '@/app/types/user'
import { DashboardStats } from '@/app/types/dashboard'
import { ApiResponse } from '@/app/types/common'
```

### Import all types:
```typescript
import { User, DashboardStats, ApiResponse, RootState } from '@/app/types'
```

### In Redux slices:
```typescript
import { User, UserState } from '@/app/types/user'

const userSlice = createSlice<UserState>({
  // ...
})
```

### In components:
```typescript
import { ButtonProps } from '@/app/types/ui'

const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => {
  // ...
}
```

## ✅ Benefits

1. **🎯 Better Organization** - Types grouped by domain/feature
2. **📦 Reusability** - Types easily shared across components
3. **🔍 Type Safety** - Comprehensive TypeScript coverage
4. **📖 Maintainability** - Clear separation of type definitions
5. **🚀 Performance** - `.d.ts` files are declaration-only
6. **🔄 Consistency** - Standardized type patterns across the app

## 🔄 Migration

All interfaces have been moved from slice files to dedicated type files:
- ✅ `userSlice.ts` → Uses types from `user.d.ts`
- ✅ `dashboardSlice.ts` → Uses types from `dashboard.d.ts`  
- ✅ Components → Can import from centralized type files
- ✅ Backwards compatibility maintained via `index.ts` exports