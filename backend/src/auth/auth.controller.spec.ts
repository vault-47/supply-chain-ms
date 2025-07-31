import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const loginReqMock = {
    email: '',
    password: '',
  } as unknown as LoginRequestDto;

  const loginResMock: LoginResponseDto = {
    access_token: jest.fn((token) => token),
  } as unknown as LoginResponseDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Login', () => {
    it('should be return response data', () => {
      controller.login(loginReqMock);
      expect(loginResMock).toHaveBeenCalled();
    });
  });
});
