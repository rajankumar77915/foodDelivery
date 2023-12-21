const mongoose = require("mongoose");
// const Restaurant = require(../models/restaurantModel)

const createRestaurant = async (req, res) => {
  const user_id = req.user._id;
  const projects = await Project.find({ user_id }).sort({ createdAt: -1 }); // descending

  res.status(200).json(projects);
};

const updateRestaurant = async (req, res) => {
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

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const restaurant = await Restaurant.findOneAndDelete({ _id: id });

  if (!restaurant) {
    return res.status(400).json({ error: "No restaurant found" });
  }

  res.status(200).json(restaurant);
};

const getRestaurant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const restaurant = Restaurant.findById(id);

  if (!restaurant) {
    return res.status(404).json({ error: "No restaurants found!" });
  }

  res.status(200).json(restaurant);
};

const getDishes = async (req, res) => {
  const user_id = req.user._id;

  const projects = await Project.find({ user_id }).sort({ createdAt: -1 }); // descending

  res.status(200).json(projects);
};
