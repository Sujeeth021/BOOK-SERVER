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
  const noNavbarRoutes = ['/'];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/books' element={<Books />} />
        <Route path='/addBook' element={<AddBook />} />
        <Route path='/bookspage/editBook/:id' element={<EditBook />} />
        <Route path='/booksearch' element={<BookDetails />} />
        <Route path='/main' element={<Main />} />
        <Route path='/bookspage/:book_id' element={<BookDetailspage />} />
        <Route path="*" element={<Navigate to="/home" replace />} /> {/* Catch-all route */}
      </Routes>
    </>
  );
}

export default App;
