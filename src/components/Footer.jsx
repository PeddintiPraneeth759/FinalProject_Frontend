import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
   <div className=' flex-col grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      {/* left side */}
      <div>
          <h3 className='font-normal text-xl text-primary '>Hospital Management System</h3> <br />
          <p className='text-gray-400'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
      {/* center side */}
      <div>
        <p className='font-medium leading-9'>COMPANY</p>
        <ul className='text-gray-400 gap-5'>
          <li>Home</li>
          <li>About us</li>
          <li>Contact Us</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      {/* right side */}
      <div>
       <p className='font-medium leading-9'>GET IN TOUCH</p>
       <ul className='text-gray-400 gap-5'>
        <li>+1-212-456-7890</li>
        <li>Praneeth05@gmail.com</li>
       </ul>
      </div>
 </div>
     {/* copy right */}
    
    </div>


  )
}

export default Footer
