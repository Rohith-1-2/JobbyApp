import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import SimilarJobs from '../SimilarJobs'
import Skills from '../Skills'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobData: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.makingRequest()
  }

  converting = data =>
    data.map(item => ({
      imageUrl: item.image_url,
      name: item.name,
    }))

  convertingObj = data => ({
    description: data.description,
    imageUrl: data.image_url,
  })

  renderSuccess = data => {
    const job = data.job_details
    console.log(job)
    const simJobs = data.similar_jobs
    const modifiedJob = {
      companyLogoUrl: job.company_logo_url,
      companyWebsiteUrl: job.company_website_url,
      employmentType: job.employment_type,
      id: job.id,
      jobDescription: job.job_description,
      skills: this.converting(job.skills),
      lifeAtCompany: this.convertingObj(job.life_at_company),
      location: job.location,
      packagePerAnnum: job.package_per_annum,
      rating: job.rating,
      title: job.title,
    }
    const modifiedSimJobs = simJobs.map(item => ({
      companyLogoUrl: item.company_logo_url,
      employmentType: item.employment_type,
      id: item.id,
      jobDescription: item.job_description,
      location: item.location,
      rating: item.rating,
      title: item.title,
    }))
    this.setState({
      jobData: modifiedJob,
      similarJobs: modifiedSimJobs,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderFailure = () => {
    this.setState({
      apiStatus: apiStatusConstants.failure,
    })
  }

  makingRequest = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      this.renderSuccess(fetchedData)
    } else {
      this.renderFailure()
    }
  }

  reLoading = () => {
    this.makingRequest()
  }

  renderLoadingView = () => (
    <div className="loader-container detailLoad" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="fail">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.reLoading} className="retryBut">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobData, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobData
    return (
      <>
        <div className="detailCont">
          <div className="netCard">
            <img
              alt="job details company logo"
              className="comlogo"
              src={companyLogoUrl}
            />
            <div>
              <h1 className="headCard">{title}</h1>
              <div className="starCard">
                <FaStar className="starStyle" />
                <p className="starPara">{rating}</p>
              </div>
            </div>
          </div>
          <div className="empCard">
            <div className="locCard">
              <div className="war">
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div className="war">
                <BsFillBriefcaseFill />
                <p className="empS">{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="desCrip">
            <h1 className="desPara">Description</h1>
            <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
              <button
                type="button"
                onClick={this.navigateToAnother}
                className="visitBut"
              >
                Visit
                <BsBoxArrowUpRight />
              </button>
            </a>
          </div>
          <p className="despa">{jobDescription}</p>
          <h1 className="desPara skillsHead">Skills</h1>
          <ul className="skillUnorder">
            {skills.map(item => (
              <Skills key={item.name} obj={item} />
            ))}
          </ul>
          <div className="lifeCard">
            <div>
              <h1 className="desPara">Life at Company</h1>
              <p className="despa">{lifeAtCompany.description}</p>
            </div>
            <img alt="life at company" src={lifeAtCompany.imageUrl} />
          </div>
        </div>
        <h1 className="simHeading">Similar Jobs</h1>
        <ul className="simUnorder">
          {similarJobs.map(item => (
            <SimilarJobs key={item.id} obj={item} />
          ))}
        </ul>
      </>
    )
  }

  renderingAll = () => {
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

  render() {
    return (
      <div>
        <Header />
        <div className="detailCard">
          <div className="detailMini">{this.renderingAll()}</div>
        </div>
      </div>
    )
  }
}
export default JobDetails
