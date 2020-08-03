namespace App {
  // Project status enum
  export enum ProjectStatus {
    ACTIVE,
    FINISHED
  }

  // Project data class
  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
}
