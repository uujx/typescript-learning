var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from './base-component.js';
import { Autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import { validation } from '../utils/validation.js';
// ProjectInput class
export class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputEl = this.element.querySelector('#title');
        this.descriptionInputEl = this.element.querySelector('#description');
        this.peopleInputEl = this.element.querySelector('#people');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    submitHandler(event) {
        event.preventDefault();
        const userInputs = this.getUserInputs();
        if (userInputs) {
            const [title, desc, people] = userInputs;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
    getUserInputs() {
        const title = this.titleInputEl.value;
        const description = this.descriptionInputEl.value;
        const people = this.peopleInputEl.value;
        const titleValidatable = {
            value: title,
            required: true,
            minLength: 1,
            maxLength: 20
        };
        const descriptionValidatable = {
            value: description,
            required: true,
            minLength: 5,
            maxLength: 200
        };
        const peopleValidatable = {
            value: people,
            required: true,
            min: 1,
            max: 20000
        };
        if (!validation(titleValidatable) ||
            !validation(descriptionValidatable) ||
            !validation(peopleValidatable)) {
            alert('Invalid input! Please try again!');
            return;
        }
        else {
            return [title, description, +people];
        }
    }
    clearInputs() {
        this.titleInputEl.value = '';
        this.descriptionInputEl.value = '';
        this.peopleInputEl.value = '';
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map