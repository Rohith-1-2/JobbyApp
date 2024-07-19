import './index.css'
import {FaStar} from 'react-icons/fa'

const SimilarJobs = props => {
  const {obj} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = obj
  return (
    <li className="simJobCard">
      <div className="netCard">
        <img
          className="simImage"
          alt="similar job company logo"
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
      <p>{location}</p>
      <p>{employmentType}</p>
      <div>
        <h1 className="desPara">Description</h1>
        <p className="despa">{jobDescription}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
