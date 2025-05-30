import { Module } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { EvaluationsController } from './evaluations.controller';
import { ProjectsService } from '../projects/projects.service';
import { UsersProjectsService } from '../users-projects/users-projects.service';
import { UsersService } from '../users/users.service';
import { FilesService } from '../files/files.service';
import { PeriodsService } from '../periods/periods.service';

@Module({
  controllers: [EvaluationsController],
  providers: [
    EvaluationsService,
    ProjectsService,
    UsersProjectsService,
    UsersService,
    FilesService,
    PeriodsService,
  ],
})
export class EvaluationsModule {}
