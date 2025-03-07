import prismaClient from "../prisma";

interface ListTitleBookProps{
    title: string;
}

class ListTitleBookService {
  async execute({ title }: ListTitleBookProps){

    if (!title) {
      throw new Error('Título do livro não fornecido');
    }

    const book = await prismaClient.book.findMany({
      where: {
        title: title
      }
    });

    if(!book){
      throw new Error('Livro não encontrado');
    }

    return book;
  }
}

export { ListTitleBookService };