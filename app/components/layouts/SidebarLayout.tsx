'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/app/components/common/Sidebar'
import ThemeToggle from '@/app/components/ui/ThemeToggle'
import { Menu, X } from 'lucide-react'

interface SidebarLayoutProps {
  children: React.ReactNode
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false)

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="flex h-screen bg-background   ">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block lg:sticky lg:top-0 lg:h-screen">
        <Sidebar />
      </aside>

      {/* Mobile overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden
          ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}
        `}
        onClick={() => setOpen(false)}
      />

      {/* Mobile sidebar drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full md:w-[70%] w-[80%]
          bg-form transform transition-transform duration-300 lg:hidden
          ${open ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
        `}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute top-6 right-4 p-2 rounded bg-white text-black hover:bg-gray-200"
        >
          <X size={22} />
        </button>

        {/* Sidebar content (scrollable on mobile) */}
        <div className="flex-1">
          <Sidebar />
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden sticky top-0 z-30 bg-form h-16 px-4 flex items-center justify-between border-b border-border shadow-md">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded hover:bg-background"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-lg font-extrabold text-green-dark">
              BLINK
            </span>
            <ThemeToggle />
          </div>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-hidden px-[12px] mb-[10px]">
          {children}
        </main>
      </div>
    </div>
  )
}
