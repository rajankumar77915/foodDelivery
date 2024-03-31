import React, { useEffect, useState } from "react";
import MenuItem from "../menu/MenuItem";

const Homemenu = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/restaurant/getDishes/54321');
        const result = await response.json();
        setRestaurants(result.data);
        console.log(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="  rounded-lg">
      <section>
        <div className="text-center pt-3">
          <h3 className="uppercase text-richblack-400 font-semibold leading-4">
            checkout
          </h3>
         
          <h2 className="mb-4 text-red  font-bold text-4xl">Menu</h2>
        </div>
        
          <div className="mr-2 ml-2 m-4 gap-4 flex flex-wrap justify-around lg:px-32 ">
            {restaurants?.map((restaurant, index) => (
              restaurant.items.menu.map(item => (
                <MenuItem 
                  key={item._id}
                  item={item}
                />
              ))
            ))}
            {restaurants?.map((restaurant, index) => (
              restaurant.items.menu.map(item => (
                <MenuItem 
                  key={item._id}
                  item={item}
                />
              ))
            ))}
            {restaurants?.map((restaurant, index) => (
              restaurant.items.menu.map(item => (
                <MenuItem 
                  key={item._id}
                  item={item}
                />
              ))
            ))}
          </div>

      </section>
    </div>
  );
};

export default Homemenu;
