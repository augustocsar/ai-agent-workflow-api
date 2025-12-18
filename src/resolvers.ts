// src/resolvers.ts
import { AgentService } from './services/agent.service'
import { RunService } from './services/run.service'

export const resolvers = {
  Query: {
    agents: () => AgentService.getAll(),
    hello: () => "Arquitetura em Camadas funcionando!"
  },

  Mutation: {
    createAgent: (_: any, { name, model }: { name: string, model: string }) => {
      return AgentService.create(name, model)
    },

    addPrompt: (_: any, { agentId, text }: { agentId: string, text: string }) => {
      return AgentService.addPrompt(agentId, text)
    },

    executeRun: (_: any, { agentId, input }: { agentId: string, input: string }) => {
      return RunService.execute(agentId, input)
    },

    deleteAgent: async (_: any, { id }: { id: string }) => {
      await AgentService.delete(id)
      return `Agente ${id} deletado via Service!`
    }
  },

  Agent: {
    prompts: (parent: any) => AgentService.getPromptsByAgent(parent.id),
    runs: (parent: any) => RunService.getByAgent(parent.id)
  }
}