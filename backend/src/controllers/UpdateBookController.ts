import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateBookService } from "../services/UpdateBookService";

class UpdateBookController {
  async handle(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;
    const { title, author, publishedYear } = request.body as { title: string, author: string, publishedYear?: number };

    if (!id) {
      return reply.status(400).send({ error: "ID do livro é obrigatório" });
    }

    try {
      const updateBookService = new UpdateBookService();
      const book = await updateBookService.execute({ 
        id, 
        title, 
        author,
        publishedYear
      });

      return reply.send(book);
    } catch (error) {

      
      if (error instanceof Error) {
        if (error.message === "Livro não encontrado") {
          return reply.status(404).send({ error: error.message });
        }
        if (error.message.includes("Campos obrigatórios ausentes")) {
          return reply.status(400).send({ error: error.message });
        }
      }
      
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }
}

export { UpdateBookController };