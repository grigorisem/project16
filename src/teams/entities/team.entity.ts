import { AbstractEntity } from "src/abstractions/abstract.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team extends AbstractEntity<Project> {

    @Column()
    name:string

    @OneToOne(() => Project, (project) => project.team) 
    project: Project

}
