import express from 'express';
import { createOrder,
    updateOrder,
    deleteOrder,
    } from '../controllers/orderController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Create a new order
router.post('/',requireSignIn, createOrder);

// Update an existing order
router.put('/:id',requireSignIn, updateOrder);

// Delete an order
router.delete('/:id',requireSignIn, isAdmin, deleteOrder);



export default router;