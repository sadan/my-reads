import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((myBooks) => {
        this.setState({
          currentlyReading: myBooks.filter((book) => book.shelf === "currentlyReading"),
          wantToRead: myBooks.filter((book) => book.shelf === "wantToRead"),
          read: myBooks.filter((book) => book.shelf === "read")
        })
      })
  }

  addToShelf = (e, book) => {
    switch (e.target.value) {
      case "currentlyReading":
        this.setState(state => (
          state.currentlyReading.push(book)
        ))
        BooksAPI.update(book, e.target.value).then(res => (
          console.log(res)
        ))
        break;
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf title={"Currently Reading"} books={this.state.currentlyReading}/>
              <BookShelf title={"Want to Read"} books={this.state.wantToRead}/>
              <BookShelf title={"Read"} books={this.state.read}/>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <SearchBooks
            addToShelf={this.addToShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
