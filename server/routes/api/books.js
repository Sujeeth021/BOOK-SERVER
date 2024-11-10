import express from 'express';
const router = express.Router();
import * as booksController from '../../controllers/booksController.js'; 

router.route('/').get(booksController.getAllBooks);
router.route('/:id').delete(booksController.deleteBook);
router.route('/addBook').post(booksController.createNewBook);
router.route('/editBook/:id').put(booksController.updateBook);
router.route('/editBook/:id').get(booksController.getBook);

export default router; 