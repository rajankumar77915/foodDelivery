import { useState } from 'react';

const FoodListPage = () => {
  const [foods] = useState([
    {
      name: 'Geegal Kachori',
      image: 'geegal-kachori.jpg',
      rating: 4.5,
    },
    {
      name: 'Mugniai',
      image: 'mugniai.jpg',
      rating: 4.2,
    },
    {
      name: 'Indore Chat House',
      image: 'indore-chat-house.jpg',
      rating: 4.8,
    },
    // Add more food items as needed
  ]);

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        {foods.map((food, index) => (
          <div key={index} className="flex items-center mb-4">
            <img src={food.image} alt={food.name} className="w-24 h-24 object-cover rounded-full mr-4" />
            <div>
              <h2>{food.name}</h2>
              <p>Rating: {food.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodListPage;
