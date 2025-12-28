import Center_container from '@/CENTERCONTAINER/Center_container'
import Left_Container from '@/LEFTCONTAINER/Left_Container'
import Right_container from '@/RIGHTCONTAINER/Right_container'
import React from 'react'

const Home = () => {
  return (
    <div className='flex justify-between w-full h-screen overflow-hidden'>
      <Left_Container />
      <Center_container />
      <Right_container />
    </div>
  )
}

export default Home
