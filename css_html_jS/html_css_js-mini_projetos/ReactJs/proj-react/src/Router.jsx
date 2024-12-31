import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Counter from './pages/Counter';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />}/>
         <Route path="/news" element={<News />}/>
         <Route path="/counter" element={<Counter />}/>
      </Routes>
    </BrowserRouter>
  )
}
