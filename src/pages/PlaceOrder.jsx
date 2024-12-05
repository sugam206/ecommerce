import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate } = useContext(ShopContext);
    return (
        <div className='flex flex-col justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* left side*/}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl my-3 sm:text-2xl'>
                    <Title text1={'delivery'} text2={'information'} />
                </div>
                <div className='flex gap-3'>
                    <input type="text" placeholder='First Name' className='border border-gray-300 rounded py-3.5 w-full' required />
                    <input type="text" placeholder='Last Name' className='border border-gray-300 rounded py-3.5 w-full' required />
                </div>
                <input type="email" placeholder='Email Address' className='border border-gray-300 rounded py-3.5 w-full' required />
                <input type="text" placeholder='Street' className='border border-gray-300 rounded py-3.5 w-full' required />
                <div className='flex gap-3'>
                    <input type="text" placeholder='City' className='border border-gray-300 rounded py-3.5 w-full' required />
                    <input type="text" placeholder='State' className='border border-gray-300 rounded py-3.5 w-full' required />
                </div>
                <div className='flex gap-3'>
                    <input type="number" placeholder='Zip Code' className='border border-gray-300 rounded py-3.5 w-full' required />
                    <input type="text" placeholder='Country' className='border border-gray-300 rounded py-3.5 w-full' required />
                </div>
                <input type="number" placeholder='Phone' className='border border-gray-300 rounded py-3.5 w-full' />
            </div>
            {/* right side */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* Method Section */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.stripe_logo} className='h-5 mx-4' alt="Stripe Logo" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.razorpay_logo} className='h-5 mx-4' alt="Razorpay Logo" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 font-medium text-sm mx-4'>Cash On Delivery</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button onClick={() => navigate('/Order')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
