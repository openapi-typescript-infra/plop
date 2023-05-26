# @openapi-typescript-infra/plop

A plop-based project generator and maintenance tool for [services](/openapi-typescript-infra/service). Builds tests and
other infra to get up and running quickly. The generally expected conventions for project naming are:

* something-api - a service meant to be hit by the outside world that primarily hosts an OpenAPI endpoint (can have unspec'ed routes as well)
* something-serv - a service meant to be HIDDEN from the outside world but hit from other services (-web, -api, other -servs and admin tools) that hosts an OpenAPI endpoint (can have unspec'ed routes as well)
* something-web - a service meant to host a React app via Next (this is not wired up to the generator yet)

```
mkdir my-cool-api
cd my-cool-api
yarn dlx @openapi-typescript-infra/plop
```

```
mkdir my-cool-api
cd my-cool-api
npx @openapi-typescript-infra/plop
```

After that you can run `yarn build` to vet things, then `yarn test`. Then you should get to work on your API spec, which you can find in the `api` directory of your newly created project.
