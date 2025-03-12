import React from 'react'
import CloseButton from '../components/CloseButton'

interface HeaderMenuProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

function HeaderMenu({show,setShow}:HeaderMenuProps) {

  const handleCloseHeaderMenu = () => {
    setShow(false)
  }

  return (<>
    <div className={`bg-gray-800 absolute left-0 top-0 w-full h-[10vh] transition-transform duration-2000 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-100 pointer-events-none"
      }`}>
      <div className='relative w-full h-full flex justify-between items-center px-10'>
        <div className='absolute right-1 top-1  '>
       <CloseButton onClick={handleCloseHeaderMenu} />
        </div>
      </div>
    </div>
    </>
  )
}

export default HeaderMenu