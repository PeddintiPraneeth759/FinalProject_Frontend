import React from 'react'
import Header from '../components/Header'
import SpecialComponent from '../components/SpecialComponent'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialComponent/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home
