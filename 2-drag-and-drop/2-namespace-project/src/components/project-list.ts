/// <reference path="./base-component.ts"/>
/// <reference path="./project-item.ts"/>
/// <reference path="../model/project-model.ts"/>
/// <reference path="../model/drag-drop-interfaces.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts"/>

namespace App {
  // ProjectList class
  export class ProjectList extends Component<HTMLDivElement, HTMLElement>
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
}
