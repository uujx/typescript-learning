export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
