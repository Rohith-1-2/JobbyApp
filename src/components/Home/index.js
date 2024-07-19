import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="homeBg">
          <h1 className="homeHead">
            Find The Job That
            <br /> Fits Your Life
          </h1>
          <p className="para">
            Millions of people are searching for jobs,salary
            <br /> information, company reviews. Find the job that fits your
            <br /> abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="homeBut">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
