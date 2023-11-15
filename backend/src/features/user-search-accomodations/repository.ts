import { EntityRepository, MikroORM } from "@mikro-orm/postgresql";
import { inject, singleton } from "@triptyk/nfw-core";
import type { Accomodation } from "../../database/models/accomodation.model.js";
import type { Maybe } from "true-myth";

interface SearchAccomodationsParams {
   page: number;
   size: number;
   q: Maybe<string>;
}

@singleton()
export class UserSearchAccomodationRepository {
    private readonly accomodationRepository: EntityRepository<Accomodation>;

    public constructor(
      @inject(MikroORM) private readonly orm: MikroORM
    ) {
      this.accomodationRepository = this.orm.em.getRepository<Accomodation>('Accomodation');
    }

    public async searchAccomodations(params: SearchAccomodationsParams): Promise<Accomodation[]> {
      const options : Record<string, unknown> = {
        
      };

      if (params.q.isJust) {
        options['name'] = {
          $ilike: params.q.value,
        }
      }

      const accomodations = await this.accomodationRepository.find(options);
      
      return accomodations;
    }
}