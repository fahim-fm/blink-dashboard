'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn'; // adjust path to where your cn utility lives

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative flex items-center w-[68px] h-[30px] rounded-[20px] p-[2px] transition-colors duration-300 border border-border',
        isDark ? 'bg-black' : 'bg-[#FAFAFA]'
      )}
    >
      {/* ACTIVE HALF-PILL BACKGROUND */}
      <span
        className={cn(
          'absolute top-[2px] bottom-[2px] w-[30px] rounded-[16px] bg-green transition-transform duration-300',
          isDark ? 'translate-x-[30px]' : 'translate-x-0'
        )}
      />

      {/* SUN ICON */}
      <Sun
        className={cn(
          'absolute left-[8px] z-10 h-[16.5px] w-[16.5px] transition-opacity duration-300',
          isDark ? 'opacity-40 text-white' : 'opacity-100 text-white'
        )}
      />

      {/* MOON ICON */}
      <Moon
        className={cn(
          'absolute right-[8px] z-10  h-[16.5px] w-[16.5px] transition-opacity duration-300',
          isDark ? 'opacity-100 text-black ' : 'opacity-40'
        )}
      />
    </button>
  );
}
