
# Coleção de Livros

Este projeto permite a gestão de livros, com funcionalidades para cadastrar, listar, editar, filtrar e deletar livros de uma base de dados. A aplicação está dividida entre o backend e o frontend, sendo possível rodá-los localmente.

## Funcionalidades

- **Cadastrar novos livros**: Permite adicionar livros ao sistema.
- **Listar livros**: Exibe todos os livros cadastrados na plataforma.
- **Filtrar livros pelo título**: Permite procurar livros com base no título.
- **Editar livros**: Possibilita a edição das informações de um livro já cadastrado.
- **Deletar livros**: Permite remover livros da base de dados.

## Como Executar o Projeto

### 1. Clonando o Repositório

Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/oleoonardo/consumo-de-api-livro.git
```

### 2. Executando o Backend

Para rodar o backend, siga os seguintes passos:

1. Abra o terminal e navegue até a pasta `backend`:

    ```bash
    cd backend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Crie a variável de ambiente `.env` contendo a URL do seu banco de dados MongoDB:

    ```
    DATABA_URL = "mongodb+srv://usuario:senha@cluster.mongodb.net/meubanco"
    ```

4. Gere as migrações do Prisma:

    ```bash
    npx prisma generate
    ```

5. Inicie o servidor:

    ```bash
    npm start
    ```

O backend estará disponível em `http://localhost:8080`.

### 3. Executando o Frontend

Para rodar o frontend, siga os seguintes passos:

1. Abra o terminal e navegue até a pasta `frontend`:

    ```bash
    cd frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Construa o projeto para produção:

    ```bash
    npm run build
    ```

4. Inicie o servidor do frontend:

    ```bash
    npm start
    ```

O frontend estará disponível em `http://localhost:3000`.

## Link do Projeto em Produção

Você também pode testar o projeto em produção através do seguinte link:

[https://colecao-livros.onrender.com/](https://colecao-livros.onrender.com/)

---

## Tecnologias Usadas

- **Backend**: Node.js, Prisma, MongoDB
- **Frontend**: Next.js, React

