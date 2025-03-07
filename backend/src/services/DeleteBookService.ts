import prismaClient from "../prisma";

interface DeleteBookProps{
    id: string;
}

class DeleteBookService {
  async execute({ id }: DeleteBookProps){

    const findBook = await prismaClient.book.findUnique({
      where: { id }
    });

    if(!findBook){
      throw new Error('Livro não encontrado');
    }

    await prismaClient.book.delete({
      where: { id }
    });

    return { message: 'Livro deletado com sucesso' };
  }
}

export { DeleteBookService };