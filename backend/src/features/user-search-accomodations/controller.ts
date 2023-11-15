import "reflect-metadata";
import { inject, singleton } from "@triptyk/nfw-core";
import UserBookAccomodationCommand from "./command.js";
import {
  Controller,
  GET,
  POST,
  Query,
  UseResponseHandler,
} from "@triptyk/nfw-http";
import { UserSearchAccomodationValidationSchema } from "./validation-schema.js";
import promiseToResult from "../../utils/promise-to-result.js";
import { Maybe, Result } from "true-myth";
import ErrorHandlerResponseHandler from "../../response-handler/error-handler.response-handler.js";
import {
  JsonApiResourceSerializer,
} from "@triptyk/nfw-resources";

@Controller({
  routeName: "/accomodations",
})
@singleton()
@UseResponseHandler(ErrorHandlerResponseHandler)
export default class SearchAccomodationController {
  constructor(
    @inject(UserBookAccomodationCommand)
    private readonly command: UserBookAccomodationCommand,
    @inject(JsonApiResourceSerializer)
    private readonly serializer: JsonApiResourceSerializer
  ) {}

  @GET("/")
  async bookPlace(@Query() query: Record<string, unknown>): Promise<Result<unknown, Error>> {
    const validatedBody = await promiseToResult(
        UserSearchAccomodationValidationSchema.validate(
        query,
        {
          abortEarly: false,
        }
      )
    );

    if (validatedBody.isErr) {
      return validatedBody;
    }

    const result = await this.command.execute({
        page: validatedBody.value.page,
        size: validatedBody.value.size,
        q: Maybe.of(validatedBody.value.q),
    });

    return Result.ok(
      await this.serializer.serializeMany(
        result.map((accomodation) => ({
            ...accomodation,
            resourceType: "accomodation",
        })),
        {
            page: {
                size: validatedBody.value.size,
                number: validatedBody.value.page,
            },
        },
        {
          endpointURL: "accomodations",
        }
      )
    );
  }
}