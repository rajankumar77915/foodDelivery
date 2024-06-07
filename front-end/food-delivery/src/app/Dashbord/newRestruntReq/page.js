// pages/restaurants.js
'use client'
import { apiConnector } from '@/services/apiconnector';
import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Restaurants = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null); // State to store selected certificate image
  const [restaurants, setRestrunts] = useState([]); // State to store selected certificate image
   const token = useSelector((state) => state?.auth.token);
  //  restaurants = [
  //   { id: 1, name: 'Restaurant 1', city: 'City A', certificate: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1534308983496-4fabb1a015ee%3Fw%3D500%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWF4aWNhbiUyMHBpenphfGVufDB8fDB8fHww&w=384&q=75', approved: true },
  //   { id: 2, name: 'Restaurant 2', city: 'City B', certificate: '/certificate2.jpg', approved: false },
  // ];

  const fetchPendingRestaurants = async () => {
    try {
      // Fetch all new pending restaurants
      const response = await apiConnector("GET", "http://localhost:4000/api/v1/restaurant/pendingRestaurants");
      console.log(response?.data?.restaurants)
      setRestrunts(response?.data?.restaurants)
      // setPendingRestaurants(response?.data); // Assuming response is an object with a data property
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPendingRestaurants();
  }, []);

  const handleDelete = async(id) => {
    const response=await apiConnector(
      "DELETE",
      `http://localhost:4000/api/v1/restaurant/deleteApproval/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    fetchPendingRestaurants();
    console.log(`Deleting restaurant with id ${id}`);
  };

  const handleApprove = async(id) => {
    const response=await apiConnector(
      "PUT",
      `http://localhost:4000/api/v1/restaurant/approv/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    fetchPendingRestaurants();  
    console.log("responsenfjnfjnjfnfjnf",response);
    console.log("jfkfnf")
  };

  const handleCertificateClick = (certificate) => {
    console.log("my cer",certificate)
    setSelectedCertificate(certificate);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Restaurant List</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Restaurant Name</th>
            <th className="px-4 py-2">City/Pin</th>
            <th className="px-4 py-2">Certificate</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant._id}>
              <td className="border px-4 py-2">{restaurant.name}</td>
              <td className="border px-4 py-2">{restaurant.city}/{restaurant.pincode}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleCertificateClick(restaurant.certificateImage)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Certificate
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleApprove(restaurant._id)}
                  disabled={restaurant.approved}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${restaurant.approved ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDelete(restaurant._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Modal for displaying certificate image */}
      {selectedCertificate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 h-50 w-50">
            <img  width={350} src={selectedCertificate} alt="Certificate" />
            <button onClick={() => setSelectedCertificate(null)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
