export class Component {
    constructor(templateId, hostId, insertAtStart, elementId) {
        this.templateEl = document.getElementById(templateId);
        this.hostEl = document.getElementById(hostId);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = elementId || '';
        this.attach(insertAtStart);
    }
    attach(insertAtStart) {
        this.hostEl.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }
}
//# sourceMappingURL=base-component.js.map