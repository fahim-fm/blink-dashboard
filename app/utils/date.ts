// app/utils/date.ts
export const timeAgo = (dateString: string, now: Date = new Date()): string => {
  const reportedDate = new Date(dateString)
  const diffMs = now.getTime() - reportedDate.getTime()

  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSeconds < 60) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
}
export interface DateTimeFormatOptions {
  dateLocale?: string
  timeLocale?: string
  dateOptions?: Intl.DateTimeFormatOptions
  timeOptions?: Intl.DateTimeFormatOptions
}

export const formatDateTime = (
  dateInput: string | Date,
  options?: DateTimeFormatOptions
): string => {
  const date = new Date(dateInput)

  const formattedDate = date.toLocaleDateString(
    options?.dateLocale ?? 'en-GB',
    options?.dateOptions ?? {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
  ) .replace(/\//g, '-')

  const formattedTime = date.toLocaleTimeString(
    options?.timeLocale ?? 'en-US',
    options?.timeOptions ?? {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }
  )

  return `${formattedDate} at ${formattedTime}`
}
