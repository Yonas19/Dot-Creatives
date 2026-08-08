import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'projects', Component: Projects },
    ],
  },
])
