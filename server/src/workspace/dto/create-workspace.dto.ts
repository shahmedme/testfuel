import { Project } from 'project/schemas/project.schema';
import { Member } from 'workspace/schemas/member.schema';

export class CreateWorkspaceDto {
  name: string;
  description: string;
  projects?: Project[];
  members?: Member[];
}
