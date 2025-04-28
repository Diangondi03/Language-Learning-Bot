import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Start from './pages/Start.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<Start />} />
        <Route path="/login" element={<Start />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
