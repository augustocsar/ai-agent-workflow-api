# 🤖 AI Agent Workflow API

Uma API Backend moderna e de alta performance para gerenciamento de Agentes de IA, Versionamento de Prompts e Histórico de Execuções.

Construída com a "Bleeding Edge Stack" do ecossistema JavaScript/TypeScript.

## 🚀 Tecnologias

- **Runtime:** [Bun](https://bun.sh) (Substituto ultra-rápido para Node.js)
- **Framework:** [ElysiaJS](https://elysiajs.com) (Performance crítica e DX)
- **API:** [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server)
- **Banco de Dados:** SQLite
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)

## ⚡ Funcionalidades

- **Gerenciamento de Agentes:** Criação e listagem de bots.
- **Versionamento de Prompts:** Sistema inteligente que cria versões (v1, v2...) automaticamente ao atualizar um prompt.
- **Simulação de Runs:** Execução assíncrona simulada (com delay) para imitar chamadas reais a LLMs (GPT/Claude).
- **Relacionamentos Complexos:** Queries aninhadas (`Agent -> Prompts -> Runs`) resolvidas em uma única requisição.

## 🛠️ Como Rodar Localmente

### Pré-requisitos
Você precisa ter o [Bun instalado](https://bun.sh) na sua máquina.

```bash
# 1. Clone o repositório
git clone https://github.com/augustocsar/ai-agent-workflow-api.git
```
```bash
# 2. Entre na pasta
cd api-agentes
```
```bash
# 3. Instale as dependências
bun install
```
```bash
# 4. Gere o Banco de Dados (SQLite)
bunx drizzle-kit push
```
```bash
# 5. Rode o servidor
bun --watch src/index.ts
```

A API estará rodando em: http://localhost:3000/graphql

## 🎮 Exemplos de Uso (GraphQL)
Abra o Playground no navegador e teste as queries abaixo:

1. Criar um Agente
GraphQL
```bash
mutation {
  createAgent(name: "SalesBot", model: "gpt-4") {
    id
    name
  }
}
```
2. Adicionar um Prompt (Gera versão automática)
GraphQL
```bash
mutation {
  addPrompt(agentId: "1", text: "Você é um especialista em vendas.") {
    version
    text
  }
}
```
3. Executar uma Conversa (Simulação)
GraphQL
```bash
mutation {
  executeRun(agentId: "1", input: "Escreva um email frio") {
    output
    status
    durationMs
  }
}
```
4. Relatório Completo (Raio-X)
GraphQL
```bash
query {
  agents {
    name
    prompts {
      version
      text
    }
    runs {
      input
      output
    }
  }
}
```
📝 Licença
Este projeto foi desenvolvido por Augusto César para fins de estudo e portfólio. 