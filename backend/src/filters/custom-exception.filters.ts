import { ApolloError } from 'apollo-server-express';
import { Catch, BadRequestException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(BadRequestException)
export class GraphQlErrorFilter implements GqlExceptionFilter {
  catch(exception: BadRequestException) {
    const response = exception.getResponse();

    if (typeof response === 'object') {
      throw new ApolloError('Validation error', 'VALIDATION_ERROR', response);
    } else {
      throw new ApolloError('Bad Requset');
    }
  }
}
