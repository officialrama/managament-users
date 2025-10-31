'use client'
import React from 'react'

export default function Avatar({ src, name, size = 48 }: { src?: string; name?: string; size?: number }) {
  const fallback = name ? name.charAt(0).toUpperCase() : '?'
  return src ? (
    <img src={src} alt={name || 'avatar'} width={size} height={size} className="rounded-full object-cover" />
  ) : (
    <div style={{ width: size, height: size }} className="rounded-full bg-gray-200 flex items-center justify-center">
      {fallback}
    </div>
  )
}
