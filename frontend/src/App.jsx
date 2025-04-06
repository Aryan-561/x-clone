import React from 'react'
import Card from './component/Card/Card'
import {Sidebar,Container, Input,Rightsidebar} from './component'


const App = () => {
  return (
    <>
      <Container className='w-full flex min-h-screen px-10'>
        <Sidebar/>
        {/* <Card /> */}
        <Rightsidebar/>
      </Container>

    </>
  )
}

export default App