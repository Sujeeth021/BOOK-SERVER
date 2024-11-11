import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';

const PORT = process.env.PORT || 8082;
import { connectdb } from './db/db.js';

import booksRouter from './routes/api/books.js';
import authRouter from './routes/api/auth.js'; // Import auth routes

const app = express();

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use the auth router for handling user signup
app.use('/api/auth', authRouter); // Add '/api/auth' for signup route

// Books Route
app.use('/api/books', booksRouter);

app.listen(PORT, () => {
  connectdb();
  console.log(`Server running on port ${PORT}`);
});
