import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../src/App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            console.log('Fetching product list from:', backendUrl + "/api/product/list");
            const res = await axios.get(backendUrl + "/api/product/list");
            console.log('Response:', res.data);
            if (res.data.success) {
                setList(res.data.products);
            } else {
                toast.error(res.data.message || "Failed to fetch products");
            }
        } catch (error) {
            console.error('Error fetching product list:', error);
            toast.error(error.message || "An error occurred while fetching products");
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log('Deleting product with ID:', id);
            const res = await axios.delete(backendUrl + "/api/product/remove", {
                params: { id },
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Delete Response:', res.data);
            if (res.data.success) {
                toast.success(res.data.message);
                await fetchList();
            } else {
                toast.error(res.data.message || "Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error(error.response?.data?.message || "An error occurred while deleting the product");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <p className='mb-2'>All product list</p>
            <div className='flex flex-col gap-2'>
                {/* List table title */}
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className='text-center'>Actions</b>
                </div>
                {/* Product list */}
                {list.map((item, index) => (
                    <div
                        className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
                        key={index}
                    >
                        <img
                            className='w-12'
                            src={Array.isArray(item.image) && item.image.length > 0
                                ? item.image[0]
                                : Array.isArray(item.image_url) && item.image_url.length > 0
                                    ? item.image_url[0]
                                    : 'https://via.placeholder.com/150'}
                            alt={item.name || 'Product'}
                        />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{currency}{item.price}</p>
                        <p
                            onClick={() => handleDelete(item.id)}
                            className='text-right md:text-center cursor-pointer text-lg'
                        >
                            X
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default List;
