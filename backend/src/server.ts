import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ error: error.message });
});

const start = async () => {

    await app.register(cors, {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      });

    await app.register(routes);

    try {
        const port = process.env.PORT || "8080";
        await app.listen({ port: parseInt(port), host: '0.0.0.0' });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();