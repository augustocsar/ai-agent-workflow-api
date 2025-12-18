// src/schema.ts

export const typeDefs = `
  type Prompt {
    id: ID!
    text: String!
    version: Int!
    createdAt: String!
  }

  type Run {
    id: ID!
    input: String!
    output: String!
    status: String!
    createdAt: String!
  }

  type Agent {
    id: ID!
    name: String!
    model: String!
    prompts: [Prompt!]!
    runs: [Run!]! # Histórico de conversas desse agente
  }

  type Query {
    agents: [Agent!]!
    hello: String
  }

  type Mutation {
    createAgent(name: String!, model: String!): Agent!
    addPrompt(agentId: ID!, text: String!): Prompt!
    executeRun(agentId: ID!, input: String!): Run!
    deleteAgent(id: ID!): String
  }
`