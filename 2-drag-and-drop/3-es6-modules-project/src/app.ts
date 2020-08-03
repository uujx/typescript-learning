import { ProjectInput } from './components/project-input.js'
import { ProjectList } from './components/project-list.js'
import { projectState } from './state/project-state.js'
import { ProjectStatus } from './model/project-model.js'

const projectInput = new ProjectInput()
const activeProjects = new ProjectList('active')
const finishedProjects = new ProjectList('finished')

projectState.addProject(
  'TikTok',
  'A short video sharing platform used by almost a billion people around the world.',
  10000,
  ProjectStatus.FINISHED
)

projectState.addProject(
  'WeChat',
  'An intant messaging app that is used by almost everyone in China.',
  15000,
  ProjectStatus.FINISHED
)

projectState.addProject(
  'Timeline',
  'A timeline app in development that aims to help people learn history by visualizing the timeline.',
  1,
  ProjectStatus.ACTIVE
)
