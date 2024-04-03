import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { GetTeamsFilterDto } from './dto/get-teams-filter.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ){}

  async create(createTeamDto: CreateTeamDto) {
    const team = new Team(createTeamDto)
    await this.teamRepository.save(team)

    return 'Created new team';
  }

  async findAll(filters: GetTeamsFilterDto) {
    let where:FindOptionsWhere<Team> = {}

    if(filters.projectID){
      where = {...where, project: { id:filters.projectID}}
    }
    return this.teamRepository.find({where});
  }

  async findOne(id: string) {
    return this.teamRepository.findOne({
      where: {id},
      relations: {
        project: true
      }
    });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const team = new Team(updateTeamDto)
    if (!team) {
      throw new Error(`Team with id ${id} not found`);
    }
  
    if (updateTeamDto.projectID) {
      const project = await this.projectRepository.findOne({
        where: { id: updateTeamDto.projectID }
      });
  
      if (!project) {
        throw new Error(`Project with id ${updateTeamDto.projectID} not found`);
      }
  
      team.project = project;
    }  
    await this.teamRepository.save(team);
    return `Team with id ${id} updated`;
  }

  async remove(id: string) {
    await this.projectRepository.delete({id})
    return `Team removed`; 
  }
}
