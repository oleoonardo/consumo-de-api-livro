import prismaClient from "../prisma";

class ListBookService {
  async execute() {
    const books = await prismaClient.book.findMany();

    return books;
  }
}

export { ListBookService };