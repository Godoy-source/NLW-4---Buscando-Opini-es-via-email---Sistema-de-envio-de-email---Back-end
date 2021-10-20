import { EntityRepository, Repository } from "typeorm";
import { survey } from "../models/survey";

@EntityRepository(survey)
class surveyRepository extends Repository<survey> {

}

export { surveyRepository };
