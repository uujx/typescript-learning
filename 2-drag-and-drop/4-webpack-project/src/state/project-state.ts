import { Project, ProjectStatus } from "../model/project-model";

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
export class ProjectState extends State<Project> {
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

export const projectState = ProjectState.getInstance()
