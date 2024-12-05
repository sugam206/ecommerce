import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full sm:w-2/3 text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis hic recusandae inventore aliquid vitae officia? Dolorem consequatur, soluta, quam ducimus nobis placeat repudiandae nemo deserunt in quae consectetur, ea magnam!
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Get in touch</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+545654685</li>
                    <li>asfglasj@gmail.com</li>
                </ul>
            </div>
            <div className='col-span-full'>
                <hr />
                <p className='py-5 text-sm text-center'>© 2024 Company Name. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
