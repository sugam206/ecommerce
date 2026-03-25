import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { ProductId } = useParams();
    const navigate = useNavigate();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async () => {
        if (!ProductId) {
            console.error('Invalid ProductId');
            navigate('/'); // Redirect to home if ProductId is invalid
            return;
        }

        console.log('ProductId:', ProductId);
        const product = products.find((item) => item._id === ProductId);
        if (product) {
            setProductData(product);
            setImage(Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : 'https://dummyimage.com/150x150/cccccc/000000&text=No+Image');
        } else {
            console.error('Product not found');
            navigate('/'); // Redirect to home if product is not found
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [ProductId, products]);

    return productData ? (
        <div className="border-t-2 pt-10 container mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 flex flex-col-reverse lg:flex-row gap-3">
                    <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto justify-between lg:justify-start w-full lg:w-1/5">
                        {Array.isArray(productData.image) && productData.image.map((item, index) => (
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
                        <img src={image || 'https://dummyimage.com/150x150/cccccc/000000&text=No+Image'} className="w-full h-auto rounded-md shadow-md" alt={productData.name} />
                    </div>
                </div>
                <div className="flex-1">
                    <h1 className="font-semibold text-3xl mt-2">{productData.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        {/* Star icons */}
                    </div>
                    <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
                    <p className="mt-5 text-green-500 md:w-4/5">{productData.description}</p>
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">
                            {Array.isArray(productData.sizes) && productData.sizes.map((item, index) => (
                                <button
                                    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                                    onClick={() => setSize(item)}
                                    key={index}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
                        ADD TO CART
                    </button>
                </div>
            </div>
            <RelatedProducts category={productData.category || 'Uncategorized'} subCategory={productData.subCategory || 'General'} />
        </div>
    ) : (
        <div className="text-center py-20">
            <p className="text-gray-500">Product not found</p>
            <button onClick={() => navigate('/')} className="bg-black text-white px-4 py-2 mt-4">
                Go Back
            </button>
        </div>
    );
};

export default Product;
