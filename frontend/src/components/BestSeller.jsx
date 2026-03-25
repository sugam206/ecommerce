import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        console.log('Products:', products);
        const bestProduct = Array.isArray(products) ? products.filter((item) => item.bestSeller) : [];
        console.log('Best Sellers:', bestProduct);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xm sm:text-sm md:text-base text-gray-600'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat reprehenderit accusamus illum necessitatibus at atque ullam, veritatis saepe, illo, doloremque nam? Optio explicabo nam rem voluptates recusandae itaque commodi.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.length === 0 ? (
                    <p className="text-center col-span-full">No best sellers available</p>
                ) : (
                    bestSeller.map((item, index) => (
                        <ProductItem
                            className='border rounded-lg p-4'
                            key={index}
                            id={item._id || 'N/A'}
                            name={item.name || 'Unnamed Product'}
                            image={Array.isArray(item.image) && item.image.length > 0 ? item.image[0] : 'https://dummyimage.com/150x150/cccccc/000000&text=No+Image'}
                            price={item.price || 0}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default BestSeller;