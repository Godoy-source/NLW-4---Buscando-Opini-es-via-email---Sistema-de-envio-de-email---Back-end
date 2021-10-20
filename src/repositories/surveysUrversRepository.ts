import { EntityRepository, Repository } from 'typeorm';
import { SurveysUsers } from "../models/surveyUser"

@EntityRepository(SurveysUsers)
class SurveysUsersRepository extends Repository<SurveysUsers> {}

export { SurveysUsersRepository }