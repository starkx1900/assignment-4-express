import express from 'express';
import { findBookById, getBooks } from '../utils/index.js';

const bookRouter = express.Router();

// Get all books
bookRouter.get('/', (req, res) => {
  const books = getBooks();
  res.status(200).json({ message: 'All data fetched', data: books });
});

// Get book by id
bookRouter.get('/:id', (req, res) => {
  const book = findBookById(req.params.id);
  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  res.status(200).json({ message: 'Data successfully retrieved', data: book });
});

// Add a new book
bookRouter.post('/', (req, res) => {
  try {
    const { name, book } = req.body;
    const books = getBooks();
    const newBook = {
      id: books.length + 1,
      name,
      book,
    };
    books.push(newBook);
    res
      .status(201)
      .json({ message: 'New book added successfully', data: newBook });
  } catch (error) {
    res.status(404).json({ error: 'Book not added' });
  }
});

// Edit a book
bookRouter.patch('/:id', (req, res) => {
  const book = findBookById(req.params.id);
  const { name } = req.body;

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (name) {
    return res.status(200).json({
      message: 'Book updated successfully',
      data: { ...book, name },
    });
  }
  return res.status(404).json({ message: 'Input the book name' });
});

// Delete a book
bookRouter.delete('/:id', function (req, res) {
  const book = findBookById(req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  return res.status(204).json({ message: 'Deleted successfully' });
});

export default bookRouter;
