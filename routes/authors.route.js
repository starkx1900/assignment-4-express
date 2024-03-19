import express from 'express';
import { findBookById, getBooks } from '../utils/index.js';

const authorRouter = express.Router();

// Get all authors
authorRouter.get('/', (req, res) => {
  const books = getBooks();
  res.status(200).json({ message: 'All data fetched', data: books });
});

// Get author by id
authorRouter.get('/:id', (req, res) => {
  const book = findBookById(req.params.id);
  if (!book) {
    res.status(404).json({ error: 'Author not found' });
    return;
  }
  res.status(200).json({ message: 'Data successfully retrieved', data: book });
});

// Add a new author
authorRouter.post('/', (req, res) => {
  try {
    const { name, author } = req.body;
    const books = getBooks();
    const newAuthor = {
      id: books.length + 1,
      name,
      author,
    };
    books.push(newAuthor);
    res
      .status(201)
      .json({ message: 'New author added successfully', data: newAuthor });
  } catch (error) {
    res.status(404).json({ error: 'Author not added' });
  }
});

// Edit a author
authorRouter.patch('/:id', (req, res) => {
  const book = findBookById(req.params.id);
  const { author } = req.body;

  if (!book) {
    return res.status(404).json({ error: 'Author not found' });
  }

  if (author) {
    return res.status(200).json({
      message: 'Author updated successfully',
      data: { ...book, author },
    });
  }
  return res.status(404).json({ message: 'Input the author name' });
});

// Delete a authors
authorRouter.delete('/:id', function (req, res) {
  const book = findBookById(req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Author not found' });
  }
  return res.status(204).json({ message: 'Deleted successfully' });
});

export default authorRouter;
