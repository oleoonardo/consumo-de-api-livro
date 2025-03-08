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
exports.ListTitleBookService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ListTitleBookService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title }) {
            if (!title) {
                throw new Error('Título do livro não fornecido');
            }
            const book = yield prisma_1.default.book.findMany({
                where: {
                    title: title
                }
            });
            if (!book) {
                throw new Error('Livro não encontrado');
            }
            return book;
        });
    }
}
exports.ListTitleBookService = ListTitleBookService;
