import "reflect-metadata";
import { inject, singleton } from "@triptyk/nfw-core";
import UserBookAccomodationCommand from "./command.js";
import {
  Controller,
  Ctx,
  GET,
  POST,
  UseResponseHandler,
} from "@triptyk/nfw-http";
import type { RouterContext } from "@koa/router";
import UserBookPlaceCommandInputSchema from "./validation-schema.js";
import promiseToResult from "../../utils/promise-to-result.js";
import { Result } from "true-myth";
import ErrorHandlerResponseHandler from "../../response-handler/error-handler.response-handler.js";
import {
  JsonApiResourceDeserializer,
  JsonApiResourceSerializer,
} from "@triptyk/nfw-resources";
import { JsonApiBody } from "../../decorators/json-api-body.js";
import type { BookingResource } from "../../resources/booking/schema.js";

@Controller({
  routeName: "/accomodation",
})
@singleton()
@UseResponseHandler(ErrorHandlerResponseHandler)
export default class UserBookAccomodationController {
  constructor(
    @inject(UserBookAccomodationCommand)
    private readonly command: UserBookAccomodationCommand,
    @inject(JsonApiResourceSerializer)
    private readonly serializer: JsonApiResourceSerializer
  ) {}

  @POST("/book-place")
  async bookPlace(
    @JsonApiBody("booking") body: BookingResource
  ): Promise<Result<unknown, Error>> {
    const validatedBody = await promiseToResult(
      UserBookPlaceCommandInputSchema.validate(
        {
          ...body,
          accomodationId: body.accomodation,
        },
        {
          abortEarly: false,
        }
      )
    );

    if (validatedBody.isErr) {
      return validatedBody;
    }

    const result = await this.command.execute(validatedBody.value);

    if (result.isErr) {
      return result;
    }

    return Result.ok(
      await this.serializer.serializeOne(
        { ...result.value, resourceType: "booking" },
        {},
        {
          endpointURL: "accomodation/book-place",
        }
      )
    );
  }
}

if (import.meta.vitest) {
  const { it, expect, vi } = import.meta.vitest;

  it("Returns error if validation fails", async () => {
    const mockedCommand = {
      execute: vi.fn(),
    };

    const controller = new UserBookAccomodationController(
      mockedCommand as never,
      {
        serializeOne: vi.fn(),
      } as never
    );

    const result = await controller.bookPlace({
      accomodation: "123",
      bookingRange: ["2021-01-01", "2021-01-02"],
      guests: 2,
      user: "123",
    } as never);

    expect(result.isErr).toBe(true);
    const error = result.isErr ? result.error : new Error();
    expect(error.message).toMatchInlineSnapshot('"2 errors occurred"');
  });

  it("Returns error if it fails to save", async () => {
    const mockedCommand = {
      execute: vi
        .fn()
        .mockReturnValue(
          Promise.resolve(Result.err(new Error("Failed to save")))
        ),
    };

    const controller = new UserBookAccomodationController(
      mockedCommand as never,
        {
            serializeOne: vi.fn(),
        } as never
    );

    const result = await controller.bookPlace({
      accomodation: "123",
      bookingRange: ["2021-01-01", "2021-01-02"],
      guests: [],
      user: {
        id: "123",
        email: "a@gmail.com",
        firstName: "John",
        lastName: "Doe",
        address: {
          street: "1",
          city: "1",
          number: "1",
          country: "1",
          zipCode: "1",
        },
      },
    } as never);

    expect(result.isErr).toBe(true);
    const error = result.isErr ? result.error : new Error();
    expect(error.message).toBe("Failed to save");
  });
}
