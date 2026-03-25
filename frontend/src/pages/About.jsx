import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
    return (
        <div>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'About'} text2={'Us'} />
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos pariatur voluptas rem quod inventore itaque dolor sequi facilis amet optio praesentium, tenetur placeat, sed ullam eveniet! Temporibus excepturi eveniet voluptate?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita nemo sequi aliquam. Quibusdam debitis, dolorem explicabo adipisci delectus magni, nulla qui dicta, quos sed veritatis repellat. Odio possimus natus quibusdam?</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, officiis atque reprehenderit sequi enim et quis architecto earum ducimus aliquid ullam deserunt sapiente, omnis, sed aspernatur sit autem deleniti quas?</p>
                </div>
            </div>
            <div className='text-xl py-4'>
                <Title text1={'Why'} text2={'Choose Us'} />
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20 '>
                <div className='border px-10 md:px-16 py-18 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assruance:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat cupiditate exercitationem sapiente ducimus consequatur corrupti inventore enim consectetur maiores ea. Quaerat deserunt suscipit facere quis, numquam esse deleniti. Voluptas, adipisci.</p>
                </div>
                <div className='border px-10 md:px-16 py-18 sm:py-20 flex flex-col gap-5'>
                    <b>convenience:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat cupiditate exercitationem sapiente ducimus consequatur corrupti inventore enim consectetur maiores ea. Quaerat deserunt suscipit facere quis, numquam esse deleniti. Voluptas, adipisci.</p>
                </div>
                <div className='border px-10 md:px-16 py-18 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat cupiditate exercitationem sapiente ducimus consequatur corrupti inventore enim consectetur maiores ea. Quaerat deserunt suscipit facere quis, numquam esse deleniti. Voluptas, adipisci.</p>
                </div>
            </div>
            <NewsletterBox />
        </div>
    )
}

export default About