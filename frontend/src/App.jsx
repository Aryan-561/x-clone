import React from 'react'
import { Sidebar, Container, Rightsidebar } from './component'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Container className='w-full relative bg-black text-white  grid  grid-cols-6  lg:grid-cols-8 xl:grid-cols-10 '>
        <Sidebar />
        <Outlet />
        <Rightsidebar />
      </Container>

    </>
  )
}

export default App