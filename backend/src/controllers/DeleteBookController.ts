import { FastifyRequest, FastifyReply } from "fastify";
import prismaClient from "../prisma";

class DeleteBookController {
  async handle(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ error: "ID do livro é obrigatório" });
    }

    try {
      // Verificar se o livro existe
      const bookExists = await prismaClient.book.findUnique({
        where: { id },
      });

      if (!bookExists) {
        return reply.status(404).send({ error: "Livro não encontrado" });
      }

      // Excluir o livro
      await prismaClient.book.delete({
        where: { id },
      });

      return reply.send({ message: "Livro excluído com sucesso" });
    } catch (error) {
      
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }
}

export { DeleteBookController };