import Link from 'next/link'
import { User } from '@/app/types'
import { AuthControls } from './AuthControls'

interface HeaderProps {
  currentUser?: User | null
  isAuthenticated?: boolean
}

export const Header: React.FC<HeaderProps> = ({ currentUser, isAuthenticated }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Next.js 16 Starter</h1>
            <nav className="mt-2">
              <ul className="flex space-x-4">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </nav>
          </div>
          
          <AuthControls currentUser={currentUser} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  )
}