import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MoviePage from './Pages/MoviePage'
import MovieDetail from './Pages/MovieDetail'
import TvPage from './Pages/TvPage'
import TvDetail from './Pages/TvDetail'
import LoginModal from './features/app/LoginModal'
import SignupModal from './features/app/SignupModal'

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<MoviePage />} />
          <Route path="/tv" element={<TvPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv/:id" element={<TvDetail />} />
        </Routes>
      </BrowserRouter>
      <LoginModal />
      <SignupModal />
    </>
  )
}

export default App
