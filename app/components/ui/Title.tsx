'use client'

import React from 'react'
import clsx from 'clsx'

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  variant?: 'pageTitle' | 'section' | 'card' | 'logo'
  size?: 'xl' | 'lg' | 'md'
}

export const Title: React.FC<TitleProps> = ({
  as = 'h2',
  variant = 'section',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const Component = as

  /* Base styles */
  const baseClasses = 'font-Freesentation'

  /* Variant styles */
  const variantClasses = {
    pageTitle: 'text-[28px] leading-[150%] font-semibold text-text',
    section: 'font-medium text-[#000000]',
    card: 'font-medium text-[#000000]',
    logo:
      'font-bold text-[28px] leading-[125%] tracking-[-0.02em] text-green text-center',
  }

  /* Size styles (disabled for logo) */
  const sizeClasses = {
    xl: 'text-[32px] leading-[40px]',
    lg: 'text-[24px] leading-[32px]',
    md: 'text-[18px] leading-[26px]',
  }

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    variant !== 'logo' && sizeClasses[size],
    className
  )

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
