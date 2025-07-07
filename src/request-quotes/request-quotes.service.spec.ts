import { Test, TestingModule } from '@nestjs/testing';
import { RequestQuotesService } from './request-quotes.service';

describe('RequestQuotesService', () => {
  let service: RequestQuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestQuotesService],
    }).compile();

    service = module.get<RequestQuotesService>(RequestQuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
