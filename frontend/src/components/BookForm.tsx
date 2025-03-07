// components/BookForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

interface Book {
  id?: string;
  title: string;
  author: string;
  publishedYear: number;
}

interface BookFormProps {
  initialData?: Book;
  isEditing?: boolean;
  bookId?: string;
}

export default function BookForm({ initialData, isEditing = false, bookId }: BookFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Book>(
    initialData || {
      title: "",
      author: "",
      publishedYear: new Date().getFullYear(),
    }
  );
  const [isLoading, setIsLoading] = useState(isEditing && !initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  // Fetch book data if we're editing and don't have initialData
  useEffect(() => {
    const fetchBookData = async () => {
      if (isEditing && bookId && !initialData) {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:8080/book/${bookId}`);
          if (!response.ok) {
            throw new Error("Falha ao buscar detalhes do livro");
          }
          const bookData = await response.json();
          setFormData(bookData);
        } catch (error) {

          setApiError("Falha ao carregar detalhes do livro. Tente novamente.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBookData();
  }, [isEditing, bookId, initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório";
    }
    
    if (!formData.author.trim()) {
      newErrors.author = "Autor é obrigatório";
    }
    
    if (!formData.publishedYear) {
      newErrors.publishedYear = "Ano de publicação é obrigatório";
    } else if (
      formData.publishedYear < 1000 || 
      formData.publishedYear > new Date().getFullYear() + 5
    ) {
      newErrors.publishedYear = "Por favor, insira um ano válido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setApiError("");
    
    try {
      const url = isEditing 
        ? `http://localhost:8080/book/${bookId || formData.id}`
        : "http://localhost:8080/book";
        
      const method = isEditing ? "PUT" : "POST";
      
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Falha ao ${isEditing ? "atualizar" : "criar"} livro`
        );
      }
      
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(`Erro ao ${isEditing ? "atualizar" : "criar"} livro:`, error);
      setApiError(
        error instanceof Error
          ? error.message
          : `Falha ao ${isEditing ? "atualizar" : "criar"} livro. Tente novamente.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "publishedYear" ? parseInt(value) || "" : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <p>Carregando livros...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar aos livros
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Editar Livro" : "Adicionar novo Livro"}</CardTitle>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {apiError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="title">Titulo</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Autor</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={errors.author ? "border-red-500" : ""}
              />
              {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="publishedYear">Ano de Publicação</Label>
              <Input
                id="publishedYear"
                name="publishedYear"
                type="number"
                value={formData.publishedYear}
                onChange={handleChange}
                className={errors.publishedYear ? "border-red-500" : ""}
                min="1000"
                max={new Date().getFullYear() + 5}
              />
              {errors.publishedYear && <p className="text-red-500 text-sm">{errors.publishedYear}</p>}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? (isEditing ? "Atualizando..." : "Criando...") 
                : (isEditing ? "Atualizar Livro" : "Adicionar Livro")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}