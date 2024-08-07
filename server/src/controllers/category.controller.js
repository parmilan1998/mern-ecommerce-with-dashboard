import Category from "../models/category.models.js";
import asyncHandler from "express-async-handler";

// POST - http://localhost:8080/api/v1/category
export const createCategory = asyncHandler(async (req, res) => {
  const { categoryName, description } = req.body;

  if (!categoryName || !description) {
    return res
      .status(400)
      .json({ message: "categoryName and description are required" });
  }

  const category = await Category.create({ categoryName, description });

  res.status(201).json({ category: category });
});

// GET - http://localhost:8080/api/v1/category
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json({ categories: categories });
});

// GET - http://localhost:8080/api/v1/category/:id
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ category: category });
});

// GET - http://localhost:8080/api/v1/category/query
export const queryCategory = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5, search = "", sort = "asc" } = req.query;

  // Search Filter
  const searchCategory = {
    $or: [
      { categoryName: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
  };

  // Sort
  const sortCategory = sort === "desc" ? -1 : 1;

  const offset = (page - 1) * limit;

  // Fetch categories with search, sorting, and pagination
  const categories = await Category.find(searchCategory)
    .sort({ categoryName: sortCategory })
    .skip(offset)
    .limit(parseInt(limit));

  const totalCategoryCount = await Category.countDocuments(searchCategory);

  res.status(200).json({
    categories,
    currentPage: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(totalCategoryCount / limit),
    totalItems: totalCategoryCount,
  });
});

// PUT - http://localhost:8080/api/v1/category/:id
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { categoryName, description } = req.body;
  const category = await Category.findByIdAndUpdate(
    id,
    { categoryName, description },
    { new: true }
  );

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({
    message: "Category updated successfully.",
    category: category,
  });
});

// DELETE - http://localhost:8080/api/v1/category/:id
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res
    .status(200)
    .json({ message: "Category deleted successfully.", category: category });
});
