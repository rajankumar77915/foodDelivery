import Category from '../models/Category.js'; // Adjust the path based on your project structure

// Create a new category
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new Category({
      name,
      description,
    });

    const savedCategory = await newCategory.save();

    if (!savedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not created",
      });
    }

    return res.status(200).json({
      data: savedCategory,
      success: true,
      message: "Successfully created category",
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      data: categories,
      success: true,
      message: "Successfully retrieved categories",
    });
  } catch (error) {
    console.error("Error getting categories:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update category by ID
export const updateCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.name = name;
    category.description = description;

    const updatedCategory = await category.save();

    return res.status(200).json({
      data: updatedCategory,
      success: true,
      message: "Successfully updated category",
    });
  } catch (error) {
    console.error("Error updating category by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// Delete category by ID
export const deleteCategoryById = async (req, res) => {
    const categoryId = req.params.id;
  
    try {
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
  
      return res.status(200).json({
        data: deletedCategory,
        success: true,
        message: "Successfully deleted category",
      });
    } catch (error) {
      console.error("Error deleting category by ID:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
