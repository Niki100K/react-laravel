import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from './components'
import './App.css'
import { AppProvider } from './AppContext'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { UserReducer } from './UserReducer'

const store = configureStore({
  reducer: UserReducer
})

export default function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AppProvider>
  )
}
