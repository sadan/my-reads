import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: '',
    books: [],
    value: "none"
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    if (query) {
      BooksAPI.search(query)
      .then(books => {
        if (books.length) {
          this.setState({ books: books })
        } else {
          console.log("No results found.")
        }
      })
    }
  }

  render() {
    const { addToShelf } = this.props
    
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input onChange={(event) => this.updateQuery(event.target.value)} 
                type="text" 
                placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.books.map((book) => (
                <Book 
                  key={book.id} 
                  book={book}
                  addToShelf={addToShelf} />
              ))}
            </ol>
          </div>
        </div>
      )
  }
}

export default SearchBooks
