import prismaClient from "../prisma";

interface CreateBookProps{
    title: string;
    author: string;
    publishedYear: number;
}

class CreateBookService {
  async execute({title, author, publishedYear}: CreateBookProps) {

    if (!title || !author || !publishedYear) {
      throw new Error("Informações faltando");
    }

    const book = await prismaClient.book.create({
      data: {
        title,
        author,
        publishedYear
      }
    });

    return book;
  }
}

export { CreateBookService };