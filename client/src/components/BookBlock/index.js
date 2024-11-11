import React from 'react';
import { Link } from 'react-router-dom';

import { BookBlock as BookBlockStyled } from './styles';

// Define the BookBlock component
const BookBlock = (props) => {
  const { id, thumbnailUrl, title, authors, description } = props.book;

  const handleAddBook = async () => {
    // Get the JWT token from localStorage to associate the book with the logged-in user
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert("You need to be logged in to add a book.");
      return;
    }

    // Prepare the book data to be sent to the server
    const bookData = {
      id,
      thumbnailUrl,
      title,
      authors,
      description,
    };
    try {
      const response = await fetch('http://localhost:8082/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(bookData),
      });
    
      if (!response.ok) {
        // Log the response text to understand the error better
        const errorText = await response.text();
        console.error("Error response text:", errorText);
        throw new Error("Network response was not ok");
      }
    
      const data = await response.json();
      console.log("Book added:", data);
    } catch (error) {
      console.error("Error adding book:", error);
    }
    
    try {
      // Make a POST request to save the book in the user's book list
      const response = await fetch('http://localhost:8082/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send token to authenticate the user
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Book added successfully!');
      } else {
        alert(data.message || 'Failed to add book.');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <BookBlockStyled>
      <div className="thumbnail">
        <img src={thumbnailUrl} alt={`${title} - Thumbnail`} />
      </div>
      <div className="book-data">
        <div className="main-info">
          <h3>{title}</h3>
          <h5>{authors ? authors.join(', ') : ''}</h5>
        </div>
        <p>{description}</p>
        <div className="details">
          <Link to={`/bookspage/${encodeURIComponent(id)}`}>
            DETAILS <i className="fas fa-info-circle"></i>
          </Link>
        </div>
        {/* Add Book Button */}
        <button onClick={handleAddBook}>Add Book</button>
      </div>
    </BookBlockStyled>
  );
};

export default BookBlock;
