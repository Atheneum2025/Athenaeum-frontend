import React, { useEffect } from 'react'

export default function () {

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>Documents</div>
  )
}
