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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookController = void 0;
const UpdateBookService_1 = require("../services/UpdateBookService");
class UpdateBookController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { title, author, publishedYear } = request.body;
            if (!id) {
                return reply.status(400).send({ error: "ID do livro é obrigatório" });
            }
            try {
                const updateBookService = new UpdateBookService_1.UpdateBookService();
                const book = yield updateBookService.execute({
                    id,
                    title,
                    author,
                    publishedYear
                });
                return reply.send(book);
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === "Livro não encontrado") {
                        return reply.status(404).send({ error: error.message });
                    }
                    if (error.message.includes("Campos obrigatórios ausentes")) {
                        return reply.status(400).send({ error: error.message });
                    }
                }
                return reply.status(500).send({ error: "Erro interno do servidor" });
            }
        });
    }
}
exports.UpdateBookController = UpdateBookController;
