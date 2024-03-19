import fs from 'fs';

const getBooks = () => {
  try {
    const rawText = fs.readFileSync('./db/data.json', { encoding: 'utf8' });
    return JSON.parse(rawText);
  } catch (error) {
    return;
  }
};

const books = getBooks();

const findBookById = (id) => {
  const bookIndex = books.findIndex((book) => book.id === Number(id));
  return books[bookIndex];
};

export { getBooks, findBookById };
