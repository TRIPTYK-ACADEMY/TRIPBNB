import { singleton, inject } from "@triptyk/nfw-core";
import { JsonApiResourceDeserializer, ResourcesRegistryImpl, type ResourcesRegistry } from "@triptyk/nfw-resources";
import type { AccomodationResource } from "./schema.js";


@singleton()
export class AccomodationResourceDeserializer extends JsonApiResourceDeserializer<AccomodationResource> {
  public constructor (
        @inject(ResourcesRegistryImpl) registry: ResourcesRegistry,
  ) {
    super('accomodation', registry);
  }
}
