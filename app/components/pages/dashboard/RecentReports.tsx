'use client'

import React, { useMemo } from 'react'
import { Card, RelativeTime } from '../..'
import { reportsData, Report } from '@/app/data/report/reportsData'
import Badge from '../../ui/Badge'

const RecentReports: React.FC = () => {
  const latestReports = useMemo<Report[]>(() => {
    return [...reportsData]
      .sort(
        (a, b) =>
          new Date(b.reportedAt).getTime() -
          new Date(a.reportedAt).getTime()
      )
      .slice(0, 5)
  }, [])

  return (
    <Card
      title="Recent Reports"
      headerRight={
        <button className="text-text-muted font-medium text-[14px] cursor-pointer">
          View All
        </button>
      }
    >
      {latestReports.map((report, index) => (
        <div
          key={report.id}
          className={`py-[15px] ${
            index !== latestReports.length - 1
              ? 'border-b border-border'
              : ''
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-[18px] font-semibold text-text-secondary break-words">
                  {report.title}
                </h4>
                <div className="rounded-[21px] bg-border px-[6px] py-[4px] text-text-muted text-[12px] font-medium">
                  {report.category}
                </div>
              </div>

              <h5 className="text-text-muted text-[16px] font-medium">
                <RelativeTime date={report.reportedAt} />
              </h5>
            </div>

            <Badge status={report.status} />
          </div>
        </div>
      ))}
    </Card>
  )
}

export default RecentReports
