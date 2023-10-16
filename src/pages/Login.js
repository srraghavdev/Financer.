import React from 'react'
import Header from '../components/Header'
import LoginComponent from '../components/LoginComponent'
import Footer from '../components/Footer'

function Login() {
  return (
    <div>
        <Header></Header>
        <div className='wrapper'>
            <LoginComponent></LoginComponent>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Login