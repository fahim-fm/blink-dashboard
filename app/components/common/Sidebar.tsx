'use client';

import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from '../ui/ThemeToggle'
import { sidebarLinks } from '../../data/sidebar/sidebarLinks'
import { usePathname } from 'next/navigation'
import { cn } from '../../utils/cn'

export const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const topLinks = sidebarLinks.slice(0, 5)
  const bottomLinks = sidebarLinks.slice(5)

  return (
    <aside className="lg:max-w-[244px] w-full bg-form h-screen flex flex-col px-3 py-4">
      
      {/* Logo stays at the top */}
      <div className="px-4 shrink-0">
        <h2 className="text-[28px] font-extrabold text-green-dark">
          BLINK
        </h2>
      </div>

      {/* Scrollable container for nav links */}
      <div className="mt-6 flex-1 flex flex-col overflow-y-auto hide-scrollbar justify-between">
        {/* Top links */}
        <nav>
          <ul className="flex flex-col gap-1">
            {topLinks.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-2 pl-4 py-[14px] rounded-[64px] text-[14px] transition-colors',
                      isActive
                        ? 'bg-background text-text-secondary'
                        : 'text-text-muted hover:bg-background hover:text-text-secondary'
                    )}
                  >
                    <Image src={link.icon} alt={link.title} width={20} height={20} />
                    <span>{link.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom links stick to bottom but scroll with container */}
        <nav className="mt-6 border-t border-border lg:border-0">
          <ul className="flex flex-col gap-1">
            {bottomLinks.map((link) => {
              const isActive = pathname.startsWith(link.href)

              return (
                <li key={link.title} className={link.title === 'Notifications' ? 'relative' : ''}>
                  {link.title === 'Change Theme' ? (
                    <div className="flex items-center justify-between pl-4 py-[14px]">
                      <div className="flex items-center gap-2">
                        <Image src={link.icon} alt={link.title} width={20} height={20} />
                        <span className="text-text-muted text-[14px] whitespace-nowrap">
                          {link.title}
                        </span>
                        <ThemeToggle />
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center gap-2 pl-4 py-[14px] rounded-[64px] text-[14px] transition-colors',
                        isActive
                          ? 'bg-background text-text-secondary'
                          : 'text-text-muted hover:bg-background hover:text-text-secondary'
                      )}
                    >
                      <div className="relative">
                        <Image src={link.icon} alt={link.title} width={20} height={20} />
                        {/* Active dot for Notifications */}
                        {link.title === 'Notifications' && (
                          <span className="absolute top-[1px] right-[1px] w-[6px] h-[6px] bg-green rounded-full border border-background" />
                        )}
                      </div>
                      <span>{link.title}</span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
