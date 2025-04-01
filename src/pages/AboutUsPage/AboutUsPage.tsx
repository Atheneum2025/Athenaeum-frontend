import React, { useEffect } from 'react'
import ContactUs from '../ContactUs/ContactUs'

export default function AboutUsPage() {

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
      <div>About Us</div>
      <ContactUs />
    </>
  )
}
