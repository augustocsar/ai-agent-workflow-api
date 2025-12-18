# 🤖 AI Agent Workflow API

Uma API Backend moderna e de alta performance para gerenciamento de Agentes de IA, Versionamento de Prompts e Histórico de Execuções.

Construída com a "Bleeding Edge Stack" do ecossistema JavaScript/TypeScript.

## 🚀 Tecnologias

- **Runtime:** [Bun](https://bun.sh) (Substituto ultra-rápido para Node.js)
- **Framework:** [ElysiaJS](https://elysiajs.com) (Performance crítica e DX)
- **API:** [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server)
- **Banco de Dados:** SQLite
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)

## 📂 Estrutura do Projeto

O projeto segue uma **Arquitetura em Camadas (Service Pattern)** para desacoplar as regras de negócio da camada de controle.

```bash
api-agentes/
├── src/
│   ├── db/
│   │   ├── index.ts          # Configuração da conexão com o SQLite
│   │   └── schema.ts         # Definição das tabelas (Agents, Prompts, Runs)
│   ├── services/             # 🧠 Regras de Negócio (Camada de Serviço)
│   │   ├── agent.service.ts  # Lógica de criação, versionamento e deleção em cascata
│   │   └── run.service.ts    # Simulação da execução da IA
│   ├── index.ts              # Entry point e configuração do servidor Elysia
│   ├── resolvers.ts          # Controllers do GraphQL (Recebe o pedido e chama o Service)
│   └── schema.ts             # Contrato da API (Type Definitions do GraphQL)
├── drizzle.config.ts         # Configuração do Drizzle Kit
└── sqlite.db                 # Arquivo do banco de dados (Gerado automaticamente)
```

## ⚡ Funcionalidades

- **Gerenciamento de Agentes:** Criação e listagem de bots.
- **Versionamento de Prompts:** Sistema inteligente que cria versões (v1, v2...) automaticamente ao atualizar um prompt.
- **Simulação de Runs:** Execução assíncrona simulada (com delay) para imitar chamadas reais a LLMs (GPT/Claude).
- **Relacionamentos Complexos:** Queries aninhadas (`Agent -> Prompts -> Runs`) resolvidas em uma única requisição.
- **Exclusão em Cascata:** Remove agentes e limpa automaticamente todos os dados associados (prompts e histórico) para manter a integridade do banco.

## 🛠️ Como Rodar Localmente

### Pré-requisitos
Você precisa ter o [Bun instalado](https://bun.sh) na sua máquina.

## 1. Clone o repositório
```bash
git clone https://github.com/augustocsar/ai-agent-workflow-api.git
```

## 2. Entre na pasta
```bash
cd api-agentes
```

## 3. Instale as dependências
```bash
bun install
```

## 4. Gere o Banco de Dados (SQLite)
```bash
bunx drizzle-kit push
```

## 5. Rode o servidor
```bash
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
5. Deletar um Agente (Limpeza Total)
GraphQL
```bash
mutation {
  deleteAgent(id: "1")
}
```
## 👨‍💻 Autor

Desenvolvido por **Augusto César**.

Se esse projeto te ajudou, sinta-se à vontade para dar uma ⭐ no repositório!
Entre em contato: [LinkedIn](https://www.linkedin.com/in/augustocsar/)

## 📄 Licença

Você pode usar, modificar e distribuir este código livremente para fins de estudo ou comerciais.