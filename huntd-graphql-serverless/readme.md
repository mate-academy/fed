# `@mate-academy/huntd-graphql-serverless` npm package

## Usage
### Installation

```
npm i @huntd-graphql-serverless
```

### Use

```javascript
import { getClient } from '@mate-academy/huntd-graphql-serverless';

const client = getClient(url, token);

const users = client.usersQuery({
  a: 'a',
  b: 'b',
});
```


### How to add your queries/mutations to this package

- go to [huntd repository](https://github.com/mate-academy/huntd/)
- create your UseCases/Resolvers(use ServiceUseCase, makeServiceResolver since you need to verify service user to proceed request)
- add your queries/mutations to `.schema` files
- add your queries/mutations to `.queries.serverless`
- add your fragments to `.fragments.serverless`(Optional)
- run `npm run graphql:generate` to generate codegen file
- copy `api/src/graphql/generated.serverless.ts` and paste it in this repo in `src/graphql`;
- update package version in package.json
- run `npm publish` to update package
- ENJOY!:)