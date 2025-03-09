import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersRepository } from 'src/Users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mockUsersRepository: Partial<UsersRepository>;
  let jwtService: JwtService;

  const testUser = {
    name: 'Testuser',
    email: 'test@gmail.com',
    address: 'Alguna Calle 232',
    password: 'Pass_1234',
    phone: 123456789,
    country: 'Argentina',
    city: 'Parana',
    isAdmin: false,
  };

  beforeEach(async () => {
    mockUsersRepository = {
      getByEmail: jest.fn().mockResolvedValue(testUser),
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    jwtService = moduleFixture.get<JwtService>(JwtService);
    jest.spyOn(bcrypt, 'compare').mockImplementation((password, hash) => {
      return Promise.resolve(password === 'Pass_1234');
    });
  });

  it('POST en la ruta "/auth/signIn" debería autenticar el usuario y retornar un token', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'test@gmail.com', password: 'Pass_1234' })
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
