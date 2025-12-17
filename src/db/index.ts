// src/db/index.ts
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import * as schema from './schema'

// O Bun cria esse arquivo 'sqlite.db' automaticamente se ele não existir
const sqlite = new Database('sqlite.db')

export const db = drizzle(sqlite, { schema })