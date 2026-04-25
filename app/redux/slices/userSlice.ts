import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UsersFilter, UserState } from '@/app/types/user'
import { fetchUsers, updateUserStatus, deleteUser, bulkUpdateUserStatus, createUser } from '@/app/services/httpServices/userApiService'
import { applyFilters } from '@/app/utils/userFilters'

const initialState: UserState = {
  // Auth state
  currentUser: null,
  isAuthenticated: false,
  authLoading: false,
  authError: null,
  
  // Users management state
  users: [],
  filteredUsers: [],
  filters: {
    search: '',
    role: 'All',
    status: 'All',
    sortBy: 'id',
    sortOrder: 'asc',
  },
  usersLoading: false,
  usersError: null,
  totalUsers: 0,
  currentPage: 1,
  usersPerPage: 10,
  selectedUsers: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Auth actions
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
      state.authError = null
    },
    logout: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
      state.authError = null
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.authError = action.payload
      state.authLoading = false
    },
    clearAuthError: (state) => {
      state.authError = null
    },
    updateCurrentUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload }
      }
    },
    
    // Users management actions
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.filteredUsers = applyFilters(state.users, state.filters)
      state.currentPage = 1 // Reset to first page when filtering
    },
    setRoleFilter: (state, action: PayloadAction<'All' | 'Admin' | 'Moderator' | 'User'>) => {
      state.filters.role = action.payload
      state.filteredUsers = applyFilters(state.users, state.filters)
      state.currentPage = 1
    },
    setStatusFilter: (state, action: PayloadAction<'All' | 'Active' | 'Blocked'>) => {
      state.filters.status = action.payload
      state.filteredUsers = applyFilters(state.users, state.filters)
      state.currentPage = 1
    },
    setSorting: (state, action: PayloadAction<{ sortBy: 'name' | 'email' | 'lastLogin' | 'createdAt'; sortOrder: 'asc' | 'desc' }>) => {
      state.filters.sortBy = action.payload.sortBy
      state.filters.sortOrder = action.payload.sortOrder
      state.filteredUsers = applyFilters(state.users, state.filters)
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    toggleUserSelection: (state, action: PayloadAction<number>) => {
      const userId = action.payload
      if (state.selectedUsers.includes(userId)) {
        state.selectedUsers = state.selectedUsers.filter(id => id !== userId)
      } else {
        state.selectedUsers.push(userId)
      }
    },
    clearSelection: (state) => {
      state.selectedUsers = []
    },
    selectAllUsers: (state) => {
      state.selectedUsers = state.filteredUsers.map(user => user.id)
    },
    clearUsersError: (state) => {
      state.usersError = null
    },
  },
  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = true
        state.usersError = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoading = false
        state.users = action.payload
        state.filteredUsers = applyFilters(action.payload, state.filters)
        state.totalUsers = action.payload.length
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersLoading = false
        state.usersError = action.payload as string
      })
    
      // userSlice.ts
builder
.addCase(createUser.pending, (state) => {
  state.usersLoading = true
  state.usersError = null
})
.addCase(createUser.fulfilled, (state, action) => {
  state.usersLoading = false
  state.users.push(action.payload)
  state.filteredUsers = applyFilters(state.users, state.filters)
  state.totalUsers = state.users.length
})
.addCase(createUser.rejected, (state, action) => {
  state.usersLoading = false
  state.usersError = action.payload as string
})

    // Update user status
    builder
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const { userId, status } = action.payload
        const userIndex = state.users.findIndex(user => user.id === userId)
        if (userIndex !== -1) {
          state.users[userIndex].status = status
          state.filteredUsers = applyFilters(state.users, state.filters)
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.usersError = action.payload as string
      })
      builder
  .addCase(bulkUpdateUserStatus.fulfilled, (state, action) => {
    const { updatedIds, status } = action.payload
    updatedIds.forEach((id) => {
      const userIndex = state.users.findIndex(u => u.id === id)
      if (userIndex !== -1) state.users[userIndex].status = status
    })
    state.filteredUsers = applyFilters(state.users, state.filters)
    // clear selection after bulk action
    state.selectedUsers = state.selectedUsers.filter(id => !updatedIds.includes(id))
  })
  .addCase(bulkUpdateUserStatus.rejected, (state, action) => {
    state.usersError = action.payload as string
  })

    
    // Delete user
    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userId = action.payload
        state.users = state.users.filter(user => user.id !== userId)
        state.filteredUsers = applyFilters(state.users, state.filters)
        state.selectedUsers = state.selectedUsers.filter(id => id !== userId)
        state.totalUsers = state.users.length
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.usersError = action.payload as string
      })
  },
})

export const {
  // Auth actions
  setUser,
  logout,
  setAuthLoading,
  setAuthError,
  clearAuthError,
  updateCurrentUser,
  
  // Users management actions
  setSearch,
  setRoleFilter,
  setStatusFilter,
  setSorting,
  setCurrentPage,
  toggleUserSelection,
  clearSelection,
  selectAllUsers,
  clearUsersError,
} = userSlice.actions

export default userSlice.reducer