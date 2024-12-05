import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { assets, products } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { ProductId } = useParams();
    const { Products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')
    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === ProductId) {
                setProductData(item);
                setImage(item.image[0])
                return (null);

            }
        })
    }
    useEffect(() => {
        fetchProductData();
    }, [ProductId])
    return productData ? (
        <div className="border-t-2 pt-10 container mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 flex flex-col-reverse lg:flex-row gap-3">
                    <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto justify-between lg:justify-start w-full lg:w-1/5">
                        {productData.image.map((item, index) => (
                            <img
                                src={item}
                                key={index}
                                onClick={() => setImage(item)}
                                className="w-1/4 lg:w-full lg:mb-3 flex-shrink-0 cursor-pointer border rounded-md hover:shadow-lg"
                                alt=""
                            />
                        ))}
                    </div>
                    <div className="w-full lg:w-4/5">
                        <img src={image} className="w-full h-auto rounded-md shadow-md" alt={productData.name} />
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="font-semibold text-3xl mt-2">{productData.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        <img src={assets.star_icon} alt="Star" className="w-6 h-6" />
                        <img src={assets.star_icon} alt="Star" className="w-6 h-6" />
                        <img src={assets.star_icon} alt="Star" className="w-6 h-6" />
                        <img src={assets.star_icon} alt="Star" className="w-6 h-6" />
                        <img src={assets.star_dull_icon} alt="Star" className="w-6 h-6" />
                        <p className='pl-2'>{122}</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                    <p className='mt-5 text-green-500 md:w-4/5'>{productData.description}</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <p>Select Size</p>
                        <div className='flex gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} onClick={() => setSize(item)} key={index}>{item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => addToCart(productData._id, size)
                    } className=' bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
                    <hr className='mt-8 sm:w-4/5 ' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Orginal product</p>
                        <p> cash delivery is available</p>
                        <p>easy return and exchange policy with in 14 days</p>
                    </div>
                </div>
            </div>
            {/* discription and review section */}
            <div className='mt-20 '>
                <div className='flex '>
                    <b className='border px-5 py-3 text-sm '>Description</b>
                    <p className='border px-5 py-3 text-sm '>Reviews(122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea amet exercitationem omnis accusantium hic qui fugit ullam natus quod rerum provident, placeat nisi! Minus obcaecati sequi quae assumenda ullam adipisci?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis dolore necessitatibus animi, possimus saepe, ipsam quis iste ullam quibusdam dolor nobis obcaecati unde amet aperiam harum mollitia illum autem nam. </p>
                </div>
            </div>
            {/* display related products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div >
    ) : <div className=' opacity-0'>

    </div>
}

export default Product