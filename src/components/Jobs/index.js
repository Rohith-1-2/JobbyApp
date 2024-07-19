import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import Employment from '../Employment'
import Salary from '../Salary'
import JobDescription from '../JobDescription'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noJobs: 'NOJOBS',
}

class Jobs extends Component {
  state = {
    userInput: '',
    minimumPack: '',
    employValue: [],
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
  }

  componentDidMount() {
    this.makingRequest()
  }

  clicked = () => {
    this.makingRequest()
  }

  salaryPack = a => {
    this.setState({minimumPack: a}, this.makingRequest)
  }

  employmentTypes = b => {
    const {employValue} = this.state
    if (employValue.includes(b)) {
      this.setState(
        prevState => ({
          employValue: prevState.employValue.filter(item => item !== b),
        }),
        this.makingRequest,
      )
    } else {
      this.setState(
        prevState => ({
          employValue: [...prevState.employValue, b],
        }),
        this.makingRequest,
      )
    }
  }

  changingInput = e => {
    this.setState({
      userInput: e.target.value,
    })
  }

  renderSuccess = data => {
    const modifiedJobs = data.jobs.map(item => ({
      companyLogoUrl: item.company_logo_url,
      employmentType: item.employment_type,
      id: item.id,
      jobDescription: item.job_description,
      location: item.location,
      packagePerAnnum: item.package_per_annum,
      rating: item.rating,
      title: item.title,
    }))
    if (modifiedJobs.length === 0) {
      this.setState({
        apiStatus: apiStatusConstants.noJobs,
        jobsList: modifiedJobs,
      })
    } else {
      this.setState({
        jobsList: modifiedJobs,
        apiStatus: apiStatusConstants.success,
      })
    }
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
    const {userInput, minimumPack, employValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employValue.join()}&search=${userInput}&minimum_package=${minimumPack}`,
      options,
    )
    const fetchedData = await response.json()
    if (response.ok === true) {
      this.renderSuccess(fetchedData)
    } else {
      this.renderFailure()
    }
  }

  renderLoadingView = () => (
    <div className="loader-container load" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul className="unorder">
        {jobsList.map(item => (
          <JobDescription key={item.id} obj={item} />
        ))}
      </ul>
    )
  }

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

  renderNoJobsView = () => (
    <div className="noJob">
      <img
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1>No Jobs Found</h1>
      <p className="noPara">We could not find any jobs. Try other filters.</p>
    </div>
  )

  allJobsFun = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.noJobs:
        return this.renderNoJobsView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="jobBg">
          <div className="first">
            <Profile />
            <hr className="jobHr" />
            <div className="employCard">
              <h1 className="employHead">Type of Employment</h1>
              <ul className="jobUnorder">
                {employmentTypesList.map(item => (
                  <Employment
                    employmentTypes={this.employmentTypes}
                    key={item.employmentTypeId}
                    obj={item}
                  />
                ))}
              </ul>
            </div>
            <hr className="jobHr" />
            <div className="employCard">
              <h1 className="employHead">Salary Range</h1>
              <ul className="jobUnorder">
                {salaryRangesList.map(item => (
                  <Salary
                    salaryPack={this.salaryPack}
                    key={item.salaryRangeId}
                    obj={item}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="second">
            <div className="searchCard">
              <input
                onChange={this.changingInput}
                className="inputSea"
                placeholder="Search"
                type="search"
              />
              <button
                className="searchBut"
                type="button"
                data-testid="searchButton"
                onClick={this.clicked}
              >
                <BsSearch alt="sear" className="search-icon" />
              </button>
            </div>
            {this.allJobsFun()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
