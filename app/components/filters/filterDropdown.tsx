'use client'
import React from 'react'
import { Button } from '..'
import { ChevronDown } from 'lucide-react'

export interface FilterOption<T extends string = string> {
  label: string
  value: T
}

export interface FilterConfig<T extends string = string> {
  label: string
  value: T
  options: FilterOption<T>[]
  onChange: (value: T) => void
}

interface FilterDropdownsProps {
  filters: FilterConfig<any>[]
  onReset: () => void
  showReset?: boolean
}

export const FilterDropdowns: React.FC<FilterDropdownsProps> = ({
  filters,
  onReset,
  showReset = true,
}) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-48 bg-form border border-border rounded-xl shadow-lg z-10 p-3 space-y-3">
      {filters.map((filter) => (
        <div key={filter.label}>
          <label className="text-sm font-medium text-text">
            {filter.label}
          </label>

          <div className="relative mt-1">
            <select
              className="
                w-full rounded-lg px-3 py-2 text-sm
                bg-form text-text border border-border
                appearance-none
                focus:outline-none focus:ring-1 focus:ring-border
              "
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value as any)}
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Custom arrow */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-xs">
              <ChevronDown size={20} />
            </span>
          </div>
        </div>
      ))}

      {/* Reset Button */}
      {showReset && (
        <Button
          variant="success"
          size="sm"
          onClick={onReset}
          className="w-full"
        >
          Reset
        </Button>
      )}
    </div>
  )
}