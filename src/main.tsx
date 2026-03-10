import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import App from './App'
import { regionsLoader } from './loader/regionsLoader'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: regionsLoader
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)