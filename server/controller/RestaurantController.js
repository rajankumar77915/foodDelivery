import mongoose from "mongoose";
import Restaurant from "../models/Restaurant.js";
// import Item from "../models/Item.js";

import Item from "../models/Item.js";
import { uploadImageCloudinary } from "../utils/uploadImageCloudinary.js";
import User from "../models/User.js";

export const createRestaurant = async (req, res) => {
  const {
    restaurantName,
    pincode,
    city,
    state,
    street,
    restaurantOpeningTime,
    restaurantClosingTime,
    contactNumber,
  } = req.body;
 console.log(req.body.street)
 console.log(req.body.formData)

 const image=req.files.certificateImage;
 const certificateImage = await uploadImageCloudinary(
     image,
     process.env.FOLDER_NAME
 );
 if(!certificateImage){
  return res.status(400).json({ sucess:false,error: 'image could not uploded try again' });
 }
  const newRestaurant = new Restaurant({
    name:restaurantName,
    address:{pincode:pincode,state:state,city:city,street:street},
    pincode,
    restaurantOpeningTime,
    restaurantClosingTime,
    contactNumber,
    certificateImage:certificateImage.secure_url
  });

  //store db
  await newRestaurant.save()
  const userid=req.user.id;
  const user=await User.findById(userid)
  user.restaurantId=newRestaurant._id;
  await  user.save()
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

export const pendingRestrunts=async(req,res)=>{
  const restaurants=await  Restaurant.find({approved:false})
  console.log(restaurants)
  return res.status(200).json({
    sucess:true,
    message:"sucessfully fetched pending restrunts",
    restaurants:restaurants
  })
}
export const checkExistence=async(req,res)=>{
  const id=req.user.restaurantId;

  if(!id){
    return res.status(404).json({
      sucess:false,
      exists:false,
      message:"restaurant not found"
    })
  }
  const restaurant=await  Restaurant.find({approved:false})
  
  return res.status(200).json({
    sucess:true,
    exists:true,
    restaurant:restaurant,
    message:"sucessfully fetched pending restrunts",
  })
}


export const approval=async(req,res)=>{
  const {id}=req.params;
  const restaurant=await Restaurant.findById(id)
  
  if(!restaurant){
    return res.status(404).json({
      status:false,
      message:"retsurnt not registred yet ...not found",
    })
  }
  restaurant.approved=true;

  await restaurant.save()
  return res.status(200).json({
    success:true,
    message:"sucessfully appoved"
  })
}


export const deleteApproval=async(req,res)=>{
  try{
  const {id}=req.params;
  const restaurant=await Restaurant.findByIdAndDelete(id)
  console.log(id)
  if(!restaurant){
    return res.status(404).json({
      status:false,
      message:"retsurnt not registred yet ...not found",
    })
  }
  // Find the user
  const user = await User.findOne({ restaurantId: id });

  if(user)
    user.restaurantId = null;
  await user.save();
  return res.status(200).json({
    success:true,
    message:"sucessfully deleted approval"
  })}
  catch(error){
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"error deleting approval"
    })
  }
}

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

  if (emptyFields.length < 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields!", emptyFields });
  }

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "Invalid id" });
  // }

  const restaurant = await Restaurant.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!restaurant) {
    return res.status(400).json({ error: "No restaurant found" });
  }

  res.status(200).json({
    success: true,
    data: restaurant,
    message: "sucessfully updated"
  });
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
export const getMangerRestaurant = async (req, res) => {
  try {
    // const  user = req.user;
    const id  = req.user.restaurantId;


    const restaurant = await Restaurant.findById(id).populate("orders").populate("menu");

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
    // const user_id = req?.body?.id;
    let { id } = req?.params
    const currentLocation = id
    // console.log("current loc",req.params)
    // const user = await User.find({ user_id })
    // console.log(user_id,currentLocation)

    //if current location not found then  try to  gat from user_profile
    // if (user_id || user_id!==undefined) {
    //   const user = await User.findById({ _id: user_id }).populate("profile").exec()
    //   if (!currentLocation) {
    //     currentLocation = user.profile?.pincode;
    //     // console.log(profile,user_id)
    //   }


    //   // if (!currentLocation) {
    //   //   //select all dishes most  common dish
    //   //   console.log("location required");
    //   //   return res.json("location require")
    //   // }
    // }
    //default location if no way
    if (!currentLocation) {
      currentLocation = "385351"
    }
    const restaurants = await Restaurant.find({ pincode: currentLocation });
    // console.log("current location:",currentLocation,restaurants)
    // restaurants.forEach(restaurant => {
    //   console.log(restaurant.menu);
    // });

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No restaurants found for the given pincode",
      });
    }

    // Retrieve the top 5 items for each restaurant
    const topFiveItemsByRestaurant = await Promise.all(
      restaurants.map(async (restaurant) => {
        const topFiveItems = await Restaurant.findById(restaurant._id).populate('menu')
          // .select({ 'menu': { $slice: 5 }, _id: 0 }) // Project only the first 5 items from the menu
          // .sort({ 'menu.rating': -1 });  

          console.log("topFiveItemsByRestaurant,",topFiveItems)
        return { restaurant: restaurant.name, items: topFiveItems };
      })
    );
    // console.log("topFiveItemsByRestaurant,",topFiveItemsByRestaurant)
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



export const addMenu = async (req, res) => {
  
  const { restaurant_id,foodName, foodDescription, price, tax, FoodType,tag,  category, isVeg, quantity } = req.body;
  const thumbnailImage=req.files.thumbnailImage;
  // return res.status(404).json({ error: 'Restaurant not found' });
  try {
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    const height=287
    const myUploadedImage=await uploadImageCloudinary(thumbnailImage,process.env.FOLDER_NAME,height);
    if(!myUploadedImage){
      return res.status(400).json({ sucess:false,error: 'image could not uploded try again' });
    }
    let isVegBool=false;
    if(isVeg=="veg"){
      isVegBool=true;
    }
    // Create a new item
    const newItem = new Item({ itemName:foodName, description:foodDescription, price, tax,restaurantId:restaurant_id, image:myUploadedImage.secure_url, foodVarity:FoodType,foodTags:tag, category, isVeg:isVegBool, quantity });
    await newItem.save();

    // Add the new item to the restaurant's menu
    restaurant.menu.push(newItem);
    await restaurant.save();

    res.status(201).json({success:true,data:newItem,message:"sucessfully added  iteam in restrunt"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
export const updateMenu = async (req, res) => {
  const { restaurantId, itemId } = req.params;
  const { foodName, foodDescription, price, tax, image, category, isVeg, quantity } = req.body;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    if(!restaurant.menu.includes(itemId)){
      return res.status(404).json({ error: 'Restaurant has not that item' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Update item properties
    item.itemName = foodName;
    item.description = foodDescription;
    item.price = price;
    item.tax = tax;
    item.image = image;
    item.category = category;
    item.isVeg = isVeg;
    item.quantity = quantity;

    await item.save();
    res.status(500).json({sucess:true,message:"menu item updated"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess:false,error: 'Server error' });
  }
}
export const deleteMenu = async (req, res) => {
  const { restaurantId, itemId } = req.params;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Remove the item from the restaurant's menu
    restaurant.menu = restaurant.menu.filter(menuItem => menuItem.toString() !== itemId);
    await restaurant.save();

    // Delete the item
    await Item.findByIdAndDelete(itemId);

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}