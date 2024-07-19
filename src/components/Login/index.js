import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value,
    })
  }

  onChangePassword = e => {
    this.setState({
      password: e.target.value,
    })
  }

  renderSuccess = data => {
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 4})
    const {history} = this.props
    history.replace('/')
  }

  renderFailure = data => {
    this.setState({
      errorMsg: data.error_msg,
    })
  }

  logging = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const fetchData = await response.json()
    if (response.ok === true) {
      this.renderSuccess(fetchData)
    } else {
      this.renderFailure(fetchData)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {errorMsg} = this.state
    return (
      <div className="loginBg">
        <div className="cardLog">
          <div className="logoCard">
            <img
              alt="logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <form onSubmit={this.logging} className="entire">
            <div className="inputCard">
              <label htmlFor="car" className="lab">
                USERNAME
              </label>
              <br />
              <input
                id="car"
                onChange={this.onChangeUsername}
                className="inputEle"
                placeholder="Username"
                type="text"
              />
            </div>
            <div className="inputCard">
              <label htmlFor="giv" className="lab">
                PASSWORD
              </label>
              <br />
              <input
                id="giv"
                onChange={this.onChangePassword}
                className="inputEle"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="btCard">
              <button type="submit" className="but12">
                Login
              </button>
            </div>
            <p className="errorStand">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
