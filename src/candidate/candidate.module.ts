import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateResolver } from './candidate.resolver';
import { Candidate } from './entities/candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate])],
  providers: [CandidateResolver, CandidateService],
})
export class CandidateModule {}
