import React, { Component } from 'react';
import Book from './Book'

class BookShelf extends Component {
	render() {
		const { title, books, addToShelf } = this.props;
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books && books.map(book => (
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

export default BookShelf;