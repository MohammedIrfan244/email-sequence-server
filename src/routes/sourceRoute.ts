import express from 'express';
import { createList , getLists , addLeadToList ,removeLeadFromList , getListById } from '../controllers/auth/sourceController';
import { tryCatch } from '../lib/utils/tryCatch';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router()
 
router
// lead
.post('/createList', verifyToken,tryCatch(createList))
.post('/addLeadToList', verifyToken,tryCatch(addLeadToList))
.post('/removeLeadFromList', verifyToken,tryCatch(removeLeadFromList))
.get('/getLists', verifyToken,tryCatch(getLists))
.get('/getListById/:listId', verifyToken,tryCatch(getListById))



export default router