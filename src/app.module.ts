import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal:true}),DatabaseModule, UsersModule, ProjectsModule, TeamsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
