'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdExpandMore, MdOutlineModeEditOutline } from "react-icons/md";
import { apiConnector } from "@/services/apiconnector";
import { useSelector } from "react-redux";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isEditStatus, setIsEditStatus] = useState(true);
  const [isEditPayment, setIsEditPayment] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null);
  const token = useSelector((state) => state?.auth.token);

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
        console.log("my res:",response.data)
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async () => {
    try {
      await apiConnector(
        "PUT",
        `http://localhost:4000/api/v1/order/updateStatus/${selectedItemId}`,
        { status: selectedStatus },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // Refresh orders after status update
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEditButtonClick = (itemId) => {
    setIsEditStatus(!isEditStatus);

    setSelectedItemId(itemId);
  };

  const handleExpandOrder = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  const handlePaymentStatusChange = async (orderId) => {
    try {
      setIsEditPayment(!isEditPayment);
      await apiConnector(
        "PUT",
        `http://localhost:4000/api/v1/order/updatePaymentStatus/${orderId}`,
        { paymentStatus: selectedPaymentStatus },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // Refresh orders after payment status update
      fetchOrders();
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
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
                  <td className="py-2 px-4 text-center">{subOrder.item.price}</td>
                  <td className="hidden md:table-cell py-2 px-4">{subOrder.item.itemName}</td>
                  <td className="py-2 px-4 text-center">
                    {isEditStatus ? (
                      subOrder.orderStatus
                    ) : (
                      <select
                        value={selectedStatus ? selectedStatus : subOrder.orderStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
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
                            {status}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <div className="flex justify-center">
                      {subOrder.orderStatus !== "delivered" && (
                        <>
                          <button
                            onClick={() => handleEditButtonClick(subOrder.item.id)}
                            className="bg-red-400 text-white p-2 rounded-full mr-2"
                          >
                            <MdOutlineModeEditOutline />
                          </button>
                          {!isEditStatus && (
                            <button
                              onClick={handleStatusChange}
                              className="bg-blue-500 text-white p-2 rounded-md mr-2"
                            >
                              Update Status
                            </button>
                          )}
                        </>
                      )}
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
                      {isEditPayment ? <span className="ml-2">{order.paymentStatus ? "Completed" : "Not Completed"}</span>
                        :
                        <>
                          <select
                            value={selectedPaymentStatus ? selectedPaymentStatus : order.paymentStatus}
                            onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                            className="p-2 focus:outline-none"
                          >
                            <option value="">Select Payment Status</option>
                            <option value="true">Completed</option>
                            <option value="false">Not Completed</option>
                          </select>
                        </>
                      }
                      {isEditStatus ?
                        <button
                          onClick={() => handleEditButtonClick(subOrder.item.id)}
                          className="bg-red-400 text-white p-2 rounded-full ml-3"
                        >
                          <MdOutlineModeEditOutline />
                        </button> :
                        <button
                          onClick={() => handlePaymentStatusChange(order._id)}
                          className="bg-blue-500 text-white p-2 rounded-md ml-2"
                        >
                          Update Payment Status
                        </button>
                      }
                    </td>
                  </tr>

                </>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
