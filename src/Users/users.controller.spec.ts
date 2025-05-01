import { User } from '../Users/users.entity';
import { UsersController } from './user.controllers';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.services';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

describe('UsersController', () => {
    let app: INestApplication;
    let controller: UsersController;
    let mockUsersService;

    const mockUsers: Partial<User>[] = [
        {
            id: '1',
            name: 'Juan',
            password: '123456',
            email: 'juan@gmail.com.co',
            isAdmin: false,
            phone: 12345675,
            country: 'Argentina',
            address: 'Calle Siempre viva 123',
            city: 'Capital Federal',
            orders: [],
        },
        {
            id: '2',
            name: 'Jorge',
            password: '123456',
            email: 'jorge@gmail.com.co',
            isAdmin: false,
            phone: 12345675,
            country: 'Colombia',
            address: 'Calle Siempre viva 1234',
            city: 'Capital Federal',
            orders: [],
        },
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue(mockUsers),
                        findOne: jest.fn().mockResolvedValue(mockUsers[0]),
                    },
                },
                {
                    provide: AuthGuard,
                    useValue: {
                        canActivate: jest.fn().mockReturnValue(true),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('mock-token'),
                        verify: jest.fn().mockReturnValue({ userId: 'mock-user-id' }),
                    },
                },
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        controller = module.get<UsersController>(UsersController);
        mockUsersService = module.get<UserService>(UserService);
    });

    it('¡Debería estar definido el controlador!', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('¡Debería retornar una lista de usuarios!', async () => {
            const page = 1;
            const limit = 10;
            const result = await controller.getUsers(page, limit);
            expect(result).toEqual(mockUsers);
            expect(mockUsersService.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('¡Debería retornar un usuario!', async () => {
            const result = await controller.getUserById('1');
            expect(result).toEqual(mockUsers[0]);
            expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
        });
    });

    it('POST en la ruta "/auth/signIn" debería autenticar el usuario y retornar un token', () => {
        return request(app.getHttpServer())
            .post('/auth/signin')
            .send({ email: 'juan@gmail.com.co', password: '123456' })
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty('token');
                expect(res.body.token).toBeDefined();
            });
    });

    it('POST en la ruta "/auth/signIn" con credenciales inválidas debería retornar un error', () => {
        return request(app.getHttpServer())
            .post('/auth/signin')
            .send({ email: 'juan@gmail.com.co', password: '' })
            .expect(401)
            .expect((res) => {
                expect(res.body.message).toEqual('Credenciales inválidas');
            });
    });

    afterAll(async () => {
        await app.close();
    });
});