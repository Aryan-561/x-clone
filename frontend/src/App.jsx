import React from 'react'
import Card from './component/Card/Card'
import { Sidebar, Container, Rightsidebar, Login,Signup } from './component'


const App = () => {
  return (
    <>
      <Container className='w-full  bg-black text-amber-50 flex min-h-screen sm:px-10'>
        {/* <Sidebar/>
        <Card />
        <Rightsidebar/> */}

        <Login />
        <Signup/>
      </Container>

    </>
  )
}

export default App