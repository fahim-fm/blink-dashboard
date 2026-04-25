export function isFileUpload(data: any): boolean {
  if (!data) return false
  
  return data instanceof FormData || 
         data instanceof File || 
         data instanceof Blob ||
         (data instanceof Object && Object.values(data).some(value => 
           value instanceof File || value instanceof Blob
         ))
}

export function prepareUploadData(data: any): { uploadData: any; headers: Record<string, string> } {
  let uploadData = data
  let headers: Record<string, string> = {}

  if (data instanceof FormData) {
    uploadData = data
  } else if (data instanceof File) {
    uploadData = data
    headers['Content-Type'] = data.type || 'application/octet-stream'
  } else if (data instanceof Blob) {
    uploadData = data
    headers['Content-Type'] = data.type || 'application/octet-stream'
  } else if (data instanceof Object) {
    const formData = new FormData()
    
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value)
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item instanceof File || item instanceof Blob) {
            formData.append(`${key}[${index}]`, item)
          } else {
            formData.append(`${key}[${index}]`, String(item))
          }
        })
      } else if (value !== null && value !== undefined) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value))
      }
    })
    
    uploadData = formData
  }

  return { uploadData, headers }
}