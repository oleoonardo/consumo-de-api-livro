import { FastifyRequest, FastifyReply } from "fastify";
import prismaClient from "../prisma";

class GetBookController {
  async handle(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ error: "ID do livro é obrigatório" });
    }

    try {
      const book = await prismaClient.book.findUnique({
        where: { id },
      });

      if (!book) {
        return reply.status(404).send({ error: "Livro não encontrado" });
      }

      return reply.send(book);
    } catch (error) {

      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }
}

export { GetBookController };