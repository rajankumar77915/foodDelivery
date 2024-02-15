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
    <>
      <section>
        <div className="text-center">
          <h3 className="uppercase text-richblack-200 font-semibold leading-4">
            checkout
          </h3>
          <h2 className="mb-4 text-red italic font-bold text-4xl">menu</h2>
        </div>
        
          <div className="mr-2 ml-2 m-4 gap-5 flex flex-wrap justify-around pl-32 pr-32">
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
    </>
  );
};

export default Homemenu;
