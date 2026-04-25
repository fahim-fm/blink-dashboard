'use client'
import React from 'react'

type StatCardProps = {
  mainTitle: string
  flag?: boolean
  title1: string
  subTitle1: string
  title2?: string
  subTitle2?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  mainTitle,
  flag = true,
  title1,
  subTitle1,
  title2,
  subTitle2,
}) => {
  return (
    <div className="rounded-[32px] backdrop-blur-[8px] p-[20px] bg-form">
      <h5 className="text-text font-semibold text-xl mb-[44px]">
        {mainTitle}
      </h5>

      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-[36px] font-semibold text-text">{subTitle1}</h4>
          <p className="text-text-muted">{title1}</p>
        </div>

        {flag && title2 && subTitle2 && (
          <div>
            <h4 className="text-[36px] font-semibold text-text">{subTitle2}</h4>
            <p className="text-text-muted">{title2}</p>
          </div>
        )}
      </div>
    </div>
  )
}


