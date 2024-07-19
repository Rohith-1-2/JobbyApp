import './index.css'
import {Component} from 'react'

class Employment extends Component {
  employing = () => {
    const {employmentTypes, obj} = this.props
    employmentTypes(obj.employmentTypeId)
  }

  render() {
    const {obj} = this.props
    const {label, employmentTypeId} = obj
    return (
      <li className="empList">
        <input id={employmentTypeId} onClick={this.employing} type="checkbox" />
        <label htmlFor={employmentTypeId} className="empLabel">
          {label}
        </label>
      </li>
    )
  }
}
export default Employment
