import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-12 '>
           <img className='w-full md:max-w-[360px]' src={assets.gallery6} alt="" />
           <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
            <p>At PlanPerfectly, we specialize in creating unforgettable events tailored to your vision, style, and budget. From weddings and corporate gatherings to private celebrations, our experienced team handles every detail — from venue selection and vendor coordination to decor and day-of execution — ensuring a seamless and stress-free experience. With a passion for creativity and a commitment to excellence, we turn ordinary moments into extraordinary memories, making your special day truly one of a kind.</p>
           </div>
        </div>
    </div>
  )
}

export default About