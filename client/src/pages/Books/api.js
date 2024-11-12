import axios from 'axios';

// Fetch books
export const getBooks = async () => {
  try {
    const response = await axios.get('http://localhost:8082/api/books', {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzMwZTI1YjdmY2IxMGViOTgwNmRmMTMiLCJpYXQiOjE3MzEzOTk3ODMsImV4cCI6MTczMTQwMzM4M30.oATZ2BSNpPj8V8fvtvZnNe-30aVW2RokI_MRWJnS-jk`, // Assuming the token is stored in localStorage
      }
    });
    console.log("hi");
    
    return response;
  } catch (error) {
    console.error("Error fetching books:", error);
    return { data: [] };  // Return empty array on error
  }
};

// Delete a book
export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8082/api/books/${id}`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzMxZmYzYTNmYmUxZDgxNjUyOTQyYjYiLCJpYXQiOjE3MzEzMjk4NTAsImV4cCI6MTczMTMzMzQ1MH0.iVMOgGSWWiMrNvWvM2q9XOXop4swBeGcEsFKCgVMclY`,
      }
    });
    return response;
  } catch (error) {
    console.error("Error deleting book:", error);
    return { data: { message: "Failed to delete book" } }; // Return default error message
  }
};
