import './index.css'

const Skills = props => {
  const {obj} = props
  const {name, imageUrl} = obj
  return (
    <li className="skillItem">
      <img className="skillImg" alt={name} src={imageUrl} />
      <p className="despa">{name}</p>
    </li>
  )
}
export default Skills
