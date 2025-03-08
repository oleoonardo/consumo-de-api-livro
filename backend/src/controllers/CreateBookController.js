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
exports.CreateBookController = void 0;
const CreateBookService_1 = require("../services/CreateBookService");
class CreateBookController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, publishedYear } = request.body;
            const bookService = new CreateBookService_1.CreateBookService();
            const book = yield bookService.execute({ title, author, publishedYear });
            reply.send(book);
        });
    }
}
exports.CreateBookController = CreateBookController;
