"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    // Project status enum
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
        ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    // Project data class
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
/// <reference path="../model/project-model.ts"/>
var App;
(function (App) {
    // State base class
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(fn) {
            this.listeners.push(fn);
        }
    }
    // Singleton project state
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        addProject(title, description, people, status = App.ProjectStatus.ACTIVE) {
            const newProject = new App.Project(Math.random().toString(), // TODO: fix the id generation
            title, description, people, status);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((project) => project.id === projectId);
            if (project) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            this.listeners.forEach((fn) => {
                fn(this.projects.slice());
            });
        }
        static getInstance() {
            if (!this.instance) {
                this.instance = new ProjectState();
            }
            return this.instance;
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
var App;
(function (App) {
    class Component {
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
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
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
    App.Autobind = Autobind;
})(App || (App = {}));
var App;
(function (App) {
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
    App.validation = validation;
})(App || (App = {}));
/// <reference path="./base-component.ts"/>
/// <reference path="../state/project-state.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../utils/validation.ts"/>
var App;
(function (App) {
    // ProjectInput class
    class ProjectInput extends App.Component {
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
                App.projectState.addProject(title, desc, people);
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
            if (!App.validation(titleValidatable) ||
                !App.validation(descriptionValidatable) ||
                !App.validation(peopleValidatable)) {
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
        App.Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
/// <reference path="./base-component.ts"/>
/// <reference path="../model/project-model.ts"/>
/// <reference path="../model/drag-drop-interfaces.ts"/>
/// <reference path="../decorators/autobind.ts"/>
var App;
(function (App) {
    // ProjectItem class
    class ProjectItem extends App.Component {
        constructor(hostId, project) {
            super('single-project', hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get person() {
            if (this.project.people === 1) {
                return '1 person';
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent = this.person + ' assigned';
            this.element.querySelector('p').textContent = this.project.description;
        }
        dragStartHandler(event) {
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(event) {
            console.log('drag end');
        }
    }
    __decorate([
        App.Autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
/// <reference path="./base-component.ts"/>
/// <reference path="./project-item.ts"/>
/// <reference path="../model/project-model.ts"/>
/// <reference path="../model/drag-drop-interfaces.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts"/>
var App;
(function (App) {
    // ProjectList class
    class ProjectList extends App.Component {
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
            App.projectState.addListener((projects) => {
                const relevantProjects = projects.filter((project) => {
                    if (this.type === 'active') {
                        return project.status === App.ProjectStatus.ACTIVE;
                    }
                    else {
                        return project.status === App.ProjectStatus.FINISHED;
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
                new App.ProjectItem(listId, project);
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
            App.projectState.moveProject(projectId, this.type === 'active' ? App.ProjectStatus.ACTIVE : App.ProjectStatus.FINISHED);
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
        dragLeaveHandler(event) {
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
    }
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
/// <reference path="./model/project-model.ts"/>
/// <reference path="./state/project-state.ts"/>
/// <reference path="./components/project-input.ts"/>
/// <reference path="./components/project-list.ts"/>
// Initiate the app
var App;
(function (App) {
    const projectInput = new App.ProjectInput();
    const activeProjects = new App.ProjectList('active');
    const finishedProjects = new App.ProjectList('finished');
    App.projectState.addProject('TikTok', 'A short video sharing platform used by almost a billion people around the world.', 10000, App.ProjectStatus.FINISHED);
    App.projectState.addProject('WeChat', 'An intant messaging app that is used by almost everyone in China.', 15000, App.ProjectStatus.FINISHED);
    App.projectState.addProject('Timeline', 'A timeline app in development that aims to help people learn history by visualizing the timeline.', 1, App.ProjectStatus.ACTIVE);
})(App || (App = {}));
//# sourceMappingURL=bundle.js.map