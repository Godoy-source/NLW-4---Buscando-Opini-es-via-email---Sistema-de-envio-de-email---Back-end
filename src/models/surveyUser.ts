import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { survey } from "./survey";
import { user } from "./user";
@Entity("surveys_users")
class SurveysUsers {
    @PrimaryColumn()
    readonly id: string;
    
    @Column()
    user_id: string;
    
    @ManyToOne(() => user)
    @JoinColumn({name: "user_id"})
    user: user;

    @Column()
    survey_id: string;

    @ManyToOne(() => survey)
    @JoinColumn({name: "survey_id"})
    survey: survey;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { SurveysUsers }