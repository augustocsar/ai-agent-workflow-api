// src/services/run.service.ts
import { db } from '../db'
import { runs } from '../db/schema'
import { eq, desc } from 'drizzle-orm'

export const RunService = {
  // Simula a execução da IA
  execute: async (agentId: string, input: string) => {
    const idNumerico = parseInt(agentId)
    
    console.log(`🤖 Agente ${agentId} pensando... (Service)`)
    // Delay simulado
    await new Promise(resolve => setTimeout(resolve, 2000))

    const mockResponse = `[Service IA]: Processei "${input}" com sucesso.`

    const result = await db.insert(runs).values({
      agentId: idNumerico,
      input,
      output: mockResponse,
      status: 'COMPLETED'
    }).returning()

    return result[0]
  },

  // Helper para relacionamento
  getByAgent: async (agentId: number) => {
    return await db.select().from(runs)
      .where(eq(runs.agentId, agentId))
      .orderBy(desc(runs.createdAt))
  }
}