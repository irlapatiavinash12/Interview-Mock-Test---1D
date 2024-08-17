import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ProjectItem from '../ProjectItem'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProcess: 'INPROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProjectsPage extends Component {
  state = {
    status: apiStatusConstants.initial,
    optionValue: categoriesList[0].id,
    projectsList: [],
  }

  onChangeProjectsType = event => {
    this.setState({optionValue: event.target.value}, this.renderData)
  }

  renderFormatting = data => {
    return {
      id: data.id,
      name: data.name,
      imageUrl: data.image_url,
    }
  }

  renderFailure = () => {
    return (
      <div className="failure-container-styling ">
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-title-text">Ooops! Something Went Wrong</h1>
        <p className="failure-descript">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="retry-button-styling"
          onClick={this.renderData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoader = () => {
    return (
      <div data-testid="loader" className="loader-styling">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  }

  componentDidMount() {
    this.renderData()
  }

  renderData = async () => {
    this.setState({status: apiStatusConstants.inProcess})
    const {optionValue} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${optionValue}`

    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        status: apiStatusConstants.success,
        projectsList: data.projects.map(eachItem =>
          this.renderFormatting(eachItem),
        ),
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {projectsList} = this.state
    return (
      <ul className="projects-unorderedlist">
        {projectsList.map(eachItem => (
          <ProjectItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderOutput = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.inProcess:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {optionValue, status} = this.state
    return (
      <div className="home-container">
        <nav className="header-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </nav>
        <div className="content-container">
          <select
            value={optionValue}
            onChange={this.onChangeProjectsType}
            className="select-styling"
          >
            {categoriesList.map(eachItem => (
              <option value={eachItem.id} key={eachItem.id}>
                {eachItem.displayText}
              </option>
            ))}
          </select>
          {this.renderOutput()}
        </div>
      </div>
    )
  }
}

export default ProjectsPage
