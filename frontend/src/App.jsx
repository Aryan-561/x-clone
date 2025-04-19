import React from 'react'
import Card from './component/Card/Card'
import { Sidebar, Container, Rightsidebar, Login,Signup } from './component'


const App = () => {
  return (
    <>
      <Container className='w-full  bg-blue-800 text-amber-50 flex min-h-screen '>
        <Sidebar/>
        <Card />
        <Rightsidebar/>
        {/* <Login /> */}
        <Signup/>
      </Container>

    </>
  )
}

export default App