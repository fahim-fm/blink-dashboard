'use client'

import React from 'react'
import { Card } from '../..'
import { usersData } from '@/app/data/user/usersData'
import { User } from '@/app/types'

export const TopUsers: React.FC = () => {
  const topUsers = [...usersData]
    .sort((a, b) => b.totalMatches - a.totalMatches)
    .slice(0, 5)

  return (
    <Card title="Top Users">
      {topUsers.map((user: User, index: number) => (
        <div
          key={user.id}
          className={`flex items-center justify-between py-[15px] ${
            index !== topUsers.length - 1 ? 'border-b border-border' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-border rounded-[21px] w-[42px] h-[42px] flex items-center justify-center">
             
              <span className="text-text-muted font-medium">
                #{index + 1}
              </span>
            </div>

            <div>
              <h4 className="text-[18px] font-semibold text-text-secondary">
                {user.name}
              </h4>
              <p className="text-text-muted text-[16px]">
                {user.country}
              </p>
            </div>
          </div>

          <div className="text-right">
            <h4 className="text-[16px] font-medium text-text-muted">
              {user.totalMatches} Matches
            </h4>
            <p className="font-semibold text-green">
              ${user.totalPaymentAmount}
            </p>
          </div>
        </div>
      ))}
    </Card>
  )
}
