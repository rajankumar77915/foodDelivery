// pages/SimilarRestaurants.js
'use client'
import { useState } from 'react';
import { FaChevronRight } from "react-icons/fa6";
const SimilarRestaurants = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const restaurants = [
        {
            image: 'https://b.zmtcdn.com/data/pictures/0/20889270/32de92770b10f9b3c2c854c93c7f26f9.jpg?fit=around|771.75:416.25&amp;crop=771.75:416.25;',
            name: 'Geegal Kachori',
            cuisine: 'Street Food',
            location: 'Shahibagh, Ahmedabad',
            diningRating: 'DINING: 3.8',
            deliveryRating: 'DELIVERY: 4.1',
        },
        {
            image: 'https://b.zmtcdn.com/data/pictures/0/20889270/32de92770b10f9b3c2c854c93c7f26f9.jpg?fit=around|771.75:416.25&amp;crop=771.75:416.25;',
            name: 'Mugniai',
            cuisine: 'Street Food, Gujarati, North Indian',
            location: 'Naranpura, Ahmedabad',
            diningRating: 'DINING: 3.4',
            deliveryRating: 'DELIVERY: 4.1',
        },
        {
            image: 'https://b.zmtcdn.com/data/pictures/0/20889270/32de92770b10f9b3c2c854c93c7f26f9.jpg?fit=around|771.75:416.25&amp;crop=771.75:416.25;',
            name: 'Indore Chat House',
            cuisine: 'Street Food',
            location: 'Paldi, Ahmedabad',
            diningRating: 'DINING: 4.3',
            deliveryRating: 'DELIVERY: -',
        },
        {
            image: 'https://b.zmtcdn.com/data/pictures/0/20889270/32de92770b10f9b3c2c854c93c7f26f9.jpg?fit=around|771.75:416.25&amp;crop=771.75:416.25;',
            name: 'Indore Chat House',
            cuisine: 'Street Food',
            location: 'Paldi, Ahmedabad',
            diningRating: 'DINING: 4.3',
            deliveryRating: 'DELIVERY: -',
        },
        {
            image: 'https://b.zmtcdn.com/data/pictures/0/20889270/32de92770b10f9b3c2c854c93c7f26f9.jpg?fit=around|771.75:416.25&amp;crop=771.75:416.25;',
            name: 'Indore Chat House',
            cuisine: 'Street Food',
            location: 'Paldi, Ahmedabad',
            diningRating: 'DINING: 4.3',
            deliveryRating: 'DELIVERY: -',
        },
        {
            image: 'https://b.zmtcdn.com/data/pictures/0/20889270/32de92770b10f9b3c2c854c93c7f26f9.jpg?fit=around|771.75:416.25&amp;crop=771.75:416.25;',
            name: 'Indore Chat House',
            cuisine: 'Street Food',
            location: 'Paldi, Ahmedabad',
            diningRating: 'DINING: 4.3',
            deliveryRating: 'DELIVERY: -',
        },
        {
            image: 'https://b.zmtcdn.com/data/pictures/0/20889270/32de92770b10f9b3c2c854c93c7f26f9.jpg?fit=around|771.75:416.25&amp;crop=771.75:416.25;',
            name: 'Indore Chat House',
            cuisine: 'Street Food',
            location: 'Paldi, Ahmedabad',
            diningRating: 'DINING: 4.3',
            deliveryRating: 'DELIVERY: -',
        },
        // Add more restaurants as needed
    ];

    const itemsPerPage = 4;
    const pageCount = Math.ceil(restaurants.length / itemsPerPage);

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % pageCount);
    };
    const handleBackClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1) % pageCount);
    };

    return (
        <>
        <h1 className='ml-2'>related restaurants</h1>
        <div className='flex'>
            {currentIndex > 0 && (
                <button className="w-1 flex items-center border-none" onClick={handleBackClick}>
                    &lt;back
                </button>
            )}

            <div className="container mx-auto flex flex-wrap justify-center items-center">
                {restaurants.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage).map((restaurant, index) => (
                    <div
                        key={index}
                        className="restaurant w-1/4 p-4"
                    >
                        <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-40 object-cover rounded-full"
                        />
                        <div className="info text-center mt-2">
                            <h2>{restaurant.name}</h2>
                            <p>{restaurant.cuisine}</p>
                            <p>{restaurant.location}</p>
                            <p>{restaurant.diningRating}</p>
                            <p>{restaurant.deliveryRating}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-1 flex items-center border-none" onClick={handleNextClick}>
            <FaChevronRight />
            </button>
        </div>
        </>
    );
};

export default SimilarRestaurants;
