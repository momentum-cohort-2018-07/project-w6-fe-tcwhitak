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
        )}
      </div>
    )
  }
}

class BookEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayExtraInfo: false
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

  render () {
    return (
      <div className='bookEntry'>
        <div className='title'>
          {this.props.title}
        </div>
        <div className='author'>
          {this.props.author}
        </div>
        <div className='shortDescription'>
          {this.props.shortDescription}
        </div>
        <div className='cover'>
          <img src={this.props.cover} alt='book cover' />
        </div>
        {this.state.displayExtraInfo ? (
          <div className='extraInfo'>
            <div className='less' onClick={(e) => this.handleClick(e)}>
              less
            </div>
            <div className='url'>
              {this.props.url}
            </div>
            <div className='publisher'>
              {this.props.publisher}
            </div>
            <div className='publicationDate'>
              {this.props.publicationDate}
            </div>
            <div className='detailedDescription'>
              {this.props.detailedDescription}
            </div>
          </div>
        )
          : <div className='more' onClick={(e) => this.handleClick(e)}>
              more
          </div>
        }

      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
