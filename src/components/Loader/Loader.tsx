import React from 'react'
// import loader from "./Loader.module.css"
import "./Loader.css"

export default function Loader() {
  return (
    <>
      {/* <div className={loader.loader}>Loading...</div> */}
      <div className="container">
        <div className="dash one"></div>
        <div className="dash two"></div>
        <div className="dash three"></div>
        <div className="dash four"></div>
        
      </div>
    </>
  )
}
