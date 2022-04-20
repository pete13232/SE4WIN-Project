import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      installSubscriptionHandlers: true,
      autoSchemaFile: './graphql/schema.gql',
      debug: false,
      playground: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
      context: ({ req, connection }) =>
        connection ? { req: req } : { headers: req.headers },
      resolvers: {},
    };
  }
}
