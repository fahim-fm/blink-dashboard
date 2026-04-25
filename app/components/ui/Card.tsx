'use client'

import React from 'react'

interface CardProps {
  children: React.ReactNode
  title?: string
  headerRight?: React.ReactNode  
  className?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  headerRight,
  className = '',
}) => {
  return (
    <div className={`bg-form w-full  rounded-[32px] backdrop-blur-[8px] ${className}`}>
      {title && (
        <div className="flex flex-col sm:flex-row gap-4  justify-between items-center px-5 pt-5 pb-4">
          <h3 className="text-[20px] font-semibold text-text">{title}</h3>
          {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
        </div>
      )}
      <div className="px-5 pb-[6px] ">
        {children}
      </div>
    </div>
  )
}
