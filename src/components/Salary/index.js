import './index.css'
import {Component} from 'react'

class Salary extends Component {
  salaryTalk = () => {
    const {salaryPack, obj} = this.props
    salaryPack(obj.salaryRangeId)
  }

  render() {
    const {obj} = this.props
    const {label, salaryRangeId} = obj
    return (
      <li className="empList">
        <input
          onClick={this.salaryTalk}
          id={salaryRangeId}
          name="guitar"
          type="radio"
        />
        <label htmlFor={salaryRangeId} className="empLabel">
          {label}
        </label>
      </li>
    )
  }
}
export default Salary
