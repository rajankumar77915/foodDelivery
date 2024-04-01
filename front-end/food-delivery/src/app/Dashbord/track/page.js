"use client"
import { use, useEffect, useRef, useState } from "react";
import { TiTick } from "react-icons/ti";
import Stepper from "./Componant/stepar.js"
import {formatDate} from "../../../services/formatDate.js"
const Track = () => {
  const [isClient, setIsClient] = useState(false)
  const [currentSubsection, setCurrentSubsection] = useState(
    {
      "qunitity": 1,
      "_id": "65d1d350b2ed76912923df82",
      "item": {
        "foodTags": [],
        "quantity": 1,
        "_id": "65b1c156875b01e39d3fb32e",
        "itemName": "lassi",
        "description": "Lassi is a cooling, refreshing, probiotic drink perfect for the warm",
        "price": 40,
        "tax": 1.5,
        "image": "https://images.unsplash.com/photo-1527406619566-0159590b8540?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFzc2l8ZW58MHx8MHx8fDA%3D",
        "category": "65b1c1bc875b01e39d3fb331",
        "ratingsAndReviews": [],
        "isVeg": true,
        "__v": 2,
        "foodVarity": [
          "[\"jain\",\"veg\"]"
        ],
        "restaurantId": "659f7465da09eb38b30d651e"
      },
      "available": true,
      "orderStatus": "delivered",
      "__v": 0
    }
  )

  const [deliveryAddress , SetdeliveryAddress]=useState("");

  // useEffect(() => {
  //   console.log("hello", currentSubsection?.orderStatus)
  // },[setCurrentSubsection,currentSubsection])
  const [orders, setOrders] = useState([

    [
      {
        "deliveryAddress": {
          "street": "house no.3 ,Kamlesh park society, vaniyavad circle.",
          "city": "nadiad",
          "state": "gujarat",
          "country": "india",
          "pincode": 387001
        },
        "_id": "65d1d350b2ed76912923df84",
        "user": "659e225b7ce29131f2ad70f8",
        "SubsectionOrder": [
          {
            "qunitity": 1,
            "_id": "65d1d350b2ed76912923df82",
            "item": {
              "foodTags": [],
              "quantity": 1,
              "_id": "65b1c156875b01e39d3fb32e",
              "itemName": "lassi",
              "description": "Lassi is a cooling, refreshing, probiotic drink perfect for the warm",
              "price": 40,
              "tax": 1.5,
              "image": "https://images.unsplash.com/photo-1527406619566-0159590b8540?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFzc2l8ZW58MHx8MHx8fDA%3D",
              "category": "65b1c1bc875b01e39d3fb331",
              "ratingsAndReviews": [],
              "isVeg": true,
              "__v": 2,
              "foodVarity": [
                "[\"jain\",\"veg\"]"
              ],
              "restaurantId": "659f7465da09eb38b30d651e"
            },
            "available": true,
            "orderStatus": "delivered",
            "__v": 0
          }
        ],
        "paymentStatus": false,
        "orderDate": "2024-02-18T09:52:10.404Z",
        "__v": 0
      },
      {
        "deliveryAddress": {
          "street": "nadiad",
          "city": "nadiad",
          "state": "smkmskmksmksmk;mk dim ,",
          "country": "india",
          "pincode": 396521
        },
        "_id": "65d6d4e632262a00092bd5ae",
        "user": "65d48260690be32f15a161b8",
        "SubsectionOrder": [
          {
            "_id": "65d6d4e632262a00092bd5b1",
            "item": {
              "quantity": 1,
              "_id": "659eca1c2aeadf8b622096c0",
              "itemName": "Margherita Pizza",
              "description": "Classic pizza with tomato, mozzarella, and basil.",
              "price": 12,
              "tax": 1.5,
              "image": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              "category": "659ec8dfb169a2cc1cfa612c",
              "ratingsAndReviews": [
                "659ecddc747eab1221f0270e",
                "659ecdf727c90ad09d407fdc"
              ],
              "isVeg": true,
              "__v": 2,
              "foodVarity": [
                "[\"jain\",\"veg\"]"
              ],
              "foodTags": [
                ""
              ],
              "restaurantId": "659f7465da09eb38b30d651e"
            },
            "available": true,
            "qunitity": 1,
            "orderStatus": "confirmed",
            "__v": 0
          }
        ],
        "paymentStatus": true,
        "orderDate": "2024-02-22T04:59:53.411Z",
        "__v": 1
      },
      {
        "_id": "65d6dc0132262a00092bd64a",
        "user": "65d48260690be32f15a161b8",
        "SubsectionOrder": [
          {
            "_id": "65d6dc0132262a00092bd64d",
            "item": {
              "quantity": 1,
              "_id": "659f721cd9bce27759736882",
              "itemName": "special  Pizza",
              "description": "Classic pizza with tomato, kurkure, and onlion.",
              "price": 30,
              "tax": 1.5,
              "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWF4aWNhbiUyMHBpenphfGVufDB8fDB8fHww",
              "category": "659ec8dfb169a2cc1cfa612c",
              "ratingsAndReviews": [],
              "isVeg": true,
              "__v": 0,
              "foodVarity": [
                "[\"jain\",\"veg\"]"
              ],
              "foodTags": [
                ""
              ],
              "restaurantId": "659f7465da09eb38b30d651e"
            },
            "available": true,
            "qunitity": 1,
            "orderStatus": "canceled",
            "__v": 0
          }
        ],
        "paymentStatus": false,
        "orderDate": "2024-02-22T04:59:53.411Z",
        "__v": 1
      },
      {
        "_id": "65d6f4a9576df5cd51f73db4",
        "user": "65d48260690be32f15a161b8",
        "SubsectionOrder": [
          {
            "_id": "65d6f4aa576df5cd51f73db7",
            "item": {
              "foodTags": [],
              "quantity": 1,
              "_id": "65b1c156875b01e39d3fb32e",
              "itemName": "lassi",
              "description": "Lassi is a cooling, refreshing, probiotic drink perfect for the warm",
              "price": 40,
              "tax": 1.5,
              "image": "https://images.unsplash.com/photo-1527406619566-0159590b8540?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFzc2l8ZW58MHx8MHx8fDA%3D",
              "category": "65b1c1bc875b01e39d3fb331",
              "ratingsAndReviews": [],
              "isVeg": true,
              "__v": 2,
              "foodVarity": [
                "[\"jain\",\"veg\"]"
              ],
              "restaurantId": "659f7465da09eb38b30d651e"
            },
            "available": true,
            "qunitity": 1,
            "orderStatus": "pending_orderReq",
            "__v": 0
          }
        ],
        "paymentStatus": false,
        "orderDate": "2024-02-22T07:11:49.567Z",
        "__v": 1
      },
      {
        "deliveryAddress": {
          "street": "nadiad",
          "city": "nadiad",
          "state": "smkmskmksmksmk;mk dim ,",
          "country": "india",
          "pincode": 396521
        },
        "_id": "65d73cad5adee22ec92d0c41",
        "user": "65d48260690be32f15a161b8",
        "SubsectionOrder": [
          {
            "_id": "65d73cad5adee22ec92d0c44",
            "item": {
              "foodTags": [],
              "quantity": 1,
              "_id": "65b1c156875b01e39d3fb32e",
              "itemName": "lassi",
              "description": "Lassi is a cooling, refreshing, probiotic drink perfect for the warm",
              "price": 40,
              "tax": 1.5,
              "image": "https://images.unsplash.com/photo-1527406619566-0159590b8540?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFzc2l8ZW58MHx8MHx8fDA%3D",
              "category": "65b1c1bc875b01e39d3fb331",
              "ratingsAndReviews": [],
              "isVeg": true,
              "__v": 2,
              "foodVarity": [
                "[\"jain\",\"veg\"]"
              ],
              "restaurantId": "659f7465da09eb38b30d651e"
            },
            "available": true,
            "qunitity": 1,
            "orderStatus": "pending_orderReq",
            "__v": 0
          }
        ],
        "paymentStatus": true,
        "orderDate": "2024-02-22T12:20:22.892Z",
        "__v": 1
      },
      {
        "_id": "65d73cae5adee22ec92d0c49",
        "user": "65d48260690be32f15a161b8",
        "SubsectionOrder": [
          {
            "_id": "65d73cae5adee22ec92d0c4c",
            "item": {
              "foodTags": [],
              "quantity": 1,
              "_id": "65b1c156875b01e39d3fb32e",
              "itemName": "lassi",
              "description": "Lassi is a cooling, refreshing, probiotic drink perfect for the warm",
              "price": 40,
              "tax": 1.5,
              "image": "https://images.unsplash.com/photo-1527406619566-0159590b8540?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFzc2l8ZW58MHx8MHx8fDA%3D",
              "category": "65b1c1bc875b01e39d3fb331",
              "ratingsAndReviews": [],
              "isVeg": true,
              "__v": 2,
              "foodVarity": [
                "[\"jain\",\"veg\"]"
              ],
              "restaurantId": "659f7465da09eb38b30d651e"
            },
            "available": true,
            "qunitity": 1,
            "orderStatus": "pending_orderReq",
            "__v": 0
          }
        ],
        "paymentStatus": false,
        "orderDate": "2024-02-22T12:20:22.892Z",
        "__v": 1
      },
      {
        "deliveryAddress": {
          "street": "nadiad1",
          "city": "q",
          "state": "q",
          "country": "q",
          "pincode": 10
        },
        "_id": "6607f840c9d30e7c8ce22657",
        "user": "65e41a22eb3006c2b05904ce",
        "SubsectionOrder": [
          {
            "_id": "6607f840c9d30e7c8ce22655",
            "item": {
              "quantity": 1,
              "_id": "659f721cd9bce27759736882",
              "itemName": "special  Pizza",
              "description": "Classic pizza with tomato, kurkure, and onlion.",
              "price": 30,
              "tax": 1.5,
              "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWF4aWNhbiUyMHBpenphfGVufDB8fDB8fHww",
              "category": "659ec8dfb169a2cc1cfa612c",
              "ratingsAndReviews": [],
              "isVeg": true,
              "__v": 0,
              "foodVarity": [
                "[\"jain\",\"veg\"]"
              ],
              "foodTags": [
                ""
              ],
              "restaurantId": "659f7465da09eb38b30d651e"
            },
            "available": true,
            "qunitity": 1,
            "orderStatus": "pending_orderReq",
            "__v": 0
          }
        ],
        "paymentStatus": false,
        "orderDate": "2024-03-30T11:22:28.600Z",
        "__v": 0
      },
      {
        "deliveryAddress": {
          "street": "nadiad1",
          "city": "q",
          "state": "q",
          "country": "q",
          "pincode": 10
        },
        "_id": "6607f8fd6834ffc2ad727d54",
        "user": "65e41a22eb3006c2b05904ce",
        "SubsectionOrder": [
          {
            "_id": "6607f8fd6834ffc2ad727d52",
            "item": {
              "quantity": 1,
              "_id": "659f721cd9bce27759736882",
              "itemName": "special  Pizza",
              "description": "Classic pizza with tomato, kurkure, and onlion.",
              "price": 30,
              "tax": 1.5,
              "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWF4aWNhbiUyMHBpenphfGVufDB8fDB8fHww",
              "category": "659ec8dfb169a2cc1cfa612c",
              "ratingsAndReviews": [],
              "isVeg": true,
              "__v": 0,
              "foodVarity": [
                "[\"jain\",\"veg\"]"
              ],
              "foodTags": [
                ""
              ],
              "restaurantId": "659f7465da09eb38b30d651e"
            },
            "available": true,
            "qunitity": 1,
            "orderStatus": "pending_orderReq",
            "__v": 0
          }
        ],
        "paymentStatus": false,
        "orderDate": "2024-03-30T11:35:16.258Z",
        "__v": 0
      }
    ]
  ])
  useEffect(() => {
    setIsClient(true);
  }, []);

  const HandlesetCurrentSubsection = (subsection) => {
    console.log("Updating current subsection:", subsection);
    setCurrentSubsection(subsection);
  };

  return (
    <>
      {isClient && (
        <div>
        <div className="flex  mx-auto items-center rounded-xl max-h-screen overflow-auto  mt-10">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold font-poppins mb-4">My Orders</h2>
            <div className="grid grid-cols-2 ">
              {/* Column for showing itemName */}
              <div className="col-span-2">
                <div className="bg-gray-200 p-4 rounded-md ">
                  <h3 className="text-lg font-poppins font-semibold mb-2">Item Name</h3>
                  {/* Mapping through orders and subsections to display itemName */}
                  {orders[0].map((order, index) => (
                    <div key={index}>
                      {/* Mapping through subsections */}
                     
                      {order?.SubsectionOrder?.map((subsection, subIndex) => (
                         <div key={subIndex} className="mb-2 hover:bg-richblack-400 p-3 w-lg text-wrap"   onClick={() =>{ HandlesetCurrentSubsection(subsection); SetdeliveryAddress(order?.deliveryAddress);console.log("my sub section ",order?.deliveryAddress)}}>
                          <div className="flex gap-2">
                         <p className="font-poppins">{subsection.item.itemName}</p> 
                         <p className="text-red-500">on</p>
                         <p>{formatDate(order.orderDate)}</p>
                         </div>
                       </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* Column for showing orderDate */}
              
            </div>
          </div>
          
          <Stepper currentStatus={currentSubsection?.orderStatus}/>
          </div>
          <h1 className="font-poppins">delivery Address</h1>
          <p className="Poppins">{deliveryAddress && deliveryAddress?.street +" "+deliveryAddress?.city +" "+deliveryAddress?.state +" "+deliveryAddress?.pincode +" "+deliveryAddress?.country}</p>
        </div>
      )}
    </>
  );
};

export default Track;