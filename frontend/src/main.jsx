import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Homepage from './routes/Homepage.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Write from './routes/Write.jsx'
import PostListPage from './routes/PostListPage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import RegisterPage from './routes/RegisterPage.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import About from './routes/About.jsx'
import SinglePostPage from './routes/SinglePostPage.jsx'
import {ClerkProvider} from '@clerk/clerk-react'

import axios from 'axios'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  //throw new Error("Missing Publishable Key")
}



const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/:slug",
        element: <SinglePostPage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router= {router}></RouterProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
