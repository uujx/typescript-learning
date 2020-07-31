"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// autobind method decorator
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const updatedDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return updatedDescriptor;
}
function validation(input) {
    let isValid = true;
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0;
    }
    if (input.minLength != null && typeof input.value === 'string') {
        isValid = isValid && input.value.length >= input.minLength;
    }
    if (input.maxLength != null && typeof input.value === 'string') {
        isValid = isValid && input.value.length <= input.maxLength;
    }
    if (input.min != null && typeof input.value === 'number') {
        isValid = isValid && input.value >= input.min;
    }
    if (input.max != null && typeof input.value === 'number') {
        isValid = isValid && input.value <= input.max;
    }
    return isValid;
}
// ProjectInput Class
class ProjectInput {
    constructor() {
        this.templateEl = document.getElementById('project-input');
        this.hostEl = document.getElementById('app');
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputEl = this.element.querySelector('#title');
        this.descriptionInputEl = this.element.querySelector('#description');
        this.peopleInputEl = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }
    submitHandler(event) {
        event.preventDefault();
        const userInputs = this.getUserInputs();
        if (userInputs) {
            const [title, desc, people] = userInputs;
            console.log(title, desc, people);
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
            max: 5
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
const projectInput = new ProjectInput();
