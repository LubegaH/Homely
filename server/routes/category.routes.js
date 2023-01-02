import express from 'express';

import {
  addCategory,
  updateCategoryById,
  getAllCategories,
} from '../controllers/category.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/add-category', verifyToken, addCategory);
router.patch('/update-category/:id', verifyToken, updateCategoryById);
router.get('/all-categories', getAllCategories);

export default router;
