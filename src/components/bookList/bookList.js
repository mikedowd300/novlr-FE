import Book from '../book/book';
import './bookList.css';

function BookList(props) {
  const { setPage, books, isAdmin, deleteBook, editBook } = props;
  return (
    <div className="book-list-wrapper">
      <div className="book-list-header" onClick={() => setPage('SUBMIT')}>
        Add the beginning of a book
      </div>
        { 
          books?.map(book => <Book book={book} key={book.id} isAdmin={isAdmin} deleteBook={deleteBook} editBook={editBook}/>) 
        }
    </div>
  );
}

export default BookList;