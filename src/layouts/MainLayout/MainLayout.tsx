import React from 'react'
import Header from "../../components/Header/Header"
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />

      </main>
      <Footer />
    </>
  )
}

export default MainLayout