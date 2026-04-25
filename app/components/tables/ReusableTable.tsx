import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useMemo, ReactNode } from 'react'
import { CustomCheckbox } from '..'

/* Column type */
interface Column<T> {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode
}

/* Props (ID is generic) */
interface ReusableTableProps<T, ID extends string | number> {
  columns: Column<T>[]
  data: T[]
  selectedIds: ID[]
  setSelectedIds: React.Dispatch<React.SetStateAction<ID[]>>
  currentPage: number
  setCurrentPage: (page: number) => void
  rowsPerPage?: number
  onRowClick?: (row: T) => void
}

/* Component */
export const ReusableTable = <
  T extends { id: ID },
  ID extends string | number
>({
  columns,
  data,
  selectedIds,
  setSelectedIds,
  currentPage,
  setCurrentPage,
  rowsPerPage = 5,
  onRowClick,
}: ReusableTableProps<T, ID>) => {
  const totalPages = Math.ceil(data.length / rowsPerPage)

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return data.slice(start, start + rowsPerPage)
  }, [currentPage, data, rowsPerPage])

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedIds.includes(row.id))

  const isSomeSelected =
    paginatedData.some((row) => selectedIds.includes(row.id)) &&
    !isAllSelected

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginatedData.some((row) => row.id === id))
      )
    } else {
      setSelectedIds((prev) => [
        ...new Set([...prev, ...paginatedData.map((row) => row.id)]),
      ])
    }
  }

  const toggleSelectOne = (id: ID) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    setSelectedIds([])
  }

  return (
    <div className="w-full">
      {/* ONLY the table scrolls horizontally */}
      <div className="overflow-x-auto hide-scrollbar w-full">
        <table className="w-full">
          <thead className="bg-gray">
            <tr>
              <th className="th-base text-left rounded-tl-[16px] rounded-bl-[16px]">
                <CustomCheckbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={toggleSelectAll}
                />
              </th>

              {columns.map((col, i) => (
                <th
                  key={col.key as string}
                  className={`th-base ${
                    i === columns.length - 1
                      ? 'rounded-tr-[16px] rounded-br-[16px]'
                      : ''
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/*  divide-y for all rows + bottom border on last row */}
          <tbody className="divide-y divide-border bg-form">
            {paginatedData.map((row, idx) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`transition-colors hover:bg-background cursor-pointer ${
                  idx === paginatedData.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <td
                  className="td-base text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CustomCheckbox
                    checked={selectedIds.includes(row.id)}
                    onChange={() => toggleSelectOne(row.id)}
                  />
                </td>

                {columns.map((col) => (
                  <td key={col.key as string} className="td-base text-left">
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 pt-[34px] pb-[6px]">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="md:h-[52px] md:w-[52px] sm:h-[48px] sm:w-[48px] h-[40px] w-[40px] flex items-center justify-center rounded-[16px] bg-background disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={20} />
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1
          const isCurrent = currentPage === page
          return (
            <button
              key={page}
              onClick={() => changePage(page)}
              disabled={isCurrent}
              className={`md:h-[52px] md:w-[52px] sm:h-[48px] sm:w-[48px] h-[40px] w-[40px] flex items-center justify-center rounded-[16px] text-[14px] font-semibold
                ${
                  isCurrent
                    ? 'bg-background text-text cursor-not-allowed'
                    : 'bg-gray hover:bg-background hover:text-text'
                }
              `}
            >
              {page}
            </button>
          )
        })}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="md:h-[52px] md:w-[52px] sm:h-[48px] sm:w-[48px] h-[40px] w-[40px] flex items-center justify-center rounded-[16px] bg-background disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}
