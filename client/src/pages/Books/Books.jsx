import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from './api';
import './books.css';
import 'animate.css';

const Books = () => {

  const [books, setBooks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  useEffect(() => {
    getAllBooks();
  }, []);
  const getAllBooks = async () => {
    try {
      let response = await getBooks();
      if (response && response.data) {
        setBooks(response.data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };
  const deleteBookFromCollection = async (id) => {
    try {
      const response = await deleteBook(id);
      setModalMessage(response.data.message);
      setModalVisible(true);
    } catch (error) {
      console.error("Error deleting book:", error);
      setModalMessage("Failed to delete book.");
      setModalVisible(true);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <section className='books-page animate__animated animate__backInDown'>
      <h1>Books Collection</h1>

      <div className='books-container'>
        {isModalVisible && (
          <div className='modal animate__animated animate__tada'>
            <button className='close-btn' onClick={closeModal}>X</button>
            <p className='modal-text'>{modalMessage}</p>
            <a href='/books'>
              <button className='nav-back-btn'>Back to Collection</button>
            </a>
          </div>
        )}
        {books.length > 0 ? (
          books.map((book) => {
            const addedAt = new Date(book.addedAt);
            const date = addedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const time = addedAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

            return (
              <div className='book-card' key={book.id}>
                <div className='book-card-header'>
                  {book.thumbnailUrl && (
                    <div className="book-thumbnail" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={book.thumbnailUrl} alt={`Thumbnail of ${book.title}`} />
                    </div>

                  )}
                  <h2>Title: <span className='light-text'>{book.title}</span></h2>
                  <h3>Author: <span className='light-text'>{book.authors[0]}</span></h3>
                  <h4>Added Date: <span className='light-text'>{date}</span></h4>
                  <h4>Added Time: <span className='light-text'>{time}</span></h4>
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
            );
          })
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
