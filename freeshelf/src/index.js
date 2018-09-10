import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import request from 'superagent'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      addBook: false
    }
  }

  componentDidMount () {
    request.get('http://localhost:3001/books')
      .then(res => {
        this.setState({
          books: res.body
        })
      })
  }

  updateBookInApi (book) {
    request.put(`http://localhost:3001/books/${book.id}`)
      .send(book)
      .then(
        this.setState({
          books: this.state.books
        })
      )
  }

  addBook () {
    this.setState({
      addBook: true
    })
  }

  updateBook (bookId, field, newValue) {
    this.setState(state => {
      let book = state.books.find(b => b.id === bookId)
      book[field] = newValue
      // Returning state.books because we've changed the data in it and
      // we need React to know that it should update.
      this.updateBookInApi(book)
      return {
        books: state.books
      }
    })
  }

  render () {
    return (
      <div className='App'>
        {this.state.books.map((book, idx) =>
          <div key={idx} className='book-wrapper'>
            <BookEntry
              id={book.id}
              title={book.title}
              author={book.author}
              shortDescription={book.shortDescription}
              cover={book.coverImageUrl}
              url={book.url}
              publisher={book.publisher}
              publicationDate={book.publicationDate}
              detailedDescription={book.detailedDescription}
              updateBook={this.updateBook.bind(this)}
            />
            <hr className='divider' />
          </div>
        )}
        <button onClick={() => this.addBook()}>Add Book</button>
      </div>
    )
  }
}

class BookEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayExtraInfo: false,
      imageError: false,
      editing: false
    }
  }

  showDetail (e) {
    // console.log('clicked', e)
    this.state.displayExtraInfo
      ? this.setState({
        displayExtraInfo: false
      })
      : this.setState({
        displayExtraInfo: true
      })
  }

  handleImageError (e) {
    this.setState({
      imageError: true
    })
  }

  startEdit (e) {
    console.log('edit started')
    this.setState({
      editing: true
    })
  }

  finishEdit (e) {
    console.log('edit complete')

    this.setState({
      editing: false
    })
  }

  render () {
    return (
      !this.state.editing
        ? <div className='bookEntry'>
          <div className='textContent'>
            <h2 className='title'>
              {this.props.title}
            </h2>
            <h4 className='author'>
              {this.props.author}
            </h4>
            <div className='shortDescription'>
              {this.props.shortDescription}
            </div>

            {this.state.displayExtraInfo ? (
              <div className='extraInfo'>
                <div className='buttons'>
                  <a className='less button' onClick={(e) => this.showDetail(e)}>
                  less
                  </a>
                  <a className='edit button' onClick={(e) => this.startEdit(e)}>
                  edit
                  </a>
                </div>
                <div className='url extraItem'>
                  <span className='label'>URL: </span>
                  {this.props.url}
                </div>
                <div className='publisher extraItem'>
                  <span className='label'>Publisher: </span>
                  {this.props.publisher}
                </div>
                <div className='publicationDate extraItem'>
                  <span className='label'>Publication Date: </span>
                  {this.props.publicationDate}
                </div>
                <div className='detailedDescription extraItem'>
                  <span className='label'>Full Description: </span>
                  {this.props.detailedDescription}
                </div>
              </div>
            )
              : <div className='buttons'>
                <a className='more button' onClick={(e) => this.showDetail(e)}>
              more
                </a>
                <a className='edit button' onClick={(e) => this.startEdit(e)}>
              edit
                </a>
              </div>
            }
          </div>

          <div className='cover-wrapper'>
            {!this.state.imageError ? (
              <img src={this.props.cover} alt='book cover' className='cover' onError={(e) => this.handleImageError(e)} />
            )
              : <img src='https://images.unsplash.com/photo-1460324558840-8df3143cd908?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2105e1fa6f7c9032cbad3071886f2365&auto=format&fit=crop&w=668&q=80' alt='book cover' className='cover' />
            }

          </div>
        </div>
        : <div className='editEntry'>
          <input name='title' className='input editTitle' defaultValue={this.props.title}
            onChange={event => {
              this.props.updateBook(this.props.id, 'title', event.target.value)
            }} />
          <input name='author' className='input editAuthor' defaultValue={this.props.author}
            onChange={event => {
              this.props.updateBook(this.props.id, 'author', event.target.value)
            }} />
          <textarea name='shortDescription' className='textArea editDescription' defaultValue={this.props.shortDescription}
            onChange={event => {
              this.props.updateBook(this.props.id, 'shortDescription', event.target.value)
            }} />
          <input name='url' className='input editUrl' defaultValue={this.props.url}
            onChange={event => {
              this.props.updateBook(this.props.id, 'url', event.target.value)
            }}
          />
          <input name='publisher' className='input editPublisher' defaultValue={this.props.publisher}
            onChange={event => {
              this.props.updateBook(this.props.id, 'publisher', event.target.value)
            }}
          />
          <input name='publicationDate' className='input editPublicationDate' defaultValue={this.props.publicationDate}
            onChange={event => {
              this.props.updateBook(this.props.id, 'publicationDate', event.target.value)
            }}
          />
          <input name='detailedDescription' className='input editDetailedDescription' defaultValue={this.props.detailedDescription}
            onChange={event => {
              this.props.updateBook(this.props.id, 'detailedDescription', event.target.value)
            }}
          />
          <a className='edit button' onClick={(e) => this.finishEdit(e)}>
                  update
          </a>
        </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
