'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/app/redux/store'
import { logout } from '@/app/redux/slices/userSlice'
import type { AuthControlsProps } from '@/app/types/ui'

export const AuthControls: React.FC<AuthControlsProps> = ({ currentUser, isAuthenticated }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('auth_token')
    router.push('/login')
  }

  return (
    <div className="flex items-center space-x-4">
      {isAuthenticated && currentUser ? (
        <div className="flex items-center space-x-2">
          <span>Welcome, {currentUser.name}</span>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login" className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm">
          Login
        </Link>
      )}
    </div>
  )
}
