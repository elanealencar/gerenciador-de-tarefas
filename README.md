# Gerenciador de Tarefas

## Descrição

Este projeto é um **gerenciador de tarefas** que permite criar, listar, editar e excluir tarefas. Ele foi desenvolvido usando **React**, **TypeScript**, **Next.js** e **TRPC** para comunicação com o backend. O objetivo é fornecer uma interface simples e funcional para gerenciar tarefas de forma eficiente.

## Funcionalidades

- **Cadastro de tarefas**: Permite criar novas tarefas, especificando título e descrição.
- **Edição de tarefas**: Permite editar tarefas existentes.
- **Exclusão de tarefas**: Permite excluir tarefas com confirmação de ação.
- **Listagem de tarefas**: Exibe a lista de todas as tarefas cadastradas.
- **Interface Responsiva**: O layout é responsivo, garantindo uma boa experiência em dispositivos móveis.

## Tecnologias Usadas

- **React**: Biblioteca para construção da interface de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Next.js**: Framework para React, com funcionalidades de renderização no servidor e roteamento.
- **TRPC**: Biblioteca para comunicação direta entre o frontend e o backend sem a necessidade de uma API RESTful tradicional.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **Zod**: Biblioteca para validação de esquemas e dados.

## Requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**

## Como rodar o projeto localmente

### 1. Clonar o repositório

Primeiro, clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/gerenciador-de-tarefas.git
cd gerenciador-de-tarefas
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Executar o projeto
```bash
npm run dev
```

## Como usar a aplicação

### Tela Inicial
Na tela inicial, você verá uma lista de tarefas cadastradas. É possível criar novas tarefas clicando no botão "Criar nova tarefa". As tarefas exibem o título, a descrição e dois botões para editar ou excluir.

### Criar Tarefa
Para criar uma nova tarefa, clique no botão "Criar nova tarefa", forneça o título e a descrição, e depois clique em "Salvar".

### Editar Tarefa
Você pode editar uma tarefa clicando no botão "Editar" ao lado da tarefa. Isso permitirá que você altere o título e a descrição.

### Excluir Tarefa
Para excluir uma tarefa, clique no botão "Excluir". Será exibida uma confirmação para garantir que você realmente deseja excluir a tarefa.

## Estrutura do Projeto
```plaintext
├── public/               # Imagens e arquivos estáticos
├── src/
│   ├── server/           # Páginas da aplicação (configuração de rotas TRPC)
│   ├── pages/            # Páginas da aplicação (ex: /api, /tasks/new, /tasks/edit/)
│   ├── utils/            # Funções auxiliares e configurações do TRPC
│   ├── styles/           # Arquivos de estilização
├── .gitignore            # Arquivos e pastas ignorados pelo Git
├── README.md             # Este arquivo
├── package.json          # Configuração do projeto e dependências
└── tailwind.config.js    # Configurações do Tailwind CSS
```

## Autor
Elane Alencar
[Linkedin](https://www.linkedin.com/in/elanealencar/)
[Portfólio pessoal](https://portfolio-elanealencar.vercel.app/)
[GitHub](https://github.com/elanealencar/)

