import 'reflect-metadata';
import { container } from "@triptyk/nfw-core";
import { Application } from "../../src/application.js";
import { beforeAll, expect, it } from "vitest";

let application : Application;

beforeAll(async () => {
    application = container.resolve(Application);
    await application.setup();
    await application.listen();
    return () => application.stop();
});


it("It returns an array of error if validation fails", async () => {
    const response = await fetch('http://localhost:3000/api/v1/accomodations?page=1&size=5', {
        method: 'GET',
    }).then((response) => response.json());


    expect(response).toMatchInlineSnapshot({}, `
      {
        "data": [
          {
            "attributes": {
              "address": {
                "city": "test",
                "country": "test",
                "street": "test",
                "zipCode": "test",
              },
              "bookings": [],
              "imgUrl": "test",
              "maxGuests": 1,
              "name": "test",
              "price": 1,
              "tags": [
                "test",
              ],
            },
            "id": "1",
            "links": {
              "self": "/api/v1/accomodation/1",
            },
            "type": "accomodation",
          },
        ],
        "jsonapi": {
          "version": "1.0",
        },
        "links": {
          "self": "/api/v1/accomodations",
        },
      }
    `);
});