"use client"
import Link from "next/link";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import RestruntChart from "./RestruntDashboard/RestruntChart";
import { getRestruntData } from "@/services/functions/foodDetailsAPI";


const Restrunt = () => {
  const token = useSelector((state) => state?.auth.token);
  const [isClient, SetisClient] = useState(false);
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  useEffect(() => {

    const getCourseDataWithStats = async() => {
      setLoading(true);
      
      console.log("omomomomomomomomom11")
      const RestruntApiData = await getRestruntData(token);
      // const result = await fetchRestruntCourses(token);
      console.log("omomomomomomomomom1")
      setOrders(RestruntApiData?.orders);
      setMenu(RestruntApiData?.menu);
      
      
      // Calculate total price for each order item
      const aggregatedData = {};
      RestruntApiData?.orders.forEach(order => {
        const menuItem = RestruntApiData?.menu.find(item => item?._id === order?.item);
        if (menuItem) {
          const totalprice = menuItem.price * order?.qunitity;
          if (aggregatedData[menuItem._id]) {
            aggregatedData[menuItem._id].quntity += order?.qunitity;
            aggregatedData[menuItem._id].totalprice += menuItem.price ;
          } else {
            const itemName=menuItem?.itemName;
            aggregatedData[menuItem._id] = {
              menuItem,
              itemName,
              quntity: order?.qunitity,
              totalprice
            };
          }
        }
      });
      
      
      const updatedRestruntData = Object.values(aggregatedData);
      setRestruntData(updatedRestruntData);
      setLoading(false);
      SetisClient(true)
  }
  getCourseDataWithStats();
  
  }, [])
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [RestruntData, setRestruntData] = useState([]);
  const [items, setitems] = useState([]);

  const totalAmount = RestruntData?.reduce((acc, curr) => acc + curr.totalprice, 0);
  const totalOrders = RestruntData?.length;

  return (
    <>
        { isClient &&
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-richblack-5">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-richblack-200">
            Let&apos;s start something new
          </p>
        </div>
      }
          {loading ? (
        <div className="spinner"></div>
      ) : RestruntData?.length > 0 ? (
        <div>
          <div className="my-4 flex h-[450px] space-x-4">
           {/* Render chart / graph */}
           {totalAmount > 0 ? (
                 <RestruntChart RestruntData={RestruntData} />
                ) : (
                  <div className="flex-1 rounded-md bg-richblack-800 p-6">
                    <p className="text-lg font-bold text-richblack-5">Visualize</p>
                    <p className="mt-4 text-xl font-medium text-richblack-50">
                      Not Enough Data To Visualize
                    </p>
                  </div>
                )}
            
            {/* Total Statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-200 font-poppins">Total Menu Items</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {menu?.length}  
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Orders</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {totalOrders}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Income</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            You have not been got any order yet
          </p>
          
        </div>
      )}
    </>
  )
}
export default Restrunt
