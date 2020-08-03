var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { projectState } from '../state/project-state.js';
import { ProjectStatus } from '../model/project-model.js';
import { Autobind } from '../decorators/autobind.js';
import { ProjectItem } from './project-item.js';
// ProjectList class
export class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.projects = [];
        this.configure();
        this.renderContent();
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter((project) => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.ACTIVE;
                }
                else {
                    return project.status === ProjectStatus.FINISHED;
                }
            });
            this.projects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        const title = this.type.toUpperCase() + ' PROJECTS';
        this.element.querySelector('h2').textContent = title;
    }
    renderProjects() {
        const listId = `${this.type}-projects-list`;
        const listEl = document.getElementById(listId);
        listEl.innerHTML = '';
        for (const project of this.projects) {
            new ProjectItem(listId, project);
        }
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
}
__decorate([
    Autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dragLeaveHandler", null);
//# sourceMappingURL=project-list.js.map