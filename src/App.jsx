import { useState } from "react";
import BookList from "./components/BookList.jsx";
import BookForm from "./components/BookForm.jsx";
import "./App.css";

const STARTING_BOOKS = [
  { id: 1, title: "Noli Me Tangere", available: true },
  { id: 2, title: "El Filibusterismo", available: true },
  { id: 3, title: "Florante at Laura", available: true },
  { id: 4, title: "Ibong Adarna", available: false },
];

function App() {
  const [books, setBooks] = useState(STARTING_BOOKS);

  function addBook(title) {
    const newBook = {
      id: Date.now(),
      title: title,
      available: true,
    };

    setBooks([...books, newBook]);
  }

  return (
    <main className="library">
      <h1>Library</h1>
      <p className="count">
        {books.length} books in the catalogue
      </p>
      <BookForm onAdd={addBook} />
      <BookList books={books} />
    </main>
  );
}

export default App;