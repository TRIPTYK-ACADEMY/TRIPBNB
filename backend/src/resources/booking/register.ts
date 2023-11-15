import { JsonApiResourceDeserializer, JsonApiResourceSerializer, type ResourcesRegistryImpl } from "@triptyk/nfw-resources";
import { bookingResourceSchema, type BookingResource } from "./schema.js";
import { BookingResourceDeserializer } from "./deserializer.js";

export function registerBookingToRegistry(registry: ResourcesRegistryImpl) {
    registry.register<BookingResource>('booking', {
        serializer: JsonApiResourceSerializer,
        deserializer: BookingResourceDeserializer,
        schema: bookingResourceSchema
    });
}