'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "../../../services/apiconnector";

const RestaurantDetailForm = () => {
  const [formData, setFormData] = useState(new FormData());
  const [isExistingRestaurant, setIsExistingRestaurant] = useState(false);
  const token = useSelector((state) => state?.auth.token);

  useEffect(() => {
    // Check if restaurant already exists
    // Assuming you have an API endpoint to check if the restaurant exists
    apiConnector("GET", "http://localhost:4000/api/v1/restaurant/checkExistence", null, {
      Authorization: `Bearer ${token}`,
    }).then((response) => {
      // If restaurant exists, set isExistingRestaurant to true
      if (response?.data?.exists) {
        setIsExistingRestaurant(true);
        // Fetch existing restaurant data and set it to formData
        // Assuming you have an API endpoint to fetch existing restaurant data
          console.log("oomomomomomomom",response?.data?.restaurant)
          const restaurantData = response?.data?.restaurant[0];
          // Set existing restaurant data to formData
          Object.entries(restaurantData).forEach(([key, value]) => {
            console.log("key",key,value)
            if(key==="name")
              formData.set("restaurantName", value);
            else if(key==="address"){
              Object.entries(value).forEach(([key1, value1]) => {
                console.log("key1",key1,value1)
                formData.set(key1, value1);
              });
            }
            else
             formData.set(key, value);
          });
          setFormData(formData);
        
      }
    }).catch((error) => {
      console.error("Error checking restaurant existence:", error);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      formData.set(name, files[0]);
    } else {
      formData.set(name, value);
    }

    setFormData(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting form data:", formData);
    // Submit the form data to create or update the restaurant
    apiConnector("POST", "http://localhost:4000/api/v1/restaurant/createRestaurant", formData, {
      Authorization: `Bearer ${token}`,
    }).then((response) => {
      console.log("Response:", response);
      window.location.reload()
    }).catch((error) => {
      console.error("Error submitting form data:", error);
    });
  };  

  return (
<div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md overflow-auto" style={{ maxHeight: '100vh' }}>
      <h2 className="text-lg font-semibold mb-4">{isExistingRestaurant ? "Update Restaurant" : "Restaurant Details"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Rest of the form inputs */}
        <div className="mb-4">
          <label htmlFor="restaurantName" className="block mb-1">Restaurant Name:</label>
          <input
            type="text"
            id="restaurantName"
            name="restaurantName"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.get("restaurantName")}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block mb-1">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.get("contactNumber")}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="street" className="block mb-1">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.get("street")}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block mb-1">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.get("city")}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block mb-1">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.get("state")}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pincode" className="block mb-1">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChange}
             value={formData.get("pincode")}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="restaurantOpeningTime" className="block mb-1">Opening Time:</label>
          <input
            type="time"
            id="restaurantOpeningTime"
            name="restaurantOpeningTime"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.get("restaurantOpeningTime")}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="restaurantClosingTime" className="block mb-1">Closing Time:</label>
          <input
            type="time"
            id="restaurantClosingTime"
            name="restaurantClosingTime"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.get("restaurantClosingTime")}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="certificateImage" className="block mb-1">Certificate Image:</label>
          {formData.get("certificateImage") &&<div className="h-50 w-50">
            <img src={formData.get("certificateImage")} alt="Certificate" />
            </div>}
          <label htmlFor="certificateImage" className="block mb-1">Upload Certificate:</label>
          <input
            type="file"
            id="certificateImage"
            name="certificateImage"
            accept="image/*"
            className="w-full px-3 py-2 border rounded-md"
            onChange={handleChange}
            
          />
        </div>
        {/* Rest of the form inputs */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          {isExistingRestaurant ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RestaurantDetailForm;
