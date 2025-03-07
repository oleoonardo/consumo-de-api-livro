import { FastifyRequest, FastifyReply } from "fastify";
import { ListTitleBookService } from "../services/ListTitleBookService";

class ListTitleBookController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { title } = request.query as { title: string };

        const bookService = new ListTitleBookService();

        const book = await bookService.execute({ title });

        reply.send(book);
    }
}

export { ListTitleBookController };