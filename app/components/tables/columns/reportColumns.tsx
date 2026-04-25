import React from 'react'
import { Report } from '@/app/types/report'
import Badge from '../../ui/Badge'
import { X } from 'lucide-react'
import Image from 'next/image'
import { Restore, Unavailable, View } from '@/app/utils/image/icon.image'
import { formatDateTime } from '@/app/utils'

export const reportColumns = (
  onViewReport: (report: Report) => void,
  onBlockUser?: (report: Report) => void,
  onRestoreUser?: (report: Report) => void,
  onResolveReport?: (report: Report) => void // 🔹 New callback for X icon
) => [
  {
    key: 'reportedBy',
    header: 'Reporting User',
  },
  {
    key: 'reportedUser',
    header: 'Reported User',
  },
  {
    key: 'reportedAt',
    header: 'Report Time',
    render: (row: Report) => formatDateTime(row.reportedAt),
  },
  {
    key: 'status',
    header: 'Report Status',
    render: (row: Report) => <Badge status={row.status} />,
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (row: Report) => {
      const isRejected = row.status === 'rejected'
      const isResolved = row.status === 'resolved'

      return (
        <div className="flex lg:gap-4 gap-2 items-center">
          {/* BLOCK / RESTORE */}
          <button
            type="button"
            disabled={isRejected}
            onClick={() => {
              if (isResolved) onRestoreUser?.(row)
              else onBlockUser?.(row)
            }}
            className={`shrink-0 ${isRejected ? 'opacity-40 cursor-not-allowed' : 'hover:text-red'}`}
          >
            {isResolved ? (
              <Image
                src={Restore}
                alt="restore"
                className='h-[16px] w-[16px] md:h-[20px] md:w-[20px]'
                
              />
            ) : (
              <Image
                src={Unavailable}
                alt="block"
                className='h-[16px] w-[16px] md:h-[20px] md:w-[20px]'
               
              />
            )}
          </button>

          {/* VIEW */}
          <button type="button" onClick={() => onViewReport(row)} className="hover:text-blue shrink-0">
            <Image
              src={View}
              alt="view"
              className='h-[16px] w-[16px] md:h-[20px] md:w-[20px]'
             
            />
          </button>

          {/* RESOLVE / COMPLETE */}
          <button
            type="button"
            disabled={isResolved || isRejected}
            onClick={() => onResolveReport?.(row)} // 🔹 Trigger modal
            className={`shrink-0 ${isResolved || isRejected ? 'opacity-40 cursor-not-allowed' : 'hover:text-red'}`}
          >
            <X className='h-[16px] w-[16px] md:h-[20px] md:w-[20px]' />
          </button>
        </div>
      )
    },
  },
]
