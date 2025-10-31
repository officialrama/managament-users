'use client'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export default function Button({ children, variant = 'primary', className = '', ...rest }: Props) {
  const base = 'px-4 py-2 rounded-md font-medium focus:outline-none'
  const styles =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-800 '
      : 'bg-white border text-gray-700 hover:bg-gray-200'
  return (
    <button className={`cursor-pointer ${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  )
}
