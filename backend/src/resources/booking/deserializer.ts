import { singleton, inject } from "@triptyk/nfw-core";
import { JsonApiResourceDeserializer, ResourcesRegistryImpl, type ResourcesRegistry } from "@triptyk/nfw-resources";
import type { BookingResource } from "./schema.js";

@singleton()
export class BookingResourceDeserializer extends JsonApiResourceDeserializer<BookingResource> {
  public constructor (
        @inject(ResourcesRegistryImpl) registry: ResourcesRegistry,
  ) {
    super('booking', registry);
  }
}
