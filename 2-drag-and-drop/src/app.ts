// Project status enum
enum ProjectStatus {
  ACTIVE,
  FINISHED
}

// Project class
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// Listener type
type Listener<T> = (items: T[]) => void

// State base class
abstract class State<T> {
  protected listeners: Listener<T>[] = []

  public addListener(fn: Listener<T>) {
    this.listeners.push(fn)
  }
}

// Singleton project state
class ProjectState extends State<Project> {
  private projects: Project[] = []
  // Observer pattern

  private static instance: ProjectState

  private constructor() {
    super()
  }

  public addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.ACTIVE
    )
    this.projects.push(newProject)

    this.listeners.forEach((fn) => {
      fn(this.projects.slice())
    })
  }

  static getInstance(): ProjectState {
    if (!this.instance) {
      this.instance = new ProjectState()
    }
    return this.instance
  }
}

const projectState = ProjectState.getInstance()

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

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  protected templateEl: HTMLTemplateElement
  protected hostEl: T
  protected element: U

  constructor(
    templateId: string,
    hostId: string,
    insertAtStart: boolean,
    elementId: string
  ) {
    this.templateEl = document.getElementById(
      templateId
    )! as HTMLTemplateElement
    this.hostEl = document.getElementById(hostId)! as T

    const importedNode = document.importNode(this.templateEl.content, true)
    this.element = importedNode.firstElementChild as U
    this.element.id = elementId || ''

    this.attach(insertAtStart)
  }

  private attach(insertAtStart: boolean) {
    this.hostEl.insertAdjacentElement(
      insertAtStart ? 'afterbegin' : 'beforeend',
      this.element
    )
  }

  abstract configure(): void
  abstract renderContent(): void
}

// ProjectItem class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  get person() {
    if (this.project.people === 1) {
      return '1 person'
    } else {
      return `${this.project.people} persons`
    }
  }

  constructor(hostId: string, private project: Project) {
    super('single-project', hostId, false, project.id)

    this.renderContent()
  }

  public configure() {}

  public renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title 
    this.element.querySelector('h3')!.textContent = this.person + ' assigned'
    this.element.querySelector('p')!.textContent = this.project.description
  }
}

// ProjectList class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  private projects: any[]

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`)
    this.projects = []

    this.configure()
    this.renderContent()
  }

  public configure() {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((project) => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.ACTIVE
        } else {
          return project.status === ProjectStatus.FINISHED
        }
      })

      this.projects = relevantProjects

      this.renderProjects()
    })
  }

  public renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId

    const title = this.type.toUpperCase() + ' PROJECTS'
    this.element.querySelector('h2')!.textContent = title
  }

  private renderProjects() {
    const listId = `${this.type}-projects-list`
    const listEl = document.getElementById(listId)! as HTMLUListElement

    listEl.innerHTML = ''
    for (const project of this.projects) {
      new ProjectItem(listId, project)
    }
  }
}

// ProjectInput class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

  public configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  public renderContent() {}

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
const activeProjects = new ProjectList('active')
const finishedProjects = new ProjectList('finished')
