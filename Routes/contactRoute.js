import express from 'express';
import { addContact, deleteContact, getContact, updateContact } from '../Controllers/contactController.js';
import tokenCheck from '../Middlewares/TokenCheck.js';

const router = express.Router()

router.use(tokenCheck)
router.get("/", getContact)
router.delete("/", deleteContact)
router.post("/", addContact)
router.patch("/", updateContact)

export default router
