import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


// route to get all notes
router.get('',userAuth, noteController.getAllNotes);

// route to get single note by id
router.get('/:id',userAuth, noteController.getNote);

//route to create a new note
 router.post('', noteValidator,userAuth, noteController.addNotes);

// route to update single note by id
router.put('/:id',userAuth, noteController.updateNote);

// route to delete single note by id
router.delete('/:id',userAuth, noteController.deleteNote);


export default router;