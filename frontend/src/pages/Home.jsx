import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopVendors from '../components/TopVendors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
        <Header />  
        <SpecialityMenu />
        <TopVendors />
        <Banner />
    </div>
  )
}

export default Home