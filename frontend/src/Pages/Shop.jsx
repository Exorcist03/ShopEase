// this is the main page
import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offer from '../Components/Offers/Offer'
import Newcollections from '../Components/NewCollections/Newcollections'
import Newsletter from '../Components/Newsletter/Newsletter'

const Shop = () => {
  return (
    <div>
      <Hero></Hero>
      <Popular/>
      <Offer></Offer>
      <Newcollections/>
      <Newsletter/>
    </div>
  )
}

export default Shop
