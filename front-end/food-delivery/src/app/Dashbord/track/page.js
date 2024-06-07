"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "@/services/apiconnector";
import { formatDate } from "../../../services/formatDate.js";
import Stepper from "./Componant/stepar.js";

const Track = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentSubsection, setCurrentSubsection] = useState(null);
  const [orders, setOrders] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const token = useSelector((state) => state?.auth.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiConnector(
          "GET",
          "http://localhost:4000/api/v1/order/getAllOrderTrack",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        console.log(response.data)
        setOrders(response.data.data);
        setCurrentSubsection(response.data.data[0]?.SubsectionOrder[0]);
        setIsClient(true);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleSetCurrentSubsection = (subsection, deliveryAddress,order_id) => {
    subsection.order_id =order_id;
   
     setCurrentSubsection(subsection);
    setCurrentSubsection(subsection);
    setDeliveryAddress(deliveryAddress);
  };

  return (
    <div className="container mx-auto px-4">
      {isClient && (
        <div className="mt-20">
          {/* <h2 className="text-2xl font-semibold mb-4">My Orders</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* list of my orders */}
            <div className="bg-gray-200 p-4 rounded-md h-screen overflow-auto">
              <h3 className="text-lg font-semibold mb-2">Item Name</h3>
              {orders?.map((order, index) => (
                <div key={index}>
                  {order?.SubsectionOrder?.map((subsection, subIndex) => (
                    <div
                      key={subIndex}
                      className="mb-2 p-3 bg-white rounded shadow hover:shadow-lg cursor-pointer"
                      onClick={() =>
                        handleSetCurrentSubsection(subsection, order?.deliveryAddress,order._id)
                      }
                    >
                      <p className="font-semibold">{subsection.item.itemName}</p>
                      <p className="text-sm text-gray-500">
                        Ordered on {formatDate(order.orderDate)}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <Stepper
                currentStatus={currentSubsection?.orderStatus}
                currentSubsectionId={currentSubsection?._id}
                orderId={currentSubsection?.order_id}
                token={token}
              />
              <div className="mt-20">
                <h1 className="font-semibold mt-4">Delivery Address</h1>
                <p className="text-sm text-gray-500 ">
                  {deliveryAddress &&
                    `${deliveryAddress?.street} ${deliveryAddress?.city} ${deliveryAddress?.state} ${deliveryAddress?.pincode} ${deliveryAddress?.country}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Track;