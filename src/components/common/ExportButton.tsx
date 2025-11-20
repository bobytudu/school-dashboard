// additional components for enhanced functionality

// src/components/Common/ExportButton.tsx
import { Button } from 'antd'
import { ExportOutlined } from '@ant-design/icons'

interface ExportButtonProps {
  data: any[]
  filename: string
}

export default function ExportButton({ data, filename }: ExportButtonProps) {
  const handleExport = () => {
    const csv = convertToCSV(data)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const convertToCSV = (data: any[]) => {
    const headers = Object.keys(data[0] || {})
    const rows = data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    return [headers.join(','), ...rows].join('\n')
  }

  return (
    <Button 
      icon={<ExportOutlined />} 
      onClick={handleExport}
      className="rounded-lg"
    >
      Export
    </Button>
  )
}

// src/utils/validation.ts
export const emailValidation = {
  validator: async (_: any, value: string) => {
    if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('Please enter a valid email'))
  },
}

export const phoneValidation = {
  validator: async (_: any, value: string) => {
    if (!value || /^\+?[\d\s-()]{10,}$/.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('Please enter a valid phone number'))
  },
}

// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}