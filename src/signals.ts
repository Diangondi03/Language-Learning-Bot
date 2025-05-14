import { signal } from "@preact/signals-react"

export const user = signal(false)
export const theme = signal(localStorage.getItem('theme') || 'light')