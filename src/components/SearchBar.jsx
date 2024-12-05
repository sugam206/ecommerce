import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, showSearch, setSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    return showSearch && visible ? (
        <div className='mt-4 text-center'>
            <div className='flex items-center justify-center border border-gray-400 px-5 py-2 mx-auto rounded-full w-3/4 sm:w-1/2 bg-gray-50'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 outline-none bg-inherit text-sm'
                    type="search"
                    name="search"
                    placeholder='search'
                />
                <img className='w-4' src={assets.search_icon} alt="search icon" />
            </div>
        </div>
    ) : null;
};

export default SearchBar;
