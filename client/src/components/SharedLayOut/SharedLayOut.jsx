import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

function SharedLayOut() {
  return (
    <div>
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default SharedLayOut