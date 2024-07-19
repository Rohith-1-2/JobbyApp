import './index.css'
import {Component} from 'react'

class NotFound extends Component {
  render() {
    return (
      <div className="notFound">
        <img
          className="notImage"
          alt="not found"
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found</p>
      </div>
    )
  }
}
export default NotFound
