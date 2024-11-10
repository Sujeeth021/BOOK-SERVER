import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';  // <-- Import path module here
import fsPromises from 'fs/promises';

// Get the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const booksFilePath = path.join(__dirname, '..', 'model', 'books.json');  // Use path to join paths

const data = {
  books: [],
  setBooks: function (newData) {
    this.books = newData;
  },
};

// Load books from JSON file asynchronously
const loadBooks = async () => {
  try {
    const booksData = await fsPromises.readFile(booksFilePath, 'utf-8');
    data.books = JSON.parse(booksData); // Ensure books data is loaded correctly
  } catch (error) {
    console.error('Error reading books file:', error);
    data.books = []; // If error, make sure books is an empty array
  }
};

// Ensure books are loaded when the controller is initialized
loadBooks();

export const getAllBooks = (req, res) => {
  // If data.books is not loaded yet, return an empty array
  if (!data.books) {
    return res.json([]);
  }
  res.json(data.books);
};

export const getBook = (req, res) => {
  // Ensure that data.books is populated before searching
  if (!data.books) {
    return res.json({ message: 'No books available' });
  }

  const book = data.books.find((bk) => bk.id === parseInt(req.params.id));
  if (!book) {
    return res.json({ message: `Book ID ${req.params.id} not found!` });
  }
  res.json(book);
};

export const createNewBook = async (req, res) => {
  // Ensure books data is loaded before proceeding
  if (!data.books) {
    return res.json({ message: 'Books data is unavailable, please try again later.' });
  }

  const newBook = {
    id: data.books?.length ? data.books[data.books.length - 1].id + 1 : 1,
    title: req.body.title,
    author: req.body.author,
    no_of_pages: parseInt(req.body.bookPages),
    published_at: req.body.publishDate,
  };

  if (!newBook.title || !newBook.author || !newBook.no_of_pages || !newBook.published_at) {
    return res.json({ message: 'Please enter all required details!' });
  }

  data.setBooks([...data.books, newBook]);

  // Write updated data back to the file
  await fsPromises.writeFile(booksFilePath, JSON.stringify(data.books));
  res.status(201).json({ message: 'Book added!' });
};

export const updateBook = async (req, res) => {
  // Ensure books data is loaded before proceeding
  if (!data.books) {
    return res.json({ message: 'Books data is unavailable, please try again later.' });
  }

  const updatedBook = data.books.find((bk) => bk.id === parseInt(req.body.id));

  if (!updatedBook) {
    return res.json({ message: `Book ID ${req.body.id} not found` });
  }

  if (!req.body.title || !req.body.author || !req.body.no_of_pages || !req.body.published_at) {
    return res.json({ message: 'Please do not leave empty fields!' });
  }

  // Update the book properties
  if (req.body.title) updatedBook.title = req.body.title;
  if (req.body.author) updatedBook.author = req.body.author;
  if (req.body.no_of_pages) updatedBook.no_of_pages = parseInt(req.body.no_of_pages);
  if (req.body.published_at) updatedBook.published_at = req.body.published_at;

  // Filter out the old book and add the updated one
  const filteredArray = data.books.filter((bk) => bk.id !== parseInt(req.body.id));
  const unsortedArray = [...filteredArray, updatedBook];

  // Update the data and sort it
  data.setBooks(unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)));

  // Write updated data to the file
  await fsPromises.writeFile(booksFilePath, JSON.stringify(data.books));
  res.json({ message: 'Book updated!' });
};

export const deleteBook = async (req, res) => {
  // Ensure books data is loaded before proceeding
  if (!data.books) {
    return res.json({ message: 'Books data is unavailable, please try again later.' });
  }

  const book = data.books.find((bk) => bk.id === parseInt(req.params.id));
  if (!book) {
    return res.json({ message: `Book ID ${req.params.id} not found` });
  }

  const filteredArray = data.books.filter((bk) => bk.id !== parseInt(req.params.id));
  data.setBooks([...filteredArray]);

  // Write updated data back to the file
  await fsPromises.writeFile(booksFilePath, JSON.stringify(data.books));
  res.json({ message: 'Book deleted!' });
};
