import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDs: {},
  }

  componentDidMount() {
    this.makingRequest()
  }

  renderSuccess = data => {
    const profileDetails = data.profile_details
    const modifiedProfile = {
      name: profileDetails.name,
      profileImageUrl: profileDetails.profile_image_url,
      shortBio: profileDetails.short_bio,
    }
    this.setState({
      profileDs: modifiedProfile,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderFailure = () => {
    this.setState({
      apiStatus: apiStatusConstants.failure,
    })
  }

  reLoading = () => {
    this.makingRequest()
  }

  makingRequest = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      this.renderSuccess(fetchedData)
    } else {
      this.renderFailure()
    }
  }

  renderLoadingView = () => (
    <div className="loader-container proLoad" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="proLoad">
      <button type="button" onClick={this.reLoading} className="retryBut">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileDs} = this.state
    const {name, profileImageUrl, shortBio} = profileDs
    return (
      <div className="profileBg">
        <img alt="profile" src={profileImageUrl} />
        <h1 className="proHead">{name}</h1>
        <p className="proPara">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}
export default Profile
