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

  editBook (bookId, title, author, shortDescription, url, publisher, publicationDate, detailedDescription, coverImageUrl) {
    const book = this.state.books.find(book => book.id === bookId)
    book.title = title
    book.author = author
    book.shortDescription = shortDescription
    book.url = url
    book.publisher = publisher
    book.publicationDate = publicationDate
    book.detailedDescription = detailedDescription
    book.coverImageUrl = coverImageUrl
    this.setState({
      books: this.state.books
    })
    this.updateBookInApi(book)
  }

  render () {
    return (
      <div className='App'>
        {this.state.books.map((book, idx) =>
          <div key={idx} className='book-wrapper'>
            <BookEntry
              key={book.id}
              title={book.title}
              author={book.author}
              shortDescription={book.shortDescription}
              cover={book.coverImageUrl}
              url={book.url}
              publisher={book.publisher}
              publicationDate={book.publicationDate}
              detailedDescription={book.detailedDescription}
              editBook={(bookId, title, author, shortDescription, url, publisher, publicationDate, detailedDescription, coverImageUrl) =>
                this.editBook(bookId, title, author, shortDescription, url, publisher, publicationDate, detailedDescription, coverImageUrl)}
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

    // this.setState({
    //   editing: false
    // })
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
          <input className='input editTitle' defaultValue={this.props.title} />
          <input className='input editAuthor' defaultValue={this.props.author} />
          <textarea className='textArea editDescription' defaultValue={this.props.shortDescription} />
          <input className='input editUrl' defaultValue={this.props.url} />
          <input className='input editPublisher' defaultValue={this.props.publisher} />
          <input className='input editPublicationDate' defaultValue={this.props.publicationDate} />
          <input className='input editDetailedDescription' defaultValue={this.props.detailedDescription} />
          <a className='edit button' onClick={(e) => this.finishEdit(e)}>
                  update
          </a>
        </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
