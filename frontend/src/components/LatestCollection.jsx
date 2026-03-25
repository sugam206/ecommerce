import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        console.log('Products:', products);
        if (Array.isArray(products) && products.length > 0) {
            const latest = products.slice(0, 10);
            console.log('Latest Products:', latest);
            setLatestProducts(latest);
        }
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTION'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, molestiae quia, labore totam quisquam consequatur iure alias fugiat tempore velit quaerat in quasi quam veritatis sunt, officiis molestias quibusdam blanditiis.
                </p>
            </div>
            {/* rendering product */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.length === 0 ? (
                    <p className="text-center col-span-full">No latest products available</p>
                ) : (
                    latestProducts.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id || 'N/A'}
                            image={Array.isArray(item.image) && item.image.length > 0 ? item.image[0] : 'https://dummyimage.com/150x150/cccccc/000000&text=No+Image'}
                            name={item.name || 'Unnamed Product'}
                            price={item.price || 0}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestCollection;