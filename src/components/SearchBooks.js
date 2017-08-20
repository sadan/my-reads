import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  };

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    if (query) {
      BooksAPI.search(query)
      .then(books => {
        if (books.length) {
          let myBooks = this.props.myBooks;
          books.map(book => {
            let bookInShelf = myBooks.find(b => b.id === book.id);
            if (bookInShelf) {
              book.shelf = bookInShelf.shelf;
            } else {
              book.shelf = "none"
            }
          });
          this.setState({ books: books });
        } else {
          console.log("No results found for " + this.state.query);
        };
      });
    };
  };

  render() {
    const { addToShelf } = this.props;
  
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
                addToShelf={addToShelf}
                updateShelf={this.updateShelf} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
