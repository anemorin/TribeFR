import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './views/Auth/Login.tsx'
import Registration from './views/Auth/Registration.tsx'
import { createGlobalStyle } from 'styled-components'
import PageLayout from './components/layouts/PageLayout.tsx'
import Home from './views/Home.tsx'


const root = ReactDOM.createRoot(document.getElementById('root')!)

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Bahnschrift, sans-serif;
  }
`;

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes >
        <Route
          element={<PageLayout />}
          path='/auth'
        >
          <Route
            element={<Login />}
            path="login"
          />
          <Route
            element={<Registration />}
            path="register"
          />
          <Route
            element={(
              <Navigate
                to="login"
                replace
              />
            )}
            path="/auth"
          />
        </Route>
        <Route
          element={<PageLayout />}
          path='/'
        >
          <Route
            element={<Home />}
            path="/"
          />
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
