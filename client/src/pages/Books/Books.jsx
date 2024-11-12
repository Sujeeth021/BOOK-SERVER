import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from './api';
import './books.css';
import 'animate.css';

const Books = () => {
  // State for books and modal visibility/message
  const [books, setBooks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Fetch books when the component mounts
  useEffect(() => {
    getAllBooks();
  }, []);

  // Fetch books from the API
  const getAllBooks = async () => {
    try {
      let response = await getBooks();
      if (response && response.data) {
        setBooks(response.data);
      } else {
        setBooks([]);  // If no data is found or error, reset to empty array
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);  // Reset to empty array in case of error
    }
  };

  // Delete a book from the collection
  const deleteBookFromCollection = async (id) => {
    try {
      const response = await deleteBook(id);
      setModalMessage(response.data.message);
      setModalVisible(true);  // Show modal
    } catch (error) {
      console.error("Error deleting book:", error);
      setModalMessage("Failed to delete book.");
      setModalVisible(true);  // Show modal with error message
    }
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <section className='books-page animate__animated animate__backInDown'>
      <h1>Books Collection</h1>

      <div className='books-container'>
        {/* Modal for feedback */}
        {isModalVisible && (
          <div className='modal animate__animated animate__tada'>
            <button className='close-btn' onClick={closeModal}>X</button>
            <p className='modal-text'>{modalMessage}</p>
            <a href='/books'>
              <button className='nav-back-btn'>Back to Collection</button>
            </a>
          </div>
        )}

        {/* Display books */}
        {books.length > 0 ? (
          books.map((book) => (
            <div className='book-card' key={book.id}>
              <div className='book-card-header'>
                <h2>Title: <span className='light-text'>{book.title}</span></h2>
                <h3>Author: <span className='light-text'>{book.author}</span></h3>
                <h4># of Pages: <span className='light-text'>{book.no_of_pages}</span></h4>
                <h4>Publish Date: <span className='light-text'>{book.published_at}</span></h4>
              </div>
              <div className='book-card-buttons'>
                <a href={`books/editBook/${book.id}`}>
                  <button className='book-card-button edit-btn'>Edit</button>
                </a>
                <button
                  className='book-card-button remove-btn'
                  onClick={() => deleteBookFromCollection(book.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='book-card'>
            <div className='book-card-header'>
              <h2 className='light-text'>Collection is Empty!</h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Books;
