// Project status enum
enum ProjectStatus {
  ACTIVE,
  FINISHED
}

// Project data class
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

  addProject(
    title: string,
    description: string,
    people: number,
    status: ProjectStatus = ProjectStatus.ACTIVE
  ) {
    const newProject = new Project(
      Math.random().toString(), // TODO: fix the id generation
      title,
      description,
      people,
      status
    )
    this.projects.push(newProject)

    this.updateListeners()
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === projectId)
    if (project) {
      project.status = newStatus
      this.updateListeners()
    }
  }

  private updateListeners() {
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

// drag & drop interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void
  dragEndHandler(event: DragEvent): void
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void
  dragLeaveHandler(event: DragEvent): void
  dropHandler(event: DragEvent): void
}

// ProjectItem class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project

  get person() {
    if (this.project.people === 1) {
      return '1 person'
    } else {
      return `${this.project.people} persons`
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id)

    this.project = project

    this.configure()
    this.renderContent()
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title
    this.element.querySelector('h3')!.textContent = this.person + ' assigned'
    this.element.querySelector('p')!.textContent = this.project.description
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
  }

  dragEndHandler(event: DragEvent) {
    console.log('drag end')
  }
}

// ProjectList class
class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  private projects: any[]

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`)
    this.projects = []

    this.configure()
    this.renderContent()
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)

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

  renderContent() {
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

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault()
      const listEl = this.element.querySelector('ul')!
      listEl.classList.add('droppable')
    }
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData('text/plain')
    projectState.moveProject(
      projectId,
      this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
    )

    const listEl = this.element.querySelector('ul')!
    listEl.classList.remove('droppable')
  }

  @Autobind
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector('ul')!
    listEl.classList.remove('droppable')
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

// Initiate the app
const projectInput = new ProjectInput()
const activeProjects = new ProjectList('active')
const finishedProjects = new ProjectList('finished')

projectState.addProject(
  'TikTok',
  'A short video sharing platform used by almost a billion people around the world.',
  10000,
  ProjectStatus.FINISHED
)

projectState.addProject(
  'WeChat',
  'An intant messaging app that is used by almost everyone in China.',
  15000,
  ProjectStatus.FINISHED
)

projectState.addProject(
  'Timeline',
  'A timeline app in development that aims to help people learn history by visualizing the timeline.',
  1,
  ProjectStatus.ACTIVE
)
