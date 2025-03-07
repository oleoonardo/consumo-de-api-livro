# Juridiq Full Stack Challenge

## 🏆 Objetivo

Avaliar as habilidades do candidato no desenvolvimento fullstack utilizando **Next.js**, **Node.js** e **TypeScript**. Este desafio visa compreender sua capacidade de estruturar projetos, criar APIs e desenvolver interfaces modernas e funcionais.

---

## 🚀 Descrição do Projeto

O desafio consiste em criar uma aplicação fullstack para gerenciar uma lista de livros. A aplicação terá um backend baseado no framework **Fastify** e um frontend construído com **Next.js** e **Shadcn UI**, utilizando **TypeScript** como linguagem principal.

---

## 🛠️ Tecnologias e Ferramentas

- **Linguagem:** TypeScript
- **Backend:** Fastify
- **Frontend:** Next.js + Shadcn UI + TailwindCss
- **Versionamento de Código:** Git

---

## 📝 Tarefas

### 1. Configuração do Ambiente

- Configure um novo projeto Node.js utilizando TypeScript.
- Crie uma aplicação Next.js configurada com Shadcn UI e TypeScript.
- Instale e configure as dependências necessárias para ambos os ambientes (frontend e backend).

### 2. Desenvolvimento do Backend (API)

Implemente uma API REST com os seguintes requisitos:

- **Entidade:** `Book`  
  - **Campos:** 
    - `id` (string, UUID)  
    - `title` (string)  
    - `author` (string)  
    - `publishedYear` (number)  

#### Endpoints:

1. **`POST /books`**  
   - Adiciona um novo livro.  
   - **Request Body:**  
     ```json
     {
       "title": "string",
       "author": "string",
       "publishedYear": "number"
     }
     ```

2. **`GET /books`**  
   - Retorna a lista de todos os livros cadastrados.  
   - **Bônus:** Implemente um filtro opcional para buscar livros pelo campo `title`.  

### 3. Desenvolvimento do Frontend

- A interface do frontend é livre para criação e deve ser implementada utilizando **Next.js** e **Shadcn UI**.
- Crie páginas que permitam:
  - Cadastrar novos livros.
  - Listar os livros já cadastrados.
  - (Bônus) Filtrar os livros pelo título.

---

## 🏗️ Entrega

- O código-fonte deve ser enviado através de um repositório público no **GitHub**.
- Envie o link do repositório para o e-mail: **contato@juridiq.com.br**.
- Certifique-se de incluir um **README.md** com:
  - Instruções claras sobre como configurar e executar o projeto.
  - Detalhes sobre as decisões tomadas durante o desenvolvimento.

---

## 📌 Observações

- Utilize boas práticas de desenvolvimento, incluindo organização de código, estrutura de pastas e padronização.
- A criatividade no design e funcionalidades do frontend será um diferencial.  
- (Bônus) Forneça testes automatizados para os endpoints e/ou componentes.
