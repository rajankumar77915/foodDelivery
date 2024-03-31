// components/FoodDetail.js

import Image from "next/image";

// import perticularFood from "../../componant/perticularFood"
const FoodDetail = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 p-2">
          <div className="aspect-w-4 aspect-h-2">
            <div className="bg-gray-200 aspect-w-4 aspect-h-2"></div>
            <img alt="image" src="https://b.zmtcdn.com/data/pictures/0/20889270/32de92770b10f9b3c2c854c93c7f26f9.jpg?fit=around|771.75:416.25&amp;crop=771.75:416.25;*,*" loading="lazy" className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="flex flex-col justify-between w-full md:w-1/3 lg:w-1/12">


          <img alt="image" src="https://b.zmtcdn.com/data/reviews_photos/bcd/2beaa0a74a31fe5a19b066b1122bebcd_1703668602.jpg?fit=around|300:273&amp;crop=300:273;*,*" loading="lazy" className="object-cover w-full h-full" />


          <img alt="image" src="https://b.zmtcdn.com/data/reviews_photos/c71/8f3acae5c1fd9212f129f86b6a509c71_1703668600.jpg?fit=around|300:273&amp;crop=300:273;*,*" loading="lazy" className="object-cover w-full h-full" />

        </div>
        <div className="flex flex-col justify-between w-full md:w-1/3 lg:w-1/12 relative">


          {/* <div className="bg-gray-200 aspect-w-4 aspect-h-3"></div> */}
          <img alt="image" src="https://b.zmtcdn.com/data/reviews_photos/1a8/e5c62a704dae638800eec851ac5b31a8_1703668591.jpg?fit=around|300:273&amp;crop=300:273;*,*" loading="lazy" className="object-cover w-full h-full" />


          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity opacity-50 hover:opacity-100">
            <p className="text-white text-center cursor-pointer">View Gallery</p>
          </div>
        </div>
      </div>

    {/* pizzeria-info  */}
      <div className="p-4 mb-4">
        <div className="flex justify-around">
          <div>
            <h1 className="text-2xl font-bold mb-2">RP's Pizzeria</h1>
            {/* categories */}
            <div className="mb-2">
              <span className="text-gray-600">Pizza, Fast Food, Italian, Pasta</span>
            </div>
            {/* location */}
            <div className="mb-2">
              <span className="text-gray-600">Navrangpura, Ahmedabad</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600">Closes in 46 minutes - 11am - 11pm (Today)</span>
            </div>

            <div className=" flex justify-between mb-4 mr-10 w-36 gap-3">
          <button className="direction bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Direction
          </button>
          <button className="bookmark bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Bookmark
          </button>
          <button className="bookmark bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Share
          </button>
        </div>
          </div>

          {/*ratings*/}
          <div className="flex justify-between mb-4">
            <div className="dining-ratings flex-1  p-4 mr-4">
              <h2 className="text-sm font-bold">Dining Ratings</h2>
              
              <div >
                <span className="text-gray-600">4.2</span>
                <span className="text-gray-600">out of 5</span>
              </div>
              <div>
                <span className="text-gray-600">1,726</span>
                <span className="text-gray-600">reviews</span>
              </div>
            </div>

            <div className="w-40 flex-1  p-4">
              <h2 className="text-sm font-bold ">Delivery Ratings</h2>
              
              <div className="">
                <span className="text-gray-600">4.2</span>
                <span className="text-gray-600">out of 5</span>
              </div>
              <div className="reviews">
                <span className="text-gray-600">11.7K</span>
                <span className="text-gray-600">reviews</span>
              </div>
            </div>
          </div>
          {/*  */}
        </div>



        
      </div>

      {/* Add image component here */}
    </>
  );
};

export default FoodDetail;
