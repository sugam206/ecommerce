import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={"YOUR "} text2={"CART"} />
            </div>
            <div className='space-y-4'>
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);
                    if (!productData) return null;

                    return (
                        <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-1 sm:grid-cols-[4fr_2fr_1fr_1fr] items-center gap-4'>
                            <div className='flex items-start gap-6'>
                                <img className='w-[3.75rem] sm:w-20' src={productData.image[0]} alt="" />
                                <div>
                                    <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                                    <div className='flex items-center gap-2'>
                                        <p>{currency}{productData.price}</p>
                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                                    </div>
                                </div>
                            </div>
                            <input
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value >= 1) {
                                        updateQuantity(item._id, item.size, value);
                                    }
                                }}
                                className='border max-w-[2.5rem] sm:max-w-[5rem] px-1 sm:px-2 py-1'
                                type="number"
                                min={1}
                                defaultValue={item.quantity}
                            />
                            <p>{currency}{(productData.price * item.quantity).toFixed(2)}</p>
                            <img
                                onClick={() => updateQuantity(item._id, item.size, 0)}
                                className='w-4 sm:w-5 cursor-pointer'
                                src={assets.bin_icon}
                                alt="Remove"
                            />
                        </div>
                    );
                })}
            </div>
            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <div className='w-full text-end'>
                        <button className='bg-slate-600 text-white text-sm my-8 px-8 py-3' onClick={() => navigate('/PlaceOrder')}>PROCESSED</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
