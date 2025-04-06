import React from 'react'
import Card from './component/Card/Card'
import Sidebar from './component/sidebar/Sidebar'

const App = () => {
  return (
    <>
      <div className='w-[70%] mx-auto'>
        <Card />
        <Sidebar/>
      </div>
    </>
  )
}

export default App