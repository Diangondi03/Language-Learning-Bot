import { signal } from "@preact/signals-react"
import { Chat, Message, User } from "./interfaces"

export const user = signal<User>()
export const chats = signal<Chat[]>([])
export const messages = signal<Message[]>([])
export const theme = signal<string>(localStorage.getItem('theme') || 'light')
export const updateMessage = signal<string>("")
export const indexSidebar = signal<number>(-1)