import React from 'react'
import { Sidebar, Container, Rightsidebar } from './component'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Container className='w-full relative bg-black text-white flex min-h-screen '>
        <Sidebar />
        <Outlet />
        <Rightsidebar />
      </Container>

    </>
  )
}

export default App