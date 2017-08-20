import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import BookShelf from './components/BookShelf';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    myBooks: []
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((myBooks) => {
        this.setState({ myBooks })
      });
  };

  addToShelf = (e, book) => {
    let shelf = e.target.value;
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf)
        .then(() => {
          book.shelf = shelf;
          this.setState(state => ({
            myBooks: state.myBooks.filter(b => b.id !== book.id).concat([ book ])
          }))
        })
    }
  };

  render() {
    const { myBooks } = this.state;

    const wantToRead = myBooks.filter(book => book.shelf === 'wantToRead');
    const currentlyReading = myBooks.filter(book => book.shelf === 'currentlyReading');
    const read = myBooks.filter(book => book.shelf === 'read');
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf 
                title={"Currently Reading"} 
                books={currentlyReading}
                addToShelf={this.addToShelf} />
              <BookShelf 
                title={"Want to Read"} 
                books={wantToRead}
                addToShelf={this.addToShelf} />
              <BookShelf 
                title={"Read"} 
                books={read}
                addToShelf={this.addToShelf} />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <SearchBooks
            addToShelf={this.addToShelf}
            myBooks={myBooks} />
        )} />
      </div>
    );
  }
}

export default BooksApp;
