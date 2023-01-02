import Category from '../models/Category.model.js';

/* ADD CATEGORY */
export const addCategory = async (req, res) => {
  try {
    const { name, userId } = req.body;

    // Validate
    if (!name) {
      return res
        .status(400)
        .json({ message: 'Provide a name for the category' });
    }
    // Create a new category
    const category = new Category({
      name: name,
      createdBy: userId,
    });

    const newCategory = await category.save();
    res.status(201).json({ category: newCategory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE CATEGORY */
export const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    // Check if the category belongs to the user
    if (category.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'User is not authorized to update this category' });
    }

    // Validate the request body
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: 'Please provide a name for the category' });
    }

    // Update the category
    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* READ ALL CATEGORIES */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
