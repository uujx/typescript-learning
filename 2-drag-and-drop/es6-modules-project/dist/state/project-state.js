import { Project, ProjectStatus } from "../model/project-model.js";
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
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    addProject(title, description, people, status = ProjectStatus.ACTIVE) {
        const newProject = new Project(Math.random().toString(), // TODO: fix the id generation
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
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map