// components/Pizzeria.js

import Head from 'next/head';
import  FoodDetail  from "../componant/perticularFood/FoodDetail"
import  SimilarRestaurants  from "../componant/perticularFood/relatedHotel"
const Pizzeria = () => {
  return (
    <>
    <FoodDetail/>
      <Head>
        <title>La Milano Pizzeria</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="container mx-auto">
        {/* <div className="header bg-gray-200 py-5">
          <h1 className="text-center">La Milano Pizzeria</h1>
        </div> */}
        <div className="menu flex justify-around py-5">
          <a href="#" className="active">Overview</a>
          <a href="#">Menu</a>
          <a href="#">Reviews</a>
        </div>
        {/* content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
                    
          {/* Add more items here */}
        </div>
        
      </div>
      <SimilarRestaurants/>
    </>
  );
};

export default Pizzeria;
