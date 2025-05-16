import { signal } from "@preact/signals-react"

export const user = signal()
export const theme = signal<string>(localStorage.getItem('theme') || 'light')
export const updateMessage = signal<string>("")