import React from 'react'
// import loader from "./Loader.module.css"
import "./Loader.css"

type LoaderProps = {
  width : number;
  height : number;
  top : number;
}
export default function Loader({width, height, top} : LoaderProps) {
  return (
    <>
      {/* <div className={loader.loader}>Loading...</div> */}
      <div className="container" style={{top: `${top}%`}}>
        <div className="dash one" style={{width: `${width}px`, height: `${height}px`}}></div>
        <div className="dash two" style={{ width: `${width}px` }}></div>
        <div className="dash three" style={{ width: `${width}px` }}></div>
        <div className="dash four" style={{ width: `${width}px` }}></div>
      </div>
    </>
  )
}
