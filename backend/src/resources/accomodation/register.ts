import { JsonApiResourceDeserializer, JsonApiResourceSerializer, type ResourcesRegistryImpl } from "@triptyk/nfw-resources";
import { accomodationResourceSchema, type AccomodationResource } from "./schema.js";
import { AccomodationResourceDeserializer } from "./deserializer.js";

export function registerAccomodationToRegistry(registry: ResourcesRegistryImpl) {
    registry.register<AccomodationResource>('accomodation', {
        serializer: JsonApiResourceSerializer,
        deserializer: AccomodationResourceDeserializer,
        schema: accomodationResourceSchema
    });
}