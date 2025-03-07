"use client";

import { useEffect, useState, use } from "react";
import BookForm from "@/components/BookForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}

export default function EditBookPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Handle both Promise and direct object access
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const bookId = unwrappedParams.id;
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detailedError, setDetailedError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      if (!bookId) {
        setError("Nenhum ID de livro fornecido");
        setLoading(false);
        return;
      }
      
      
      try {
        // Log the URL we're fetching from for debugging
        const url = `http://localhost:8080/book/${bookId}`;

        
        const response = await fetch(url);

        
        if (!response.ok) {
          const errorText = await response.text().catch(() => "");

          throw new Error(`O servidor respondeu com status ${response.status}`);
        }
        
        const data = await response.json();

        
        if (!data || !data.id) {
          throw new Error("Dados de livro inválidos recebidos");
        }
        
        setBook(data);
      } catch (error) {

        setError("Não foi possível carregar o livro. Tente novamente.");
        
        if (error instanceof Error) {
          setDetailedError(error.message);
        } else {
          setDetailedError("Ocorreu um erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Editar Livro</h1>
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="space-y-4 border rounded-lg p-6">
            <Skeleton className="h-8 w-full mb-6" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-8" />
            <div className="flex justify-between">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Editar Livro</h1>
        <div className="max-w-md mx-auto">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          
          {detailedError && (
            <div className="p-4 border rounded-lg bg-gray-50 text-gray-700 text-sm mt-4">
              <p className="font-semibold">Detalhe do Erro:</p>
              <p className="font-mono mt-1">{detailedError}</p>
              <p className="mt-2">Id Livro: {bookId || "None"}</p>
            </div>
          )}
          
          <div className="mt-6 flex justify-center">
            <a 
              href="/"
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Retornar à lista de livros
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Editar Livro</h1>
        <div className="max-w-md mx-auto">
          <div className="p-6 border rounded-lg bg-yellow-50 text-yellow-700 text-center">
            <p>Não há dados de livros disponíveis.</p>
            <a 
              href="/"
              className="inline-block mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Retornar à lista de livros
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Editar Livro</h1>
      <BookForm initialData={book} isEditing={true} bookId={bookId} />
    </div>
  );
}