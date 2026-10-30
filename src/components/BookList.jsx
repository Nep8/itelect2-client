function BookList({ books }) {

  return (

    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>
          <span>{book.title}</span>
          <span className="status">
            {book.available ? " On the shelf" : " On loan"}
          </span>
        </li>
      ))}
    </ul>
  );
}
 
export default BookList;