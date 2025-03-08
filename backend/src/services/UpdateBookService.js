"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class UpdateBookService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, title, author, publishedYear }) {
            if (!title || !author || !id) {
                throw new Error('Campos obrigatórios ausentes: título, autor ou id');
            }
            // Verifique se o livro existe
            const bookExists = yield prisma_1.default.book.findUnique({
                where: { id },
            });
            if (!bookExists) {
                throw new Error('Livro não encontrado');
            }
            // Prepare data for update
            const data = {
                title,
                author
            };
            // Add publishedYear if provided
            if (publishedYear !== undefined) {
                data.publishedYear = publishedYear;
            }
            // Atualiza o livro
            const updatedBook = yield prisma_1.default.book.update({
                where: { id },
                data
            });
            return { message: 'Livro atualizado com sucesso', book: updatedBook };
        });
    }
}
exports.UpdateBookService = UpdateBookService;
