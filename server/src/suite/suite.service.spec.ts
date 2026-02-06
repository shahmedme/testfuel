import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuiteService } from './suite.service';
import { Suite } from './schemas/suite.schema';
import { CreateSuiteDto } from './dto/create-suite.dto';

describe('SuiteService', () => {
  let service: SuiteService;
  let repository: Repository<Suite>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuiteService,
        {
          provide: getRepositoryToken(Suite),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SuiteService>(SuiteService);
    repository = module.get<Repository<Suite>>(getRepositoryToken(Suite));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a suite with projectId', async () => {
    const createSuiteDto: CreateSuiteDto = {
      name: 'Test Suite',
      projectId: 1,
      cases: [],
      isArchive: false,
    };

    const mockSuite = { id: 1, ...createSuiteDto };
    jest.spyOn(repository, 'create').mockReturnValue(mockSuite as Suite);
    jest.spyOn(repository, 'save').mockResolvedValue(mockSuite as Suite);

    const result = await service.create(createSuiteDto);

    expect(repository.create).toHaveBeenCalledWith(createSuiteDto);
    expect(repository.save).toHaveBeenCalledWith(mockSuite);
    expect(result).toEqual(mockSuite);
  });
});
