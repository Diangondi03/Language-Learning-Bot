import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Start from './pages/Start.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './layouts/AuthLayout.tsx'
import { Signup } from './pages/Signup.tsx'
import { Login } from './pages/Login.tsx'

import AppLayout from './layouts/AppLayout.tsx'
import Settings from './pages/Settings.tsx'
import Chat from './pages/Chat.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Start />} />
      <Route path='/app' element={<AppLayout/>}>
        <Route index element={<Chat />} />
        <Route path="settings" element={<Settings />} />
        <Route path=":chatId" element={<Chat/>} />
      </Route>

        <Route path='/auth' element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
