"use client";

import BookForm from "@/components/BookForm";

export default function AddBookPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Adicionar novo Livro</h1>
      <BookForm />
    </div>
  );
}