// UI component type definitions

import type { User } from './user'

// Button component types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

// Card component types
export interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
  actions?: React.ReactNode
}

// Modal component types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
}

// Table component types
export interface TableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: any, item: T) => React.ReactNode
  width?: string
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  onSort?: (key: keyof T, order: 'asc' | 'desc') => void
  onRowClick?: (item: T) => void
  className?: string
}

// Form component types
export interface InputProps {
  label?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export interface SelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
  placeholder?: string
}

// Layout component types
export interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export interface SidebarItem {
  id: string
  label: string
  href: string
  icon?: React.ReactNode
  active?: boolean
  children?: SidebarItem[]
}

export interface SidebarProps {
  items: SidebarItem[]
  collapsed?: boolean
  onToggle?: () => void
}

// Auth component types
export interface AuthControlsProps {
  currentUser?: User | null
  isAuthenticated?: boolean
}