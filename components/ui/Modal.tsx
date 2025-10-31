'use client'
import React from 'react'

export default function Modal({ open, onClose, title, children }: {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded shadow-lg w-full max-w-2xl p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
          <br/>
          <button onClick={onClose} className="text-gray-600 flex">Close</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
