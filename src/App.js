import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import BookShelf from './components/BookShelf'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

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
      .catch(res => {
        console.log(res)
      })
  }

  removeFromShelfHandler = (book, shelf) => {
    this.setState(state => {
      state[shelf] = state[shelf].filter(b => b.id !== book.id)
    })
  }

  addToShelfHandler = (book, shelf) => {
    book.shelf = shelf
    this.setState(state => (
      state[shelf] = state[shelf].concat([ book ])
    ))
    BooksAPI.update(book, shelf)
  }

  addToShelf = (e, book) => {
    switch (e.target.value) {
      case "currentlyReading":
        this.addToShelfHandler(book, e.target.value)
        this.removeFromShelfHandler(book, "wantToRead")
        this.removeFromShelfHandler(book, "read")
        break
      case "wantToRead":
        this.addToShelfHandler(book, e.target.value)
        this.removeFromShelfHandler(book, "read")
        this.removeFromShelfHandler(book, "currentlyReading")
        break
      case "read":
        this.addToShelfHandler(book, e.target.value)
        this.removeFromShelfHandler(book, "currentlyReading")
        this.removeFromShelfHandler(book, "wantToRead")
        break
      default:
        break
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
              <BookShelf 
                title={"Currently Reading"} 
                books={this.state.currentlyReading}
                addToShelf={this.addToShelf} />
              <BookShelf 
                title={"Want to Read"} 
                books={this.state.wantToRead}
                addToShelf={this.addToShelf} />
              <BookShelf 
                title={"Read"} 
                books={this.state.read}
                addToShelf={this.addToShelf} />
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
