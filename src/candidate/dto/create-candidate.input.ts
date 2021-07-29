import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCandidateInput {
  @Field()
  name: string;

  @Field()
  dob: string;

  @Field()
  email: string;
  
  @Field()
  age: number;
}
