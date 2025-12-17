// src/index.ts
import { Elysia } from 'elysia'
import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'

// 1. Criar a instância do GraphQL Yoga
const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  }),
  graphqlEndpoint: '/graphql' // Define a rota onde o GraphQL vai rodar
})

// 2. Criar o servidor Elysia e conectar o Yoga
const app = new Elysia()
  // O método .all intercepta GET e POST na rota /graphql e passa para o Yoga resolver
  .all('/graphql', ({ request }) => yoga.fetch(request))
  .listen(3000)

console.log(`🦊 Elysia rodando em http://${app.server?.hostname}:${app.server?.port}/graphql`)