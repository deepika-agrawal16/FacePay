import React from 'react'
import facepaybanner from '../images/facepaybanner.png'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import AboutFacePay from './AboutFacePay'
import HomeScorable from './HomeScorable'
import Contact from './Contact'
import Features from './Feautres'
import Footer from './Footer'

const HomePage = () => {
  const navigate = useNavigate()
  return (
   
    <div className='relative w-full h-screen bg-gradient-to-r from-blue-600 to-blue-400'>
      <NavBar />

      {/* Content Section */}
      <div className='flex items-center justify-between h-full px-12 pt-16'>
        {/* Left Side: Text */}
        <div className='max-w-lg text-white'>
          <h1 className='text-5xl font-extrabold leading-tight'>
            A Easy Concept of Paying through <br /> your Facial Identification
          </h1>
          <p className='mt-4 text-xl font-semibold text-gray-200'>
            Simplifying your shopping and payment experience <br /> with Facepay
          </p>
          <button
            className='px-6 py-3 mt-6 text-lg font-semibold text-blue-600 bg-white rounded-lg shadow-md hover:bg-gray-100'
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
        </div>

        {/* Right Side: Image */}
        <div className='flex justify-center'>
          <img
            src={facepaybanner}
            alt='FacePay'
            className='w-[500px] h-auto rounded-lg shadow-lg'
          />
        </div>
      </div>
      <AboutFacePay />
      <HomeScorable/>
      <Features />
      <Contact />
      
    </div>
  )
}

export default HomePage
