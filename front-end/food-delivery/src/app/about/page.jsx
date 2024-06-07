
'use client'
import ContactDetails from './ContactPage/ContactDetails'
import ContactForm from './ContactPage/ContactForm'




const FoodOrderAbout = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        
        {/* <ReviewSlider /> */}
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default FoodOrderAbout
