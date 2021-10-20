import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import createConnection from "./database";
import { AppError } from "./errors/AppError";
import { router } from "./routes";


createConnection();
const app = express();

/**
 * Metodos mais utilizados
 * GET - Busca
 * POST - Salvar
 * PUT - Altarar
 * DELETE - Deletar
 * PATCH - Alteração especifica
 */

/**
 * Metodo GET:
 * 1 parametro é a rota
 * 2 parametro é requisição e resposta.
 */
app.use(express.json());
app.use(router);
app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: "Error",
        message: "Erro interno no servidor"
    })
})

export { app }