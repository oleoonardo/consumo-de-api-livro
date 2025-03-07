// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookCard from "@/components/BookCard";

interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
  createdAt?: string;
  updateAt?: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/books");
      if (!response.ok) {
        throw new Error("Falha ao buscar livros");
      }
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Coleção de Livros</h1>
        <Link href="/books/new">
          <Button>Adicionar novo Livro</Button>
        </Link>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Busque livros pelo titulo..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-4">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <div className="p-4 flex justify-between">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
              </div>
            </Card>
          ))}
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              onUpdate={fetchBooks} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold text-gray-500">
            {searchTerm ? "Nenhum livro encontrado correspondendo à sua pesquisa" : "Nenhum livro em sua coleção ainda"}
          </h2>
          <p className="text-gray-400 mt-2">
            {searchTerm ? "Tente um termo de pesquisa diferente" : "Adicione seu primeiro livro para começar!"}
          </p>
          {!searchTerm && (
            <Link href="/books/new" className="mt-4 inline-block">
              <Button>Adicionar seu primeiro livro</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
