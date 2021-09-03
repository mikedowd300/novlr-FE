import { Component } from 'react';
import EditableBook from '../editableBook/editableBook';
import './book.css';

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false,
    }
  }

  editBook = book => {
    this.props.editBook(book);
    this.setEditable(false);
  }

  deleteBook = id => {
    this.props.deleteBook(id);
    this.setEditable(false);
  }

  setView = () => this.setEditable(this.props.isAdmin);
  setEditable = editable => this.setState({ editable });
  getViewClass = () => this.props.isAdmin ? 'editable book' : 'book';

  render() {
    const { book } = this.props
    const bookComponent = (
      <div className={this.getViewClass()} onClick={this.setView}>
        <div className="paragraph-wrapper" >
          { book.paragraphs?.map((paragraph, i) => <p className="paragraph" key={`${book._id}-${i}`}>{paragraph}</p>) }
        </div>
        <div className="author-title">
          <span className="author-label">{`${book.author}, `}</span>
          <span className="title-label">{book.title}</span>
        </div>
        <div className="book-border" />
      </div>
    )
    
    return (
      <div className="book-view">
        { this.state.editable ? <EditableBook book={book} editBook={this.editBook} deleteBook={this.deleteBook}/> : bookComponent }
      </div>
    );
  }
}

export default Book;