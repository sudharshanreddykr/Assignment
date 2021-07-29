import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CandidateService } from './candidate.service';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Resolver(() => Candidate)
export class CandidateResolver {
  constructor(private readonly candidateService: CandidateService) {}
  private logger = new Logger('AppController');

  @MessagePattern(() => Candidate)
  createCandidate(
    createCandidateInput: CreateCandidateInput,
  ) {
    this.logger.log(createCandidateInput); // Log something on every call
    return this.candidateService.create(createCandidateInput);
  }

  @MessagePattern(() => [Candidate])
  findAll() {
    return this.candidateService.findAll();
  }

  @MessagePattern(() => Candidate)
  findOne(id: string) {
    return this.candidateService.findOne(id);
  }

  @MessagePattern(() => Candidate)
  updateCandidate(
     updateCandidateInput: UpdateCandidateInput,
  ) {
    this.logger.log(updateCandidateInput.id, updateCandidateInput);
    return this.candidateService.update(
      updateCandidateInput.id,
      updateCandidateInput,
    );
  }

  @MessagePattern(() => Candidate)
  removeCandidate( id: string) {
    this.logger.log(Candidate);
    return this.candidateService.remove(id);
  }
}
