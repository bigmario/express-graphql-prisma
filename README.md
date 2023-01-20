# GraphQL User CRUD with PrismaORM

## Run on Local
_edit ```.env.example``` file according to needs. and rename it to ```.env```_
```bash
#Installation
$ yarn
```

```bash
# Run Project
# Must have a running PostgreSQL Database
$ yarn --cwd api watch
```
## Run with Docker
```bash
# Build All images
$ docker-compose build

# Run in development mode
$ docker-compose up -d graphql-dev

# Run in production mode (WIP)
$ docker-compose up -d graphql-prod
```

## Access Apollo Server
```http://localhost:<port>/graphql```
