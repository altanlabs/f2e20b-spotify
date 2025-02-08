import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/index'
import PlaylistPage from './pages/playlist'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<IndexPage />} />
          <Route path="playlist/:id" element={<PlaylistPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)