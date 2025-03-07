import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateBookController } from "./controllers/CreateBookController";
import { ListBookController } from "./controllers/ListBookController";
import { DeleteBookController } from "./controllers/DeleteBookController";
import { ListTitleBookController } from "./controllers/ListTitleBookController";
import { UpdateBookController } from "./controllers/UpdateBookController";
import { GetBookController } from "./controllers/GetBookController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { hello: "world" };
    });

    // Criar livro
    fastify.post("/book", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateBookController().handle(request, reply);
    });

    // Listar todos os livros
    fastify.get("/books", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListBookController().handle(request, reply);
    });

    // Buscar um livro específico por ID
    fastify.get("/book/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        return new GetBookController().handle(request, reply);
    });

    // Excluir um livro
    fastify.delete("/book/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        return new DeleteBookController().handle(request, reply);
    });

    // Buscar livros por título
    fastify.get("/book/search", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListTitleBookController().handle(request, reply);
    });

    // Atualizar um livro
    fastify.put("/book/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        return new UpdateBookController().handle(request, reply);
    });
};

