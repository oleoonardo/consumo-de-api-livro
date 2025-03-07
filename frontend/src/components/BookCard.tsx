"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
  createdAt?: string;
  updateAt?: string;
}

interface BookCardProps {
  book: Book;
  onUpdate: () => void;
}

export default function BookCard({ book, onUpdate }: BookCardProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:8080/book/${book.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Falha ao excluir o livro");
      }
      
      onUpdate();
    } catch (error) {

    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl line-clamp-2">{book.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-2 flex-grow">
          <p className="text-gray-600 font-medium">{book.author}</p>
          <p className="text-gray-500 text-sm">Ano de Publicação: {book.publishedYear}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-2 border-t">
          <Link href={`/books/${book.id}/edit`}>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Deletar
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você realmente deseja deletar?</AlertDialogTitle>
            <AlertDialogDescription>
              O seguinte livro: "{book.title}" vai ser deletado permantemente da sua coleção.
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Deletando..." : "Deletar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}