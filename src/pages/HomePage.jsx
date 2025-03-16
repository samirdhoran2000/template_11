import React from 'react'
import PropertyHeader from '../components/Header'
import PropertyDetails from '../components/PropertyDetails'
import PropertyPriceTable from '../components/PropertyPrice'
import Footer from '../components/Footer'
import ReraInformation from '../components/Rera'
import VideoTour from '../components/VideoTour'
import FAQ from '../components/FAQ'
import Banks from '../components/Banks'
import UnitLayout from '../components/PropertyLayout'
import LocationAdvantages from '../components/LocationAdvantages'
import Blogs from '../components/Blogs'
import ContactUs from '../components/ContactUs'
import Location from '../components/Location'

const HomePage = () => {
  return (
      <>
      <h1 style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        {import.meta.env.VITE_H1}
      </h1>
      <h2 style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        {import.meta.env.VITE_H2}
      </h2>
          <PropertyHeader />
          <ReraInformation />
          <PropertyDetails />
          
          <VideoTour />
          <PropertyPriceTable />
          
          <Banks />
          <UnitLayout />
          <LocationAdvantages />
          <Blogs />
          <ContactUs />


          <FAQ />
          <Location />
          

          {/* <Footer /> */}
      
      </>
  )
}

export default HomePage