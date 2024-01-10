import mongoose from "mongoose";
import Restaurant from "../models/Restaurant.js";
// import Item from "../models/Item.js";
import User from "../models/User.js";
import Profile from "../models/Profile.js";

export const createRestaurant = async (req, res) => {
  const {
    name,
    address,
    city,
    pincode,
    menu,
    popularDishes,
    restaurantOpeningTime,
    restaurantClosingTime,
    contactNumber,
  } = req.body;


  const newRestaurant = new Restaurant({
    name,
    address,
    city,
    pincode,
    menu,
    popularDishes,
    restaurantOpeningTime,
    restaurantClosingTime,
    contactNumber,
  });

  //store db
  await newRestaurant.save()

  if (!newRestaurant) {
    return res.status(404).json({
      sucess: false,
      message: "restaurant not created"
    })

  }
  return res.status(200).json({
    data: newRestaurant,
    sucess: true,
    message: "sucessfully restaurant  created"
  })
};

export const updateRestaurant = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    address,
    city,
    pincode,
    menu,
    popularDishes,
    restaurantOpeingTime,
    restaurantClosingTime,
    contactNUmber,
  } = req.body;

  let emptyFields = [];

  if (!name) emptyFields.push("name");
  if (!address) emptyFields.push("address");
  if (!city) emptyFields.push("city");
  if (!pincode) emptyFields.push("pincode");
  if (!menu) emptyFields.push("menu");
  if (!popularDishes) emptyFields.push("popularDishes");
  if (!restaurantOpeingTime) emptyFields.push("restaurantOpeingTime");
  if (!restaurantClosingTime) emptyFields.push("restaurantClosingTime");
  if (!contactNUmber) emptyFields.push("contactNUmber");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields!", emptyFields });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const restaurant = await Restaurant.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!project) {
    return res.status(400).json({ error: "No project found" });
  }

  res.status(200).json(restaurant);
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id" });
    }

    const restaurant = await Restaurant.findOneAndDelete({ _id: id });

    if (!restaurant) {
      return res.status(400).json({ error: "No restaurant found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: `Error deleting restaurant: ${error.message}`,
    });
  }
};
export const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
  

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id" });
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ error: "No restaurant found!" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: `Error fetching restaurant: ${error.message}`,
    });
  }
};

export const getDishes = async (req, res) => {
  try {
    const user_id = req?.body?.id;
    let { currentLocation } = req?.body
    // const user = await User.find({ user_id })
    console.log(user_id,currentLocation)
    
    //if current location not found then  try to  gat from user_profile
    if (user_id || user_id!==undefined) {
      const user = await User.findById({ _id: user_id }).populate("profile").exec()
      if (!currentLocation) {
        currentLocation = user.profile?.pincode;
        // console.log(profile,user_id)
      }
      else{
        //set default location
        currentLocation="39612"
      }

      if (!currentLocation) {
        //select all dishes most  common dish
        console.log("location required");
        return res.json("location require")
      }
    }
    const restaurants = await Restaurant.find({ pincode: currentLocation });
    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No restaurants found for the given pincode",
      });
    }

    // Retrieve the top 5 items for each restaurant
    const topFiveItemsByRestaurant = await Promise.all(
      restaurants.map(async (restaurant) => {
        const topFiveItems = await Restaurant.findById(restaurant._id)
          .select({ 'menu': { $slice: 5 }, _id: 0 }) // Project only the first 5 items from the menu
          .sort({ 'menu.rating': -1 });

        return { restaurant: restaurant.name, items: topFiveItems };
      })
    );

    res.status(200).json({
      success: true,
      message: "Top 5 items from each restaurant retrieved successfully",
      data: topFiveItemsByRestaurant,
    });
    ;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: `Error fetching dishes: ${error.message}`,
    });
  }
};