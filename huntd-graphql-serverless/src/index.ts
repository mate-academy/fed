import { GraphQLClient } from 'graphql-request';
import { getSdk } from './graphql/generated.serverless';

export const getClient = (path: string, token: string) => {
  const client = new GraphQLClient(path, {
    headers: {
      'x-service-token': token,
    },
  });

  return getSdk(client);
};

export * from './graphql/generated.serverless';
