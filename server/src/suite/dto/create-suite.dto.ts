import { Case } from 'case/schemas/case.schema';
import { Types } from 'mongoose';

export class CreateSuiteDto {
  name: string;
  cases: Case[];
  isArchive: boolean;
  project: Types.ObjectId;
}
