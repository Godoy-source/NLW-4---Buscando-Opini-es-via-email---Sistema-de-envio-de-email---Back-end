import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/surveysUrversRepository";

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;
    const surveysUsersR = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersR.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      return response.status(400).json({
        error: "Pesquisa não existe.",
      });
    }

    surveyUser.value = Number(value);

    await surveysUsersR.save(surveyUser);
    return response.json(surveyUser);
  }
}

export { AnswerController };
