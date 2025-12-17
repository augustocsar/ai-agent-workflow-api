// src/db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// 1. Agentes
export const agents = sqliteTable('agents', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  model: text('model').notNull(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP')
})

// 2. Prompts
export const prompts = sqliteTable('prompts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  agentId: integer('agent_id').references(() => agents.id).notNull(),
  text: text('text').notNull(),
  version: integer('version').notNull(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP')
})

// 3. NOVA: Runs (Execuções)
export const runs = sqliteTable('runs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  agentId: integer('agent_id').references(() => agents.id).notNull(),
  input: text('input').notNull(),   // O que o usuário perguntou
  output: text('output').notNull(), // O que a IA respondeu
  status: text('status').notNull(), // 'COMPLETED' ou 'FAILED'
  createdAt: text('created_at').default('CURRENT_TIMESTAMP')
})