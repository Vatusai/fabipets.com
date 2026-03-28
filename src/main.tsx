import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './i18n'
import './index.css'
import App from './App.tsx'

// Admin
import AdminLayout from './admin/layout/AdminLayout.tsx'
import LoginPage from './admin/pages/LoginPage.tsx'
import DashboardPage from './admin/pages/DashboardPage.tsx'
import MessagesPage from './admin/pages/MessagesPage.tsx'
import ProductsPage from './admin/pages/ProductsPage.tsx'
import OrdersPage from './admin/pages/OrdersPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'messages', element: <MessagesPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'orders', element: <OrdersPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
