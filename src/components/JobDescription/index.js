import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

class JobDescription extends Component {
  render() {
    const {obj} = this.props
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = obj
    return (
      <Link to={`/jobs/${id}`} className="jobCard1">
        <li className="card12">
          <div className="netCard">
            <img className="comlogo" alt="company logo" src={companyLogoUrl} />
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
          <div>
            <h1 className="desPara">Description</h1>
            <p className="despa">{jobDescription}</p>
          </div>
        </li>
      </Link>
    )
  }
}
export default JobDescription
