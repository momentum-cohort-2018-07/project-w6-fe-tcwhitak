import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import books from './books.json'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: books
    }
  }

  render () {
    return (
      <div className='App'>
        {this.state.books.map((book, idx) =>
          <div>
            <BookEntry
              key={idx}
              title={book.title}
              author={book.author}
              shortDescription={book.shortDescription}
              cover={book.coverImageUrl}
              url={book.url}
              publisher={book.publisher}
              publicationDate={book.publicationDate}
              detailedDescription={book.detailedDescription}
            />
            <hr className='divider' />
          </div>
        )}
      </div>
    )
  }
}

class BookEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayExtraInfo: false,
      imageError: false
    }
  }

  handleClick (e) {
    console.log('clicked', e)
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

  render () {
    return (
      <div className='bookEntry'>
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
              <div className='less button' onClick={(e) => this.handleClick(e)}>
              less
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
            : <div className='more button' onClick={(e) => this.handleClick(e)}>
              more
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
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
