/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _model_project_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model/project-model */ "./src/model/project-model.ts");




const projectInput = new _components_project_input__WEBPACK_IMPORTED_MODULE_0__["ProjectInput"]();
const activeProjects = new _components_project_list__WEBPACK_IMPORTED_MODULE_1__["ProjectList"]('active');
const finishedProjects = new _components_project_list__WEBPACK_IMPORTED_MODULE_1__["ProjectList"]('finished');
_state_project_state__WEBPACK_IMPORTED_MODULE_2__["projectState"].addProject('TikTok', 'A short video sharing platform used by almost a billion people around the world.', 10000, _model_project_model__WEBPACK_IMPORTED_MODULE_3__["ProjectStatus"].FINISHED);
_state_project_state__WEBPACK_IMPORTED_MODULE_2__["projectState"].addProject('WeChat', 'An intant messaging app that is used by almost everyone in China.', 15000, _model_project_model__WEBPACK_IMPORTED_MODULE_3__["ProjectStatus"].FINISHED);
_state_project_state__WEBPACK_IMPORTED_MODULE_2__["projectState"].addProject('Timeline', 'A timeline app in development that aims to help people learn history by visualizing the timeline.', 1, _model_project_model__WEBPACK_IMPORTED_MODULE_3__["ProjectStatus"].ACTIVE);


/***/ }),

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
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


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/*! exports provided: ProjectInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectInput", function() { return ProjectInput; });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/validation */ "./src/utils/validation.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
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
            _state_project_state__WEBPACK_IMPORTED_MODULE_2__["projectState"].addProject(title, desc, people);
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
        if (!Object(_utils_validation__WEBPACK_IMPORTED_MODULE_3__["validation"])(titleValidatable) ||
            !Object(_utils_validation__WEBPACK_IMPORTED_MODULE_3__["validation"])(descriptionValidatable) ||
            !Object(_utils_validation__WEBPACK_IMPORTED_MODULE_3__["validation"])(peopleValidatable)) {
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
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__["Autobind"]
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/*! exports provided: ProjectItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectItem", function() { return ProjectItem; });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
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
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__["Autobind"]
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/*! exports provided: ProjectList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectList", function() { return ProjectList; });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _model_project_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/project-model */ "./src/model/project-model.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
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
        _state_project_state__WEBPACK_IMPORTED_MODULE_1__["projectState"].addListener((projects) => {
            const relevantProjects = projects.filter((project) => {
                if (this.type === 'active') {
                    return project.status === _model_project_model__WEBPACK_IMPORTED_MODULE_2__["ProjectStatus"].ACTIVE;
                }
                else {
                    return project.status === _model_project_model__WEBPACK_IMPORTED_MODULE_2__["ProjectStatus"].FINISHED;
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
            new _project_item__WEBPACK_IMPORTED_MODULE_4__["ProjectItem"](listId, project);
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
        _state_project_state__WEBPACK_IMPORTED_MODULE_1__["projectState"].moveProject(projectId, this.type === 'active' ? _model_project_model__WEBPACK_IMPORTED_MODULE_2__["ProjectStatus"].ACTIVE : _model_project_model__WEBPACK_IMPORTED_MODULE_2__["ProjectStatus"].FINISHED);
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_3__["Autobind"]
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_3__["Autobind"]
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_3__["Autobind"]
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/*! exports provided: Autobind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Autobind", function() { return Autobind; });
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


/***/ }),

/***/ "./src/model/project-model.ts":
/*!************************************!*\
  !*** ./src/model/project-model.ts ***!
  \************************************/
/*! exports provided: ProjectStatus, Project */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectStatus", function() { return ProjectStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Project", function() { return Project; });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
    ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/*! exports provided: ProjectState, projectState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectState", function() { return ProjectState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projectState", function() { return projectState; });
/* harmony import */ var _model_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/project-model */ "./src/model/project-model.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(fn) {
        this.listeners.push(fn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    addProject(title, description, people, status = _model_project_model__WEBPACK_IMPORTED_MODULE_0__["ProjectStatus"].ACTIVE) {
        const newProject = new _model_project_model__WEBPACK_IMPORTED_MODULE_0__["Project"](Math.random().toString(), title, description, people, status);
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
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/utils/validation.ts":
/*!*********************************!*\
  !*** ./src/utils/validation.ts ***!
  \*********************************/
/*! exports provided: validation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validation", function() { return validation; });
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWlucHV0LnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaXRlbS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlY29yYXRvcnMvYXV0b2JpbmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVsL3Byb2plY3QtbW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXRlL3Byb2plY3Qtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3ZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RB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QUFDLFNBQVM7S0FDM0Q7SUFFRCxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDeEQsT0FBTyxHQUFHLE9BQU8sSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHO0tBQzlDO0lBRUQsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3hELE9BQU8sR0FBRyxPQUFPLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsR0FBRztLQUM5QztJQUVELE9BQU8sT0FBTztBQUNoQixDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC50c1wiKTtcbiIsImltcG9ydCB7IFByb2plY3RJbnB1dCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0J1xyXG5pbXBvcnQgeyBQcm9qZWN0TGlzdCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3QnXHJcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gJy4vc3RhdGUvcHJvamVjdC1zdGF0ZSdcclxuaW1wb3J0IHsgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4vbW9kZWwvcHJvamVjdC1tb2RlbCdcclxuXHJcbmNvbnN0IHByb2plY3RJbnB1dCA9IG5ldyBQcm9qZWN0SW5wdXQoKVxyXG5jb25zdCBhY3RpdmVQcm9qZWN0cyA9IG5ldyBQcm9qZWN0TGlzdCgnYWN0aXZlJylcclxuY29uc3QgZmluaXNoZWRQcm9qZWN0cyA9IG5ldyBQcm9qZWN0TGlzdCgnZmluaXNoZWQnKVxyXG5cclxucHJvamVjdFN0YXRlLmFkZFByb2plY3QoXHJcbiAgJ1Rpa1RvaycsXHJcbiAgJ0Egc2hvcnQgdmlkZW8gc2hhcmluZyBwbGF0Zm9ybSB1c2VkIGJ5IGFsbW9zdCBhIGJpbGxpb24gcGVvcGxlIGFyb3VuZCB0aGUgd29ybGQuJyxcclxuICAxMDAwMCxcclxuICBQcm9qZWN0U3RhdHVzLkZJTklTSEVEXHJcbilcclxuXHJcbnByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KFxyXG4gICdXZUNoYXQnLFxyXG4gICdBbiBpbnRhbnQgbWVzc2FnaW5nIGFwcCB0aGF0IGlzIHVzZWQgYnkgYWxtb3N0IGV2ZXJ5b25lIGluIENoaW5hLicsXHJcbiAgMTUwMDAsXHJcbiAgUHJvamVjdFN0YXR1cy5GSU5JU0hFRFxyXG4pXHJcblxyXG5wcm9qZWN0U3RhdGUuYWRkUHJvamVjdChcclxuICAnVGltZWxpbmUnLFxyXG4gICdBIHRpbWVsaW5lIGFwcCBpbiBkZXZlbG9wbWVudCB0aGF0IGFpbXMgdG8gaGVscCBwZW9wbGUgbGVhcm4gaGlzdG9yeSBieSB2aXN1YWxpemluZyB0aGUgdGltZWxpbmUuJyxcclxuICAxLFxyXG4gIFByb2plY3RTdGF0dXMuQUNUSVZFXHJcbilcclxuIiwiZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQsIFUgZXh0ZW5kcyBIVE1MRWxlbWVudD4ge1xyXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZUVsOiBIVE1MVGVtcGxhdGVFbGVtZW50XHJcbiAgcHJvdGVjdGVkIGhvc3RFbDogVFxyXG4gIHByb3RlY3RlZCBlbGVtZW50OiBVXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgdGVtcGxhdGVJZDogc3RyaW5nLFxyXG4gICAgaG9zdElkOiBzdHJpbmcsXHJcbiAgICBpbnNlcnRBdFN0YXJ0OiBib29sZWFuLFxyXG4gICAgZWxlbWVudElkOiBzdHJpbmdcclxuICApIHtcclxuICAgIHRoaXMudGVtcGxhdGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICB0ZW1wbGF0ZUlkXHJcbiAgICApISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50XHJcbiAgICB0aGlzLmhvc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhvc3RJZCkhIGFzIFRcclxuXHJcbiAgICBjb25zdCBpbXBvcnRlZE5vZGUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMudGVtcGxhdGVFbC5jb250ZW50LCB0cnVlKVxyXG4gICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFVcclxuICAgIHRoaXMuZWxlbWVudC5pZCA9IGVsZW1lbnRJZCB8fCAnJ1xyXG5cclxuICAgIHRoaXMuYXR0YWNoKGluc2VydEF0U3RhcnQpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGF0dGFjaChpbnNlcnRBdFN0YXJ0OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmhvc3RFbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgIGluc2VydEF0U3RhcnQgPyAnYWZ0ZXJiZWdpbicgOiAnYmVmb3JlZW5kJyxcclxuICAgICAgdGhpcy5lbGVtZW50XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBhYnN0cmFjdCBjb25maWd1cmUoKTogdm9pZFxyXG4gIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZFxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnXHJcbmltcG9ydCB7IEF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCdcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvcHJvamVjdC1zdGF0ZSdcclxuaW1wb3J0IHsgdmFsaWRhdGlvbiB9IGZyb20gJy4uL3V0aWxzL3ZhbGlkYXRpb24nXHJcblxyXG4vLyBQcm9qZWN0SW5wdXQgY2xhc3NcclxuZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEZvcm1FbGVtZW50PiB7XHJcbiAgcHJpdmF0ZSB0aXRsZUlucHV0RWw6IEhUTUxJbnB1dEVsZW1lbnRcclxuICBwcml2YXRlIGRlc2NyaXB0aW9uSW5wdXRFbDogSFRNTElucHV0RWxlbWVudFxyXG4gIHByaXZhdGUgcGVvcGxlSW5wdXRFbDogSFRNTElucHV0RWxlbWVudFxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCdwcm9qZWN0LWlucHV0JywgJ2FwcCcsIHRydWUsICd1c2VyLWlucHV0JylcclxuXHJcbiAgICB0aGlzLnRpdGxlSW5wdXRFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnI3RpdGxlJ1xyXG4gICAgKSEgYXMgSFRNTElucHV0RWxlbWVudFxyXG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJyNkZXNjcmlwdGlvbidcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnRcclxuICAgIHRoaXMucGVvcGxlSW5wdXRFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnI3Blb3BsZSdcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnRcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpXHJcbiAgfVxyXG5cclxuICBjb25maWd1cmUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyKVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29udGVudCgpIHt9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICBjb25zdCB1c2VySW5wdXRzID0gdGhpcy5nZXRVc2VySW5wdXRzKClcclxuICAgIGlmICh1c2VySW5wdXRzKSB7XHJcbiAgICAgIGNvbnN0IFt0aXRsZSwgZGVzYywgcGVvcGxlXSA9IHVzZXJJbnB1dHNcclxuXHJcbiAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjLCBwZW9wbGUpXHJcblxyXG4gICAgICB0aGlzLmNsZWFySW5wdXRzKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0VXNlcklucHV0cygpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkIHtcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy50aXRsZUlucHV0RWwudmFsdWVcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbklucHV0RWwudmFsdWVcclxuICAgIGNvbnN0IHBlb3BsZSA9IHRoaXMucGVvcGxlSW5wdXRFbC52YWx1ZVxyXG5cclxuICAgIGNvbnN0IHRpdGxlVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgIHZhbHVlOiB0aXRsZSxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIG1pbkxlbmd0aDogMSxcclxuICAgICAgbWF4TGVuZ3RoOiAyMFxyXG4gICAgfVxyXG4gICAgY29uc3QgZGVzY3JpcHRpb25WYWxpZGF0YWJsZSA9IHtcclxuICAgICAgdmFsdWU6IGRlc2NyaXB0aW9uLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgbWluTGVuZ3RoOiA1LFxyXG4gICAgICBtYXhMZW5ndGg6IDIwMFxyXG4gICAgfVxyXG4gICAgY29uc3QgcGVvcGxlVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgIHZhbHVlOiBwZW9wbGUsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtaW46IDEsXHJcbiAgICAgIG1heDogMjAwMDBcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICF2YWxpZGF0aW9uKHRpdGxlVmFsaWRhdGFibGUpIHx8XHJcbiAgICAgICF2YWxpZGF0aW9uKGRlc2NyaXB0aW9uVmFsaWRhdGFibGUpIHx8XHJcbiAgICAgICF2YWxpZGF0aW9uKHBlb3BsZVZhbGlkYXRhYmxlKVxyXG4gICAgKSB7XHJcbiAgICAgIGFsZXJ0KCdJbnZhbGlkIGlucHV0ISBQbGVhc2UgdHJ5IGFnYWluIScpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFt0aXRsZSwgZGVzY3JpcHRpb24sICtwZW9wbGVdXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFySW5wdXRzKCkge1xyXG4gICAgdGhpcy50aXRsZUlucHV0RWwudmFsdWUgPSAnJ1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWwudmFsdWUgPSAnJ1xyXG4gICAgdGhpcy5wZW9wbGVJbnB1dEVsLnZhbHVlID0gJydcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLWNvbXBvbmVudCdcclxuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSAnLi4vbW9kZWwvZHJhZy1kcm9wLWludGVyZmFjZXMnXHJcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9tb2RlbC9wcm9qZWN0LW1vZGVsJ1xyXG5pbXBvcnQgeyBBdXRvYmluZCB9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQnXHJcblxyXG4vLyBQcm9qZWN0SXRlbSBjbGFzc1xyXG5leHBvcnQgY2xhc3MgUHJvamVjdEl0ZW0gZXh0ZW5kcyBDb21wb25lbnQ8SFRNTFVMaXN0RWxlbWVudCwgSFRNTExJRWxlbWVudD5cclxuICBpbXBsZW1lbnRzIERyYWdnYWJsZSB7XHJcbiAgcHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0XHJcblxyXG4gIGdldCBwZXJzb24oKSB7XHJcbiAgICBpZiAodGhpcy5wcm9qZWN0LnBlb3BsZSA9PT0gMSkge1xyXG4gICAgICByZXR1cm4gJzEgcGVyc29uJ1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGAke3RoaXMucHJvamVjdC5wZW9wbGV9IHBlcnNvbnNgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihob3N0SWQ6IHN0cmluZywgcHJvamVjdDogUHJvamVjdCkge1xyXG4gICAgc3VwZXIoJ3NpbmdsZS1wcm9qZWN0JywgaG9zdElkLCBmYWxzZSwgcHJvamVjdC5pZClcclxuXHJcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmUoKVxyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KClcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpXHJcbiAgfVxyXG5cclxuICByZW5kZXJDb250ZW50KCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlXHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDMnKSEudGV4dENvbnRlbnQgPSB0aGlzLnBlcnNvbiArICcgYXNzaWduZWQnXHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigncCcpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvblxyXG4gIH1cclxuXHJcbiAgQEF1dG9iaW5kXHJcbiAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLnByb2plY3QuaWQpXHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSdcclxuICB9XHJcblxyXG4gIGRyYWdFbmRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdkcmFnIGVuZCcpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnXHJcbmltcG9ydCB7IERyYWdUYXJnZXQgfSBmcm9tICcuLi9tb2RlbC9kcmFnLWRyb3AtaW50ZXJmYWNlcydcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvcHJvamVjdC1zdGF0ZSdcclxuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4uL21vZGVsL3Byb2plY3QtbW9kZWwnXHJcbmltcG9ydCB7IEF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCdcclxuaW1wb3J0IHsgUHJvamVjdEl0ZW0gfSBmcm9tICcuL3Byb2plY3QtaXRlbSdcclxuXHJcbi8vIFByb2plY3RMaXN0IGNsYXNzXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TGlzdCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+XHJcbiAgaW1wbGVtZW50cyBEcmFnVGFyZ2V0IHtcclxuICBwcml2YXRlIHByb2plY3RzOiBhbnlbXVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6ICdhY3RpdmUnIHwgJ2ZpbmlzaGVkJykge1xyXG4gICAgc3VwZXIoJ3Byb2plY3QtbGlzdCcsICdhcHAnLCBmYWxzZSwgYCR7dHlwZX0tcHJvamVjdHNgKVxyXG4gICAgdGhpcy5wcm9qZWN0cyA9IFtdXHJcblxyXG4gICAgdGhpcy5jb25maWd1cmUoKVxyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KClcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJIYW5kbGVyKVxyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcilcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5kcm9wSGFuZGxlcilcclxuXHJcbiAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcclxuICAgICAgY29uc3QgcmVsZXZhbnRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdhY3RpdmUnKSB7XHJcbiAgICAgICAgICByZXR1cm4gcHJvamVjdC5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQUNUSVZFXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBwcm9qZWN0LnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5GSU5JU0hFRFxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMucHJvamVjdHMgPSByZWxldmFudFByb2plY3RzXHJcblxyXG4gICAgICB0aGlzLnJlbmRlclByb2plY3RzKClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZW5kZXJDb250ZW50KCkge1xyXG4gICAgY29uc3QgbGlzdElkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YFxyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkID0gbGlzdElkXHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLnR5cGUudG9VcHBlckNhc2UoKSArICcgUFJPSkVDVFMnXHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPSB0aXRsZVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cygpIHtcclxuICAgIGNvbnN0IGxpc3RJZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGBcclxuICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpc3RJZCkhIGFzIEhUTUxVTGlzdEVsZW1lbnRcclxuXHJcbiAgICBsaXN0RWwuaW5uZXJIVE1MID0gJydcclxuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiB0aGlzLnByb2plY3RzKSB7XHJcbiAgICAgIG5ldyBQcm9qZWN0SXRlbShsaXN0SWQsIHByb2plY3QpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09ICd0ZXh0L3BsYWluJykge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIVxyXG4gICAgICBsaXN0RWwuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnN0IHByb2plY3RJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YSgndGV4dC9wbGFpbicpXHJcbiAgICBwcm9qZWN0U3RhdGUubW92ZVByb2plY3QoXHJcbiAgICAgIHByb2plY3RJZCxcclxuICAgICAgdGhpcy50eXBlID09PSAnYWN0aXZlJyA/IFByb2plY3RTdGF0dXMuQUNUSVZFIDogUHJvamVjdFN0YXR1cy5GSU5JU0hFRFxyXG4gICAgKVxyXG5cclxuICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIVxyXG4gICAgbGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpXHJcbiAgfVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBkcmFnTGVhdmVIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIVxyXG4gICAgbGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpXHJcbiAgfVxyXG59XHJcbiIsIi8vIGF1dG9iaW5kIG1ldGhvZCBkZWNvcmF0b3JcclxuZXhwb3J0IGZ1bmN0aW9uIEF1dG9iaW5kKF86IGFueSwgXzI6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XHJcbiAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlXHJcbiAgY29uc3QgdXBkYXRlZERlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldCgpIHtcclxuICAgICAgY29uc3QgYm91bmRGbiA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcylcclxuICAgICAgcmV0dXJuIGJvdW5kRm5cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHVwZGF0ZWREZXNjcmlwdG9yXHJcbn1cclxuIiwiLy8gUHJvamVjdCBzdGF0dXMgZW51bVxyXG5leHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtcclxuICBBQ1RJVkUsXHJcbiAgRklOSVNIRURcclxufVxyXG5cclxuLy8gUHJvamVjdCBkYXRhIGNsYXNzXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBpZDogc3RyaW5nLFxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIHB1YmxpYyBwZW9wbGU6IG51bWJlcixcclxuICAgIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXNcclxuICApIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbC9wcm9qZWN0LW1vZGVsXCI7XHJcblxyXG4vLyBMaXN0ZW5lciB0eXBlXHJcbnR5cGUgTGlzdGVuZXI8VD4gPSAoaXRlbXM6IFRbXSkgPT4gdm9pZFxyXG5cclxuLy8gU3RhdGUgYmFzZSBjbGFzc1xyXG5hYnN0cmFjdCBjbGFzcyBTdGF0ZTxUPiB7XHJcbiAgcHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdXHJcblxyXG4gIHB1YmxpYyBhZGRMaXN0ZW5lcihmbjogTGlzdGVuZXI8VD4pIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLnB1c2goZm4pXHJcbiAgfVxyXG59XHJcblxyXG4vLyBTaW5nbGV0b24gcHJvamVjdCBzdGF0ZVxyXG5leHBvcnQgY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGU8UHJvamVjdD4ge1xyXG4gIHByaXZhdGUgcHJvamVjdHM6IFByb2plY3RbXSA9IFtdXHJcbiAgLy8gT2JzZXJ2ZXIgcGF0dGVyblxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlXHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgfVxyXG5cclxuICBhZGRQcm9qZWN0KFxyXG4gICAgdGl0bGU6IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBwZW9wbGU6IG51bWJlcixcclxuICAgIHN0YXR1czogUHJvamVjdFN0YXR1cyA9IFByb2plY3RTdGF0dXMuQUNUSVZFXHJcbiAgKSB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoXHJcbiAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSwgLy8gVE9ETzogZml4IHRoZSBpZCBnZW5lcmF0aW9uXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgcGVvcGxlLFxyXG4gICAgICBzdGF0dXNcclxuICAgIClcclxuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KVxyXG5cclxuICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKClcclxuICB9XHJcblxyXG4gIG1vdmVQcm9qZWN0KHByb2plY3RJZDogc3RyaW5nLCBuZXdTdGF0dXM6IFByb2plY3RTdGF0dXMpIHtcclxuICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IHByb2plY3RJZClcclxuICAgIGlmIChwcm9qZWN0KSB7XHJcbiAgICAgIHByb2plY3Quc3RhdHVzID0gbmV3U3RhdHVzXHJcbiAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlTGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IHtcclxuICAgICAgZm4odGhpcy5wcm9qZWN0cy5zbGljZSgpKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBQcm9qZWN0U3RhdGUge1xyXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUHJvamVjdFN0YXRlKClcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKClcclxuIiwiZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0YWJsZSB7XHJcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlclxyXG4gIHJlcXVpcmVkPzogYm9vbGVhblxyXG4gIG1pbkxlbmd0aD86IG51bWJlclxyXG4gIG1heExlbmd0aD86IG51bWJlclxyXG4gIG1pbj86IG51bWJlclxyXG4gIG1heD86IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGlvbihpbnB1dDogVmFsaWRhdGFibGUpOiBib29sZWFuIHtcclxuICBsZXQgaXNWYWxpZCA9IHRydWVcclxuXHJcbiAgaWYgKGlucHV0LnJlcXVpcmVkKSB7XHJcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBpbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDBcclxuICB9XHJcblxyXG4gIGlmIChpbnB1dC5taW5MZW5ndGggIT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQudmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBpbnB1dC52YWx1ZS5sZW5ndGggPj0gaW5wdXQubWluTGVuZ3RoXHJcbiAgfVxyXG5cclxuICBpZiAoaW5wdXQubWF4TGVuZ3RoICE9IG51bGwgJiYgdHlwZW9mIGlucHV0LnZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgaW5wdXQudmFsdWUubGVuZ3RoIDw9IGlucHV0Lm1heExlbmd0aFxyXG4gIH1cclxuXHJcbiAgaWYgKGlucHV0Lm1pbiAhPSBudWxsICYmIHR5cGVvZiBpbnB1dC52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIGlucHV0LnZhbHVlID49IGlucHV0Lm1pblxyXG4gIH1cclxuXHJcbiAgaWYgKGlucHV0Lm1heCAhPSBudWxsICYmIHR5cGVvZiBpbnB1dC52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIGlucHV0LnZhbHVlIDw9IGlucHV0Lm1heFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGlzVmFsaWRcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9