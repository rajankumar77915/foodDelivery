'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdExpandMore, MdOutlineModeEditOutline } from "react-icons/md";
import { apiConnector } from "@/services/apiconnector";
import { useSelector } from "react-redux";
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isClient, setIsClient] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null);
  const token = useSelector((state) => state?.auth.token);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const handleExpandOrder = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiConnector(
          "GET",
          "http://localhost:4000/api/v1/order/findAllorderForuser",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        console.log("my res:", response.data)
        setOrders(response.data);
        setIsClient(true)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (selectedItemId, newStatus,orderId) => {
    try {
 
      const updatedOrders = orders.map(order => {
        return {
          ...order,
          isEdit: false,
          SubsectionOrder: order.SubsectionOrder.map(subOrder => {
            if (subOrder._id === selectedItemId) {
              return {
                ...subOrder,
                orderStatus: newStatus
              };
            }
            return subOrder;
          })
        };
      });

      
      console.log("i am updatedOrders1",updatedOrders)
      // setOrders(updatedOrders);
      setOrders(updatedOrders);


      await apiConnector(
        "PUT",
        `http://localhost:4000/api/v1/order/changeOrderStatus/${orderId}/${selectedItemId}`,
        { orderStatus: newStatus },
        {
          Authorization: `Bearer ${token}`,
        }
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlePaymentStatusChange = async (orderId, newPaymentStatus) => {
    try {
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return {
            ...order,
            paymentStatus: newPaymentStatus
          };
        }
        return order;
      });

      setOrders(updatedOrders);

      await apiConnector(
        "PUT",
        `http://localhost:4000/api/v1/order/updatePaymentStatus/${orderId}`,
        { paymentStatus: newPaymentStatus },
        {
          Authorization: `Bearer ${token}`,
        }
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
      window.location.reload();
    }
  };

  const handleEditButtonClick = (orderId) => {
    const updatedOrders = orders.map(order => {
      if (order._id === orderId) {
        return {
          ...order,
          isEdit: true
        };
      }
      return order;
    });

    setOrders(updatedOrders);
  };
  const handleLocalStusChange = async (selectedItemId, newStatus)=> {
    console.log("edit clied ",selectedItemId,newStatus)
    const updatedOrders = orders.map(order => {
      return {
        ...order,
        SubsectionOrder: order.SubsectionOrder.map(subOrder => {
          if (subOrder._id === selectedItemId) {
            return {
              ...subOrder,
              orderStatus: newStatus
            };
          }
          return subOrder;
        })
      };
    });
    console.log("omomomomom ",updatedOrders)
    setOrders(updatedOrders);
  };
  

  return (<> {isClient ?
    <div className="p-4 lg:px-20 xl:px-40 overflow-x-auto mt-10">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gradient-to-r from-white to-richblack-300">
            <th className="hidden md:table-cell py-2 px-4">Order ID</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Price</th>
            <th className="hidden md:table-cell py-2 px-4">Products</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <>
              {order.SubsectionOrder.map((subOrder, index) => (
                <tr
                  key={order._id + "-" + index}
                  className={`${subOrder.orderStatus !== "delivered" && "bg-gradient-to-r from-pink-50 to-pink-200"
                    }`}
                >
                  <td className="hidden md:table-cell py-2 px-4 text-center">
                    {order._id}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 text-center">{subOrder?.item?.price}</td>
                  <td className="hidden md:table-cell py-2 px-4">{subOrder?.item?.itemName}</td>
                  <td className="py-2 px-4 text-center">
                    {order.isEdit ? (
                      <select
                        value={subOrder.orderStatus}
                        onChange={(e) =>{ setSelectedStatus(e.target.value ||subOrder.orderStatus);
                          console.log("e.target.value is ",e.target.value)
                          handleLocalStusChange(subOrder._id, e.target.value ||subOrder.orderStatus)
                        }}
                        className="p-2 focus:outline-none"
                      >
                        <option value="">Select Status</option>
                        {[
                          'pending_orderReq',
                          'preparing',
                          'delivered',
                          'confirmed',
                          'in progress',
                          'canceled',
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status || subOrder.orderStatus}
                          </option>
                        ))}
                      </select>
                    ) : (
                      subOrder.orderStatus
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex justify-center">
                      {!order.isEdit &&
                        <button
                          onClick={() => { setSelectedStatus(subOrder.selectedStatus); handleEditButtonClick(order._id)}}
                          className="bg-red-400 text-white p-2 rounded-full mr-2"
                        >
                          <MdOutlineModeEditOutline />
                        </button>
                      }
                      {order.isEdit && (
                        <button
                          onClick={() => handleStatusChange(subOrder._id, selectedStatus,order._id)}
                          className="bg-blue-500 text-white p-2 rounded-md mr-2"
                        >
                          Update Status
                        </button>
                      )}
                      {/* <button
                        onClick={() => handlePaymentStatusChange(order._id, selectedPaymentStatus)}
                        className="bg-blue-500 text-white p-2 rounded-md mr-2"
                      >
                        Update Payment Status
                      </button> */}
                      <button
                        onClick={() => handleExpandOrder(order._id)}
                        className="bg-gray-300 p-2 rounded-full mr-2"
                      >
                        <MdExpandMore />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
               {expandedOrderId === order._id && (
                <>
                  <tr className="bg-gray-100">
                    <td colSpan="6" className="py-2 px-4">
                      {/* Display additional details like order address */}
                      <p className="font-bold">Order Address:</p>
                      <p>{order?.deliveryAddress?.street}, {order?.deliveryAddress?.city}, {order?.deliveryAddress?.state},  {order?.deliveryAddress?.pincode}</p>
                    </td>
                  </tr>
                  <tr className="bg-gradient-to-r from-richblack-300 to-white">
                    <td colSpan="6" className="py-2 px-4">
                      {/* Display additional details like order address */}
                      <span className="font-bold">Payment Status: </span>
                      
                     
                    </td>
                  </tr>

                </>
              )}
            
            </>
            
          ))}

          
        </tbody>
      </table>
    </div>
                    :"my orders are loading..."}
                  </>
  );
};

export default OrdersPage;
