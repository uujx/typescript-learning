// autobind method decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const updatedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }
  return updatedDescriptor
}

interface Validatable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

function validation(input: Validatable): boolean {
  let isValid = true

  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0
  }

  if (input.minLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.length >= input.minLength
  }

  if (input.maxLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.length <= input.maxLength
  }

  if (input.min != null && typeof input.value === 'number') {
    isValid = isValid && input.value >= input.min
  }

  if (input.max != null && typeof input.value === 'number') {
    isValid = isValid && input.value <= input.max
  }

  return isValid
}

// ProjectInput Class
class ProjectInput {
  private templateEl: HTMLTemplateElement
  private hostEl: HTMLDivElement
  private element: HTMLFormElement
  private titleInputEl: HTMLInputElement
  private descriptionInputEl: HTMLInputElement
  private peopleInputEl: HTMLInputElement

  constructor() {
    this.templateEl = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement
    this.hostEl = document.getElementById('app')! as HTMLDivElement

    const importedNode = document.importNode(this.templateEl.content, true)
    this.element = importedNode.firstElementChild as HTMLFormElement
    this.element.id = 'user-input'

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
    this.attach()
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostEl.insertAdjacentElement('afterbegin', this.element)
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault()

    const userInputs = this.getUserInputs()
    if (userInputs) {
      const [title, desc, people] = userInputs
      console.log(title, desc, people)

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
      max: 5
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

const projectInput = new ProjectInput()
