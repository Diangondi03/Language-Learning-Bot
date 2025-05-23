import { signal } from "@preact/signals-react"
interface Message {
    content: string;
    chatId: string;
    is_user: boolean;
    // add other fields as needed
  }

export const user = signal()
export const chats = signal([])
export const messages = signal<Message[]>([])
export const theme = signal<string>(localStorage.getItem('theme') || 'light')
export const updateMessage = signal<string>("")