import { container } from '@triptyk/nfw-core';
import type { ControllerParamsContext } from '@triptyk/nfw-http';
import { createCustomDecorator } from '@triptyk/nfw-http';
import type { ResourcesRegistry } from '@triptyk/nfw-resources';
import { ResourcesRegistryImpl } from '@triptyk/nfw-resources';

export interface Controller {
  registry: ResourcesRegistry,
}

function jsonApiBody(resourceName: string) {
  return async (controllerContext: ControllerParamsContext<unknown>) => {
    const body = await container.resolve(ResourcesRegistryImpl).getDeserializerFor(resourceName).deserialize(controllerContext.ctx.request.body);
    return body;
  };
}

export function JsonApiBody(resourceName: string) {
  return createCustomDecorator(jsonApiBody(resourceName), 'json-api-body');
}
