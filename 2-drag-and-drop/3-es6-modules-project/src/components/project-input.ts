import { Component } from './base-component.js'
import { Autobind } from '../decorators/autobind.js'
import { projectState } from '../state/project-state.js'
import { validation } from '../utils/validation.js'

// ProjectInput class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  private titleInputEl: HTMLInputElement
  private descriptionInputEl: HTMLInputElement
  private peopleInputEl: HTMLInputElement

  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputEl = this.element.querySelector(
      '#title'
    )! as HTMLInputElement
    this.descriptionInputEl = this.element.querySelector(
      '#description'
    )! as HTMLInputElement
    this.peopleInputEl = this.element.querySelector(
      '#people'
    )! as HTMLInputElement

    this.configure()
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  renderContent() {}

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault()

    const userInputs = this.getUserInputs()
    if (userInputs) {
      const [title, desc, people] = userInputs

      projectState.addProject(title, desc, people)

      this.clearInputs()
    }
  }

  private getUserInputs(): [string, string, number] | void {
    const title = this.titleInputEl.value
    const description = this.descriptionInputEl.value
    const people = this.peopleInputEl.value

    const titleValidatable = {
      value: title,
      required: true,
      minLength: 1,
      maxLength: 20
    }
    const descriptionValidatable = {
      value: description,
      required: true,
      minLength: 5,
      maxLength: 200
    }
    const peopleValidatable = {
      value: people,
      required: true,
      min: 1,
      max: 20000
    }

    if (
      !validation(titleValidatable) ||
      !validation(descriptionValidatable) ||
      !validation(peopleValidatable)
    ) {
      alert('Invalid input! Please try again!')
      return
    } else {
      return [title, description, +people]
    }
  }

  private clearInputs() {
    this.titleInputEl.value = ''
    this.descriptionInputEl.value = ''
    this.peopleInputEl.value = ''
  }
}
