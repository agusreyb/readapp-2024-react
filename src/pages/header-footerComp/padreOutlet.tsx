import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { useState } from 'react'

const Layout =()   => {
 const [titulo, setTitulo] = useState('')
 
return (
    <>
      <div className="page">
        <Header titulo={titulo} />
        <div className="inside-page">
        <Outlet context={{ setTitulo }} /> 
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout