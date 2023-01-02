import express from 'express';

import { getVendorById, addVendor } from '../controllers/vendor.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/get-vendor/:id', verifyToken, getVendorById);
router.post('/add-vendor/', verifyToken, addVendor);
// router.delete('/delete-vendor/:id', verifyToken, deleteVendorById);

export default router;
