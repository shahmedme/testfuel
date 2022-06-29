import { Case } from 'case/schemas/case.schema';

export class CreateSuiteDto {
  name: string;
  cases: Case[];
  project: string;
}
