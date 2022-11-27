## Setup:

- don't forget to install dependencies `yarn` (in case you dont have `yarn` please run `npm install yarn -g`)
- simply add token to `.env` file under `NEXT_PUBLIC_GITHUB_TOKEN` variable
- run `yarn dev`
- open the `http://localhost:3000` page

## Useful commands:

- `yarn dev`            - runs dev environment 
- `yarn build`          - runs build
- `yarn test`           - runs tests
- `yarn test:watch`     - in case you are working with it
- `yarn cypress`        - runs e2e tests
- `yarn codegen`        - generates graphql types
- `yarn codegen:watch`  - generates graphql types while changing the graphql files

## Useful information

- project has lint checker
- runs code check on every commit
- project has prettier for code formatting
- supports searching
- supports pagination
- supports displaying size per page 
- app refreshes data by setting proper query params
- has e2e tests
- has unit tests (integration tests for HomePage and unit tests for helper method)
- its client side only (altho its nextjs)

## ?? Things i didn't understand or couldn't do:
- `Do not mock API response in your repository` - I mocked the data for unit testing. Actual data comes from graphql.
- `Dockerize it!` - I never did that so I didn't wanted to spent too much time on it.

## Problems I faced that consumed some time
- `@graphql-codegen/typescript-urql` -  that extension generates variables with the same name and next compiler couldn't build the application. Was looking for a solution, but couldn't find one. The outcome of this decision was to use urql's `useQuery` instead of named query hooks.
- `AntD v5` - Never used this library and wanted to give it a try. Unfortunately it overwrites all styles added by styled-component, even when the components are completely standalone. The decsion here was to use inline styles. Theres only few, but creating my business project I'd probably never pick such library.

## TBH
Its kmy first time setting graphql, playing with AntD and connecting to Github API. The documentation could be a bit better. I find it a bit difficult to find important information (ex. string value for `cursor` param should be in Base64. Its not mentioned in the docs). In my business project, as above, I'd not use AntD library. Its heavy, doesn't allow my to custom style my own components, adds additional level of difficulty and kind of restricts me to the thought process of an author.
I wouldn't say its a 2-4 hour task unless you are doing setting up such projects on a daily basis.

Besides that it was very fun, quite challenging and interesting. I liked the AntDs `loading` support functionality. Learned new way of paginating the page. Didn't know that graphql has such amazing types support.

I look forward to hearing your feedback!
High five!



