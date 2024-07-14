import React from 'react'
import logo from "../../images/route.jpg" ;
export default function Footer() {
  return <>
 <footer className='border p-5 d-flex justify-content-center mt-5'>
    <div className='text-center'>
    <img src={logo} alt="Route Logo" height={100} width={100}/>
    <h2 className='py-3'>Route Tech Summit 2024</h2>
    </div>
 </footer>
  </>
}
