import React from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
type ButtonProps = {
    className?: string;
    onClick: () => void;
  };

const CloseButton:React.FC<ButtonProps> = (props) =>{  
    const { onClick, className} = props
  return (
<button className={`py-1 px-2 rounded flex items-center gap-1 ${className}`} onClick={onClick}>
<IoIosCloseCircleOutline />
</button>


)
}

export default CloseButton


