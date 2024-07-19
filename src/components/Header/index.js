import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

class Header extends Component {
  loggingOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <nav className="navCard">
        <ul className="headerUnorder">
          <li className="firstOne">
            <Link to="/">
              <img
                className="navImage"
                alt="website logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              />
            </Link>
          </li>
          <li>
            <Link className="hyper" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hyper" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" onClick={this.loggingOut} className="navButton">
          Logout
        </button>
      </nav>
    )
  }
}
export default withRouter(Header)
