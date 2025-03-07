import prismaClient from "../prisma";

interface UpdateBookProps {
  id: string;
  title: string;
  author: string;
  publishedYear?: number;
}

class UpdateBookService {
  async execute({ id, title, author, publishedYear }: UpdateBookProps) {
    if (!title || !author || !id) {
      throw new Error('Campos obrigatórios ausentes: título, autor ou id');
    }

    // Verifique se o livro existe
    const bookExists = await prismaClient.book.findUnique({
      where: { id },
    });

    if (!bookExists) {
      throw new Error('Livro não encontrado');
    }

    // Prepare data for update
    const data: any = { 
      title, 
      author 
    };

    // Add publishedYear if provided
    if (publishedYear !== undefined) {
      data.publishedYear = publishedYear;
    }

    // Atualiza o livro
    const updatedBook = await prismaClient.book.update({
      where: { id },
      data
    });

    return { message: 'Livro atualizado com sucesso', book: updatedBook };
  }
}

export { UpdateBookService };