import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'

class Book extends Component {
  state = {
    shelf: "none"
  }

  componentDidMount = () => {
    var book = this.props.book
    if (!book.shelf) {
      BooksAPI.get(book.id)
        .then((book) => {
          this.setState((state) => ({
            shelf: book.shelf
          }))  
        })
    } else {
      this.setState((state) => ({
        shelf: book.shelf
      }))
    }
  }

  render() {
    const { book, addToShelf } = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            {book.imageLinks && (
              <div className="book-cover" 
                style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            )}
            <div className="book-shelf-changer">
              <select 
                value={this.state.shelf} 
                onChange={(event) => addToShelf(event, book)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors && (
            book.authors.map((author, index) => (
              <div key={index} className="book-authors">{author}</div>
            ))
          )}
        </div>
      </li>
    )
  }
}

export default Book
