import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse, RegisterResponse } from './types';
import { LoginDto, RegisterDto } from './dto';
import { BadRequestException, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { GraphQlErrorFilter } from 'src/filters/custom-exception.filters';

@UseFilters(GraphQlErrorFilter)
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ) {
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Passwords do not match',
      });
    }

    const { user } = await this.authService.register(registerDto, context.res);

    return { user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response },
  ) {
    return this.authService.login(loginDto, context.res);
  }

  @Mutation(() => String)
  async logout(@Context() Context: { res: Response }) {
    return this.authService.logout(Context.res);
  }

  @Mutation(() => String)
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    console.log('refreshToken');
    try {
      return this.authService.refreshToken(context.req, context.res);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
