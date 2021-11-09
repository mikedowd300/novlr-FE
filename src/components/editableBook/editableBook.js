import { Component } from 'react';
import './editableBook.css';

class EditableBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.book.id,
      author: props.book.author,
      title: props.book.title,
      paragraphs: props.book.paragraphs,
      bookContent: '',
    }
  }

  componentDidMount = () => {
    this.convertParagraphsToContent();
  }

  authorChange = event => this.setState({ author: event.target.value });
  titleChange = event => this.setState({ title: event.target.value });
  bookContentChange = event => this.setState({ bookContent: event.target?.value });
  edit = () => {
    const book = {
      author: this.state.author,
      title: this.state.title,
      paragraphs: this.state.bookContent.split('\n')
    }   
    this.props.editBook(book, this.state.id);
  }

  convertParagraphsToContent = () => {
    let bookContent = '';
    this.state.paragraphs.forEach((paragraph, i) => {
      bookContent += paragraph;
      if(i < this.state.paragraphs.length - 1) {
        bookContent += '\n';
      }
    });
    this.setState({ bookContent });
  }

  render() {
    return (
      <div className="editable-book">
        <input 
          className="author-name" 
          placeholder="Author" 
          value={this.state.author} 
          onChange={(e) => this.authorChange(e)}
        />
        <input 
          className="book-name" 
          placeholder="Title" 
          value={this.state.title} 
          onChange={(e) => this.titleChange(e)}
        />
        <textarea 
          className="editable-book-content" 
          maxLength="1000" 
          placeholder="First 1000 characters" 
          value={this.state.bookContent} 
          onChange={(e) => this.bookContentChange(e)} 
        />
        <div className="button-wrapper">
          <button onClick={() => this.edit()}>
            Edit
          </button>
          <button onClick={() => this.props.deleteBook(this.state.id)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default EditableBook;