import { Suite } from 'suite/schemas/suite.schema';

export class CreateReleaseDto {
  title: string;
  suites: Suite[];
  project: string;
}
