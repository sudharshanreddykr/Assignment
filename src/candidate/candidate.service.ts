import { Candidate } from './entities/candidate.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateInput } from './dto/create-candidate.input';
import { UpdateCandidateInput } from './dto/update-candidate.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {}

  async create(candidate: CreateCandidateInput) {
    let candi = this.candidateRepository.create(candidate);
    return this.candidateRepository.save(candi);
  }

  findAll(): Promise<Candidate[]> {
    return this.candidateRepository.find();
  }

  findOne(id: number) {
    return this.candidateRepository.findOne(id);
  }

  async update(id: number, updateCandidate: UpdateCandidateInput) {
    let candidate = this.candidateRepository.create(updateCandidate);
    let upd = await this.candidateRepository.update(
      { id: updateCandidate.id },
      candidate,
    );
    if (upd.affected === 1) {
      return candidate;
    }
  }

  async delete(id: number) {
    let employee = this.candidateRepository.findOne(id);
    if (!employee) {
      throw new NotFoundException(`Record Not Found`);
    }
    let del = await this.candidateRepository.delete(id);
    if (del.affected === 1) {
      return del;
    }
  }
}
