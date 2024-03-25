import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const gqlCtx = context.getArgByIndex(2);
        const request: Request = gqlCtx.req;
        const token = this.extractTokenFromCookie(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
            });
            console.log('payload', token);
            request['user'] = payload;
        } catch (err) {
            console.log('err', err);
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromCookie(request: Request): string | undefined {
        return request.cookies?.access_token;
    }
}
