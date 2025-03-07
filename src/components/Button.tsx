import React from 'react'

type ButtonProps = {
    className?: string;
    children: React.ReactNode;
    onClick: () => void;
  };

const Button:React.FC<ButtonProps> = (props) => {
  const {children, onClick, className} = props
  
  return (  
<>
<button className={` border-1  py-1 px-2 rounded flex items-center gap-1 ${className}`} onClick={onClick}>
  {children}
</button>
</>
  )
}

export default Button