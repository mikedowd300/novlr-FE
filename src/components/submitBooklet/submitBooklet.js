import { Component } from 'react';
import './submitBooklet.css';

class SubmitBooklet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: '',
      title: '',
      bookContent: '',
      formWarnings: {
        validAuthor: true,
        validTitle: true,
        validBookContent: true
      }
    }
  }

  authorChange = event => this.setState({ author: event.target.value });
  titleChange = event => this.setState({ title: event.target.value });
  bookContentChange = event => this.setState({ bookContent: event.target?.value });
  setFormWanings = formWarnings => this.setState({ formWarnings });
  submit = () => {
    const { author, title, bookContent } =  this.state
    const validBook = author !== '' && title !== '' && bookContent !== '';
    // Note: criterea for validity is very basic. Nathan should define criterea and behavior for errors
    if(validBook) {
      const book = { 
        author,
        title,
        paragraphs: bookContent.split('\n')
      }
      console.log(book);
      this.props.submitBook(book);
      this.props.setPage('BOOKS');
    } else {
      const formWarnings = {
        validAuthor: author !== '',
        validTitle: title !== '',
        validBookContent: bookContent !== ''
      }
      this.setFormWanings(formWarnings);
    }
  }

  render() {
    const { formWarnings, author, title, bookContent } = this.state;
    return (
      <div className="submit-booklet">
        <p className="book-list-header">Add the beginning of a book</p> 
        <input 
          className={`author-name ${formWarnings.validAuthor ? '': 'has-error'}`}
          placeholder="Author" 
          value={author} 
          onChange={(e) => this.authorChange(e)}
        />
        <input 
          className={`book-title ${formWarnings.validTitle ? '': 'has-error'}`} 
          placeholder="Book Title" 
          value={title} 
          onChange={(e) => this.titleChange(e)}
        />
        <textarea 
          className={`book-content ${formWarnings.validBookContent ? '': 'has-error'}`}
          maxLength="1000" 
          placeholder="First 1000 characters" 
          value={bookContent} 
          onChange={(e) => this.bookContentChange(e)} 
        />
        <button 
          className="submit-book" 
          onClick={() => this.submit()}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default SubmitBooklet;