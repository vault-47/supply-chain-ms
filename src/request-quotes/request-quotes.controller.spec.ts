import { Test, TestingModule } from '@nestjs/testing';
import { RequestQuotesController } from './request-quotes.controller';

describe('RequestQuotesController', () => {
  let controller: RequestQuotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestQuotesController],
    }).compile();

    controller = module.get<RequestQuotesController>(RequestQuotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
