import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { surveyRepository } from "../repositories/surveyRepository";
import { SurveysUsersRepository } from "../repositories/surveysUrversRepository";
import { usersRepository } from "../repositories/usersRepository";
import SendMailService from "../services/sendMail.service";
import { resolve } from 'path';

class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersR = getCustomRepository(usersRepository);
        const surveysR = getCustomRepository(surveyRepository);
        const surveysUsersR = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await usersR.findOne({ email });
        
        if(!userAlreadyExists) {
            return response.status(400).json({
                error: "Usuario não encontrado."
            });
        }
        
        const survey = await surveysR.findOne({ id: survey_id });

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        if (!survey) {
            return response.status(400).json({
                error: "Pesquisa não encontrada."
            });
        }

        const pesquisa = await surveysUsersR.findOne({
            where: {user_id: userAlreadyExists.id, value: null},
            relations: ["user", "survey"],
        });

        const variables = {
            name: userAlreadyExists.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }


        if (pesquisa) {
            variables.id = pesquisa.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(pesquisa);
        }
        // Salvar informações do dataBase

        const surveyUser = surveysUsersR.create({
            user_id: userAlreadyExists.id,
            survey_id
        });

        

        await surveysUsersR.save(surveyUser);
        variables.id = surveyUser.id;
        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);
        // Enviar email 


    }
}

export { SendMailController }