import { MikroORM, Reference } from "@mikro-orm/core";
import { inject, singleton } from "@triptyk/nfw-core";
import { Maybe } from "true-myth";
import type { Accomodation } from "../../database/models/accomodation.model.js";
import { UserSearchAccomodationRepository } from "./repository.js";

export interface UserSearchAccomodationsCommandInput {
  page: number;
  size: number;
  q: Maybe<string>;
}

export type UserSearchAccomodationOutput = Accomodation[];

@singleton()
export default class UserBookAccomodationCommand {
  public constructor(
    @inject(UserSearchAccomodationRepository)
    private readonly repository: UserSearchAccomodationRepository
  ) {}

  public async execute(
    params: UserSearchAccomodationsCommandInput
  ): Promise<UserSearchAccomodationOutput> {
    return this.repository.searchAccomodations(params);
  }
}
