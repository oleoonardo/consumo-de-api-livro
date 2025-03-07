import { FastifyRequest, FastifyReply } from "fastify";
import { CreateBookService } from "../services/CreateBookService";

class CreateBookController {
  async handle(request: FastifyRequest, reply: FastifyReply) {

    const { title, author, publishedYear } = request.body as {title: string, author: string, publishedYear: number};

    const bookService = new CreateBookService();

    const book = await bookService.execute({title, author, publishedYear});

    reply.send(book);
  }
}

export { CreateBookController };