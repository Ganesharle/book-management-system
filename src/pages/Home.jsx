import { useEffect, useState } from "react";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../api/bookService";

import BookList from "../components/BookList";
import BookForm from "../components/BookForm";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      console.log(error);
      alert("Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    let result = books;

    if (search) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (genre) {
      result = result.filter((book) => book.genre === genre);
    }

    setFilteredBooks(result);
  }, [search, genre, books]);

  const handleSubmit = async (book) => {
    try {
      if (editingBook) {
        await updateBook(editingBook.id, book);
      } else {
        await addBook(book);
      }

      fetchBooks();
      setEditingBook(null);
    } catch (error) {
      console.log(error);
      alert("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Book Management System</h1>

      <BookForm
        onSubmit={handleSubmit}
        editingBook={editingBook}
      />

      <SearchBar setSearch={setSearch} />

      <GenreFilter
        books={books}
        setGenre={setGenre}
      />

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <BookList
          books={filteredBooks}
          onEdit={setEditingBook}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Home;