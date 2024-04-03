import { AbstractEntity } from "src/abstractions/abstract.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Task } from "./task.entity";
import { Team } from "src/teams/entities/team.entity";

@Entity()
export class Project extends AbstractEntity<Project> {
    @Column()
    name:string

    @ManyToMany(() => User, (users) => users.projects)
    users: User[]

    @OneToMany(() => Task, (tasks) => tasks.project)
    @JoinTable()
    tasks: Task[]

    @OneToOne(() => Team, (team) => team.project) 
    team: Team
}
