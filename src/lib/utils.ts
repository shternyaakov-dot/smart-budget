import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('he-IL', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export function generateToken(length = 12) {
  return Math.random().toString(36).slice(2, 2 + length)
}
