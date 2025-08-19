# API de Autenticação com NestJS e Drizzle

Esta é uma API de autenticação robusta e segura, construída com NestJS, TypeScript e Drizzle ORM. O projeto segue os princípios da Arquitetura Hexagonal (Portas e Adaptadores) para garantir um código limpo, escalável e de fácil manutenção.

## Funcionalidades

- **Cadastro e Login de Usuários:** Endpoints para registro (`/sign-up`) e login (`/sign-in`).
- **Hashing de Senhas:** As senhas são armazenadas de forma segura usando o algoritmo `bcrypt`.
- **Autenticação baseada em JWT:** Acesso a rotas protegidas através de JSON Web Tokens.
- **Fluxo de Refresh Tokens:** Mecanismo completo para renovar tokens de acesso sem a necessidade de um novo login, melhorando a experiência do usuário.
- **Logout:** Endpoint para invalidar o refresh token do usuário, efetivamente fazendo o logout.
- **Validação de Entrada:** Validação automática de dados de entrada usando `class-validator`.
- **Rate Limiting:** Proteção contra ataques de força bruta nos endpoints de autenticação.
- **Documentação de API:** Geração automática de documentação interativa com Swagger (OpenAPI).
- **Tratamento de Erros Centralizado:** Um filtro de exceção global garante que os erros sejam retornados em um formato JSON consistente.

## Arquitetura e Tecnologias

- **Framework:** [NestJS](https://nestjs.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Banco de Dados:** Preparado para PostgreSQL
- **Arquitetura:** Hexagonal (Portas e Adaptadores)

## Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v18+)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (para rodar um banco de dados PostgreSQL localmente)

## Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd auth
    ```

2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```

3.  **Configure as variáveis de ambiente:**
    Copie o arquivo de exemplo e preencha com suas credenciais locais.
    ```bash
    cp .env.example .env
    ```
    *Não se esqueça de alterar o `DATABASE_URL` e os segredos `JWT_SECRET` e `JWT_REFRESH_SECRET` no arquivo `.env`.*

4.  **Execute o banco de dados:**
    Se você tiver o Docker, pode iniciar um container PostgreSQL com o comando:
    ```bash
    docker run --name auth-db -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=docker -e POSTGRES_DB=auth-api -p 5432:5432 -d postgres
    ```

5.  **Aplique as migrações do banco de dados:**
    O Drizzle gerencia as alterações de schema. Para aplicar todas as migrações pendentes:
    ```bash
    # (Comando para aplicar migrações - a ser adicionado ao package.json)
    # Por enquanto, pode ser feito com uma ferramenta de banco de dados.
    ```

6.  **Inicie a aplicação em modo de desenvolvimento:**
    ```bash
    pnpm run start:dev
    ```

## Documentação da API

Com a aplicação rodando, a documentação interativa do Swagger estará disponível em:

[**http://localhost:3000/api**](http://localhost:3000/api)

Você pode usar essa interface para visualizar e testar todos os endpoints da API.

## Migrações do Banco de Dados

Este projeto usa o `drizzle-kit` para gerenciar as migrações do banco de dados.

-   **Para gerar uma nova migração** após uma alteração nos schemas (em `src/root/infrastructure/schemas/`):
    ```bash
    pnpm drizzle-kit generate:pg
    ```