import { Component } from 'react';
import axios from 'axios';
import SubmitBooklet from "./components/submitBooklet/submitBooklet";
import BookList from "./components/bookList/bookList";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)        
    this.state = {
      activePage: 'BOOKS',
      books: [],
      isAdmin: false,
      hasMoreBooks: true,
      pageNumber: 0
    }
  }

  baseApiUrl = "https://guarded-reef-59469.herokuapp.com/api";

  componentDidMount = () => {
    this.getBooks();
    this.increasePageNumber();
    this.setIsAdmin();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount = () => window.removeEventListener("scroll", this.handleScroll);

  getBooks = async () => {
    if(this.state.hasMoreBooks) {
      await axios.get(`${this.baseApiUrl}/${this.state.pageNumber}`)
      .then(({ data }) => {
        const allIds = this.state.books.map(b => b.id);
        const filteredBooks = data.books.filter(b => !(allIds.includes(b.id)))
        this.setBooks([...this.state.books, ...filteredBooks]);
        this.setHasMoreBooks(data.hasMoreBooks);
      })
      .catch(e => console.log('ERROR RETRIEVING BOOKS', this.state.pageNumber))
    }
  }

  submitBook = async (book) => axios.post(this.baseApiUrl, { ...book })
    .then(({ data }) => this.setBooks([...this.state.books, data]))
    .catch(e => console.log('ERROR SUMBITTING BOOK'))

  editBook = async (book, id) => axios.patch(`${this.baseApiUrl}/${id}`, { ...book })
    .then(({ data }) => this.setBooks([...this.state.books?.map(b => b.id === data.id ? data : b)]))
    .catch(e => console.log('ERROR EDITING BOOK'))

  deleteBook = async (id) => axios.delete(`${this.baseApiUrl}/${id}`, { id })
    .then(() => this.setBooks(this.state.books.filter(book => book.id !== id)))
    .catch(e => console.log('ERROR DELETING BOOK'))

  handleScroll = () =>  {
    const scrolledToBottom = Math.ceil(window.scrollY + window.innerHeight + 2) >= document.body.offsetHeight;
    if( scrolledToBottom && this.state.hasMoreBooks) {
      this.getBooks();
      this.increasePageNumber();
    }
  }

  setBooks = books => this.setState({ books });
  setPage = activePage => this.setState({ activePage });
  setHasMoreBooks = hasMoreBooks => this.setState({ hasMoreBooks });
  increasePageNumber = () => this.setState({ pageNumber: this.state.pageNumber + 1 });
  resetPageNumber = () => this.setState({ pageNumber: 0 });
  sanitizeList = bookList => bookList?.filter(book => book.author && book.title && book.paragraphs);
  setIsAdmin = () => {
    const adminName = process.env.REACT_APP_ADMIN_NAME.toLowerCase()
    const isAdmin = window.location.href.split('/')?.pop().toLowerCase() === adminName 
      || window.location.href.split('=')?.pop().toLowerCase() === adminName;
    this.setState({ isAdmin });
  }

  render() { 
    const views = {
      'SUBMIT': <SubmitBooklet submitBook={this.submitBook} setPage={this.setPage} /> ,
      'BOOKS': <BookList
          isAdmin={this.state.isAdmin} 
          books={this.sanitizeList(this.state.books)} 
          setPage={this.setPage}
          deleteBook={this.deleteBook}
          editBook={this.editBook}
        />
    }

    return (
      <div className="App">
        { views[this.state.activePage] }
      </div>
    )
  }
}

export default App;
