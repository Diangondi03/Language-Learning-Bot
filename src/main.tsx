import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Start from './pages/Start.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './layouts/AuthLayout.tsx'
import { Signup } from './pages/Signup.tsx'
import { Login } from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path='/auth' element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
