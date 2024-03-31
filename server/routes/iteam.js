import express from "express";
const router = express.Router();

// Import controller functions
import {
  createItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
  addItemRatingReview,
} from "../controller/Iteam.js";

import { createCategory,getAllCategories,updateCategoryById } from "../controller/Category.js";

//import middleware
import { auth, isAdmin, isCustomer, isRestruntManager } from "../middlewares/auth.js";

// ********************************************************************************************************
//                                      item
// ********************************************************************************************************
// Route for creating an item
router.post("/createItem", auth, isRestruntManager, createItem);

// Route for updating an item by ID
router.put("/updateItem/:id", auth, isAdmin, updateItemById);

// Route for deleting an item by ID
router.delete("/deleteItemById/:id", auth, isAdmin, deleteItemById);

// Route for getting all items
router.get("/getAllItems", getAllItems);

// Route for getting an item by ID
router.get("/getItemById/:id", getItemById);

// Route for adding a rating and review to an item
router.post("/addItemRatingReview/:id", auth, isCustomer,addItemRatingReview);


// ********************************************************************************************************
//                                      category
// ********************************************************************************************************
// Route for creating an item
router.get("/getAllCategories",  getAllCategories);
router.post("/createCategory", auth, isAdmin, createCategory);
router.put("/updateCategory/:id", auth, isAdmin, updateCategoryById);
export default router;  