import './index.css'

const ProjectItem = props => {
  const {eachItem} = props
  const {id, name, imageUrl} = eachItem

  return (
    <li className="item-styling">
      <img src={imageUrl} alt={name} className="specific-project-image" />
      <p className="project-item-styling">{name}</p>
    </li>
  )
}

export default ProjectItem
