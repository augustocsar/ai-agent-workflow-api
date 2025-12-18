// src/services/agent.service.ts
import { db } from '../db'
import { agents, prompts, runs } from '../db/schema'
import { eq, desc } from 'drizzle-orm'

export const AgentService = {
  // Buscar todos
  getAll: async () => {
    return await db.select().from(agents)
  },

  // Criar Agente
  create: async (name: string, model: string) => {
    const result = await db.insert(agents).values({ name, model }).returning()
    return result[0]
  },

  // Regra de Negócio: Versionamento de Prompt
  addPrompt: async (agentId: string, text: string) => {
    const idNumerico = parseInt(agentId)
    
    // Busca versão anterior
    const ultimosPrompts = await db
      .select()
      .from(prompts)
      .where(eq(prompts.agentId, idNumerico))
      .orderBy(desc(prompts.version))
      .limit(1)

    const ultimoPrompt = ultimosPrompts[0]
    const novaVersao = ultimoPrompt ? ultimoPrompt.version + 1 : 1

    // Salva novo
    const result = await db.insert(prompts).values({
      agentId: idNumerico,
      text,
      version: novaVersao
    }).returning()

    return result[0]
  },

  // Regra de Negócio: Cascade Delete
  delete: async (id: string) => {
    const idNumerico = parseInt(id)

    // Deleta em ordem (Filhos -> Pai)
    await db.delete(runs).where(eq(runs.agentId, idNumerico))
    await db.delete(prompts).where(eq(prompts.agentId, idNumerico))
    await db.delete(agents).where(eq(agents.id, idNumerico))

    return true // Retorna true se deu certo
  },

  // Helpers para os Relacionamentos
  getPromptsByAgent: async (agentId: number) => {
    return await db.select().from(prompts)
      .where(eq(prompts.agentId, agentId))
      .orderBy(desc(prompts.version))
  }
}