"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSearchResults = async () => {
    if (!initialQuery.trim()) {
      setBooks([]);
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      // Using search by title endpoint
      const response = await fetch(`http://localhost:8080/books/search?title=${encodeURIComponent(initialQuery)}`);
      
      if (!response.ok) {
        throw new Error("Falha ao pesquisar livros");
      }
      
      const data = await response.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao pesquisar livros:", error);
      setError("Falha ao pesquisar livros. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para livros
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Pesquisar livros</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search books by title..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Pesquisar</Button>
        </div>
      </form>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="bg-red-50">
          <CardContent className="text-red-600 p-6 text-center">
            {error}
          </CardContent>
        </Card>
      ) : initialQuery && books.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-600">Nenhum livro conrrespondente encontrado "{initialQuery}"</h2>
            <p className="text-gray-500 mt-2">Tente outro termo de pesquisa ou adicione um novo livro</p>
          </CardContent>
        </Card>
      ) : initialQuery ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Resultados de "{initialQuery}"</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onUpdate={fetchSearchResults} 
              />
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <CardTitle className="mb-2">Insira um termo de pesquisa</CardTitle>
            <p className="text-gray-500">Pesquisar livros por título</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}