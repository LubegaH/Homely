import express from 'express';
import {
  getUser,
  getUserCollaborators,
  addRemoveCollaborator,
} from '../controllers/users.controller.js';
import {
  createUserPurchaseList,
  getUserPurchaseLists,
  getUserPurchaseList,
  updateUserPurchaseList,
  deleteUserPurchaseList,
} from '../controllers/purchaseList.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

/* READ */
// Collaborators
router.get('/:id', verifyToken, getUser);
router.get('/:id/collaborators', verifyToken, getUserCollaborators);

// Purchase lists
// Get user purchase lists
router.get('/:userId/purchase-lists', verifyToken, getUserPurchaseLists);
// Get single Purchase list
router.get('/:userId/purchase-lists/:id', verifyToken, getUserPurchaseList);

/* CREATE PURCHASE LISTS */
router.post('/:userId/purchase-list', createUserPurchaseList);

/* UPDATE */
router.patch('/:id/:collaboratorId', verifyToken, addRemoveCollaborator);
router.patch('/:userId/purchase-lists/:id', updateUserPurchaseList);

/* DELETE */
router.delete('/:userId/purchase-list/:id', deleteUserPurchaseList);

export default router;
