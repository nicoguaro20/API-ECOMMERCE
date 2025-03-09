import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers.autorizathion?.split(' ')[1]

        if(!token){
            throw new UnauthorizedException('¡No hay Token!')
        }

        try {
            const secret = process.env.JWT_SECRET

            const user = this.jwtService.verify(token, {secret})
            user.exp = new Date(user.exp * 1000)
            user.iat = new Date(user.iat * 1000)

            if(user.isAdmin){
                user.roles = ['admin']
            } else {
                user.roles = ['user']
            }

            request.user = user

            return true

        } catch {
            throw new UnauthorizedException('¡Token Invalido!')
        }

        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('El header de autorización no existe');
        }

        const credentials = authHeader.split(':');

        if (credentials.length !== 2) {
            throw new UnauthorizedException('Formato de autorización incorrecto');
        }

        const email = credentials[0].trim();
        const password = credentials[1].trim();

        if (!email || !password) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        return true;
    }  
}