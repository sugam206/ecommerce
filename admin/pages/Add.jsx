import React, { useState } from 'react';
import { assets } from '../src/assets/assets';
import { backendUrl } from '../src/App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState('Topwear');
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("sub_category", subCategory);
            formData.append("bestseller", bestseller ? 1 : 0); // As a number
            formData.append("size", JSON.stringify(sizes));

            console.log('Submitting product:', {
                name,
                description,
                price,
                category,
                subCategory,
                bestseller,
                sizes,
                images: [image1, image2, image3, image4],
            });

            const res = await axios.post(`${backendUrl}/api/product/add`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                toast.success(res.data.message);
                setImage1(null);
                setImage2(null);
                setImage3(null);
                setImage4(null);
                setName("");
                setDescription("");
                setPrice("");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error during API call:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'An error occurred while adding the product');
        }
    };

    return (
        <form className='flex flex-col w-full items-start' onSubmit={onSubmitHandler}>
            <div>
                <p className='mb-2'>upload image</p>
            </div>
            <div className='flex gap-2'>
                <label htmlFor="image1">
                    <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                    <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
                </label>
                <label htmlFor="image2">
                    <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                    <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
                </label>
                <label htmlFor="image3">
                    <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                    <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
                </label>
                <label htmlFor="image4">
                    <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                    <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
                </label>
            </div>
            <div className='w-full'>
                <p className='mb-2'>product name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='type here' required />
            </div>
            <div className='w-full'>
                <p className='mb-2'>product Description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Description' required />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product caterogy</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Sub Caterogy</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Topwear">Topwear</option>
                        <option value="Middlewear">Middlewear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='rs 25' required />
                </div>
            </div>
            <div>
                <p className='mb-2'>Product size</p>
                <div className='flex gap-3'>
                    <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} >
                        <p className={`${sizes.includes("S") ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                        <p className={`${sizes.includes("M") ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                        <p className={`${sizes.includes("L") ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                        <p className={`${sizes.includes("XL") ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                        <p className={`${sizes.includes("XXL") ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
                    </div>
                </div>
                <div className='flex gap-2 mt-2'>
                    <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" name="" id="bestseller" />
                    <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
                </div>
                <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>Add</button>

            </div>
        </form>
    );
};

export default Add;
