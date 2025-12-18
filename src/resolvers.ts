// src/resolvers.ts
import { db } from './db'
import { agents, prompts, runs } from './db/schema'
import { eq, desc } from 'drizzle-orm'

export const resolvers = {
  Query: {
    agents: async () => {
      // Busca todos os agentes do banco
      return await db.select().from(agents)
    },
    hello: () => "Sistema operacional. Agentes prontos para execução."
  },

  Mutation: {
    // 1. Cria um Agente
    createAgent: async (_: any, { name, model }: { name: string, model: string }) => {
      const result = await db.insert(agents).values({ name, model }).returning()
      return result[0]
    },

    // 2. Adiciona um Prompt (Com versionamento automático)
    addPrompt: async (_: any, { agentId, text }: { agentId: string, text: string }) => {
      const idNumerico = parseInt(agentId)
      
      // Busca o último prompt para descobrir a versão atual
      const ultimosPrompts = await db
        .select()
        .from(prompts)
        .where(eq(prompts.agentId, idNumerico))
        .orderBy(desc(prompts.version))
        .limit(1)

      const ultimoPrompt = ultimosPrompts[0]
      const novaVersao = ultimoPrompt ? ultimoPrompt.version + 1 : 1

      // Salva o novo prompt
      const result = await db.insert(prompts).values({
        agentId: idNumerico,
        text,
        version: novaVersao
      }).returning()

      return result[0]
    },

    // 3. Executa uma conversa (Simula a IA)
    executeRun: async (_: any, { agentId, input }: { agentId: string, input: string }) => {
      const idNumerico = parseInt(agentId)
      
      // Simular delay da IA (2 segundos)
      console.log(`🤖 Agente ${agentId} pensando...`)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Gerar resposta "falsa" (Mock)
      const mockResponse = `[IA Simulada]: Recebi sua mensagem: "${input}". Processado com sucesso!`

      // Salvar a execução no banco
      const result = await db.insert(runs).values({
        agentId: idNumerico,
        input,
        output: mockResponse,
        status: 'COMPLETED'
      }).returning()

      return result[0]
    },

    // 4. Deletar um Agente (Faxina Completa / Cascade Delete)
    deleteAgent: async (_: any, { id }: { id: string }) => {
      const idNumerico = parseInt(id)

      // Passo 1: Apagar o histórico de conversas (Runs) desse agente
      // (Se não apagar isso antes, o banco reclama de integridade)
      await db.delete(runs).where(eq(runs.agentId, idNumerico))

      // Passo 2: Apagar as memórias (Prompts) desse agente
      await db.delete(prompts).where(eq(prompts.agentId, idNumerico))

      // Passo 3: Agora que ele não tem mais vínculos, apaga o Agente
      await db.delete(agents).where(eq(agents.id, idNumerico))

      return `Agente ${id} e todos os seus dados foram deletados com sucesso.`
    }
  },

  // Relacionamentos (Resolvers Aninhados)
  Agent: {
    // Busca prompts do agente específico
    prompts: async (parent: any) => {
      return await db.select().from(prompts)
        .where(eq(prompts.agentId, parent.id))
        .orderBy(desc(prompts.version))
    },
    // Busca conversas do agente específico
    runs: async (parent: any) => {
      return await db.select().from(runs)
        .where(eq(runs.agentId, parent.id))
        .orderBy(desc(runs.createdAt))
    }
  }
}