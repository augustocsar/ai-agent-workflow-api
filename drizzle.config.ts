import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite", // Tipo do banco
  schema: "./src/db/schema.ts", // Onde estão nossas tabelas
  dbCredentials: {
    url: "file:sqlite.db", // Nome do arquivo do banco que será criado
  },
});