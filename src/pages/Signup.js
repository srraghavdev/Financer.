import React from 'react'
import Header from '../components/Header'
import SignupSignin from '../components/SignupSignin'
import Footer from '../components/Footer'
function Signup() {
  return (
    <div>
        <Header></Header>
        <div className='wrapper'>
            <SignupSignin></SignupSignin>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Signup