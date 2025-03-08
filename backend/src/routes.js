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
exports.routes = routes;
const CreateBookController_1 = require("./controllers/CreateBookController");
const ListBookController_1 = require("./controllers/ListBookController");
const DeleteBookController_1 = require("./controllers/DeleteBookController");
const ListTitleBookController_1 = require("./controllers/ListTitleBookController");
const UpdateBookController_1 = require("./controllers/UpdateBookController");
const GetBookController_1 = require("./controllers/GetBookController");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/teste", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return { hello: "world" };
        }));
        // Criar livro
        fastify.post("/book", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new CreateBookController_1.CreateBookController().handle(request, reply);
        }));
        // Listar todos os livros
        fastify.get("/books", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListBookController_1.ListBookController().handle(request, reply);
        }));
        // Buscar um livro específico por ID
        fastify.get("/book/:id", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new GetBookController_1.GetBookController().handle(request, reply);
        }));
        // Excluir um livro
        fastify.delete("/book/:id", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new DeleteBookController_1.DeleteBookController().handle(request, reply);
        }));
        // Buscar livros por título
        fastify.get("/book/search", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListTitleBookController_1.ListTitleBookController().handle(request, reply);
        }));
        // Atualizar um livro
        fastify.put("/book/:id", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new UpdateBookController_1.UpdateBookController().handle(request, reply);
        }));
    });
}
;
