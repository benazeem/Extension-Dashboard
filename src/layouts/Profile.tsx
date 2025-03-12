import React from 'react'
import CloseButton from '../components/CloseButton'

function Profile({show,setShow}) {
  return (
    <>
    <div className={`w-screen h-screen bg-gray-700 z-2 absolute top-0 left-0 flex justify-center items-center transition-transform duration-2000 ${
        show ? "-translate-y-0 opacity-100" : "translate-y-full opacity-100 pointer-events-none"}`}>
    <CloseButton className='right-2 top-2 absolute' onClick={() => setShow(false)}/></div>
    </>
  )
}

export default Profile