import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { usersRepository as usersRepositoryClass} from '../repositories/usersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
    async create(request: Request, response: Response) {
        const {name, email} = request.body;
        
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
        });

        if (!(await schema.isValid(request.body))) {
            throw new AppError("Erro na validação.");
            // return response.status(400).json({
            //     error: "Erro na validação."
            // });
        }

        const usersRepository = getCustomRepository(usersRepositoryClass);

        const userAlreadyExists = await usersRepository.findOne({ 
            email 
        });

        if (userAlreadyExists) {
            throw new AppError("Email já utilizado.");
            // return response.status(400).json({
            //     error: "Email já utilizado."
            // });
        }
        
        const user = usersRepository.create({
            name, email
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
} 

export { UserController };
