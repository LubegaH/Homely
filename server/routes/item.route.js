import express from 'express';
import {
  addItemToPurchaseList,
  deleteItemFromPurchaseList,
  updateItemInPurchaseList,
} from '../controllers/item.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/* ADD ITEM */
router.post(
  '/:itemId/purchase-lists/:purchaseListId',
  verifyToken,
  addItemToPurchaseList
);

/* DELETE ITEM */
router.delete(
  ':/itemId/purchase-lists/:purchaseListId',
  verifyToken,
  deleteItemFromPurchaseList
);

/* UPDATE ITEM */
router.patch(
  '/:purchaseListId/items/:itemId',
  verifyToken,
  updateItemInPurchaseList
);
export default router;
