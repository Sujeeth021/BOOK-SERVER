import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar';

// Pages
import Home from './pages/Home/Home';
import Books from './pages/Books/Books';
import AddBook from './pages/Books/AddBook';
import EditBook from './pages/Books/EditBook';
import Login from './components/loginpage/Login';
import SignIn from './components/loginpage/Signup';
import Main from './pages/Main';
import BookDetailspage from './pages/BookDetails';
import BookDetails from './components/booksearchpage/books';

// ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

// CSS
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/SignUp']; // Routes where Navbar is not shown

  return (
    <>
      {/* Navbar should be shown unless we're on the login or signup page */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/SignUp' element={<SignIn />} />

        {/* Protected Routes */}
        <Route path='/home' element={<ProtectedRoute element={<Home />} />} />
        <Route path='/books' element={<ProtectedRoute element={<Books />} />} />
        <Route path='/addBook' element={<ProtectedRoute element={<AddBook />} />} />
        <Route path='/bookspage/editBook/:id' element={<ProtectedRoute element={<EditBook />} />} />
        <Route path='/booksearch' element={<ProtectedRoute element={<BookDetails />} />} />
        <Route path='/main' element={<ProtectedRoute element={<Main />} />} />
        <Route path='/bookspage/:book_id' element={<ProtectedRoute element={<BookDetailspage />} />} />

        {/* Catch-all route, redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
