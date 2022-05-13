type Client = {
  clientID: number;
  clientName: string;
};

export class ProjectDto {
  projectID!: number;
  projectName!: string;
  planStartDate!: Date;
  planEndDate!: Date;
  actualStartDate!: Date;
  actualEndDate!: Date;
  projectDescription!: string;
  clientID!: number;
  ProjectManagerID!: number;
  client!: Client;
}
