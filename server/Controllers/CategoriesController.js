import Categories from "../Models/CategoriesModal.js";
import asyncHandler from "express-async-handler";
// public controllers
// @desc get all categories
// @route get /api/categories
// @access public

const getCategories = asyncHandler(async (req, res) => {
  try {
    // find all categories in database
    const categories = await Categories.find({});
    // send all categories to the client
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// admin controller

// @desc create new category
// @route post /api/categories
// @access private/admin

const createCategory = asyncHandler(async (req, res) => {
  try {
    // get title from request body
    const { title } = req.body;
    // create new category
    const category = new Categories({
      title,
    });
    // save the categoriy in database
    const createdCategory = await category.save();
    // send new category to the client
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc update category
// @route put /api/categories/:id
// @access private/Admin

const updateCategory = asyncHandler(async (req, res) => {
  try {
    // get category id from request params
    const category = await Categories.findById(req.params.id);

    if (category) {
      // update category title
      category.title = req.body.title || category.title;
      // save the updated category in database
      const updatedCategory = await category.save();

      // save the updated categories to the client
      res.json(updateCategory);
    } else {
      res.status(404).json({ message: "Category mot found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc delete category
// @route delete /api/categories/:id
// @access private/admin

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    // get category id from request params
    const category = await Categories.findById(req.params.id);

    if (category) {
      // delete the category from database
      await category.remove();
      // send success message to the client
      res.json({ message: "Category removed" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
