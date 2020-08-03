import { Component } from './base-component.js'
import { Draggable } from '../model/drag-drop-interfaces.js'
import { Project } from '../model/project-model.js'
import { Autobind } from '../decorators/autobind.js'

// ProjectItem class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
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
