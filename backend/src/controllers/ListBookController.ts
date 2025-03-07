import { FastifyRequest, FastifyReply } from "fastify";
import { ListBookService } from "../services/ListBookService";

class ListBookController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listBookService = new ListBookService();

    const books = await listBookService.execute();

    reply.send(books);
  }
}

export { ListBookController };