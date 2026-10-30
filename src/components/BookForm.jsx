import { useState } from "react";

function BookForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = title.trim();
    if (trimmed === "") return;

    onAdd(trimmed);
    setTitle("");
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title of a new book"
      />
      <button type="submit">Add book</button>
    </form>
  );
}

export default BookForm;