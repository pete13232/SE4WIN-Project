import { GqlModuleOptions } from '@nestjs/graphql';

const graphql_config: GqlModuleOptions = {
  installSubscriptionHandlers: true,
  autoSchemaFile: './graphql/schema.gql',
  debug: false,
  playground: true,
  context: ({ req, connection }) =>
    connection ? { req: req } : { headers: req.headers },
  resolvers: {},
};
export default graphql_config;
