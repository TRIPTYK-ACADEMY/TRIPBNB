import 'reflect-metadata';
import { container } from "@triptyk/nfw-core";
import { beforeAll, expect, it } from "vitest";
import { Application } from "../../src/application.js";

let application : Application;

beforeAll(async () => {
    application = container.resolve(Application);
    await application.setup();
    await application.listen();
    return () => application.stop();
});

it("It returns an array of error if validation fails", async () => {
    const response = await fetch('http://localhost:3000/api/v1/accomodation/book-accomodation', {
        method: 'POST',
        body: JSON.stringify({
            attributes: {
                guests: [],
                accomodationId: "1",
            }
        })
    }).then((response) => response.json());

    expect(response).toMatchInlineSnapshot({}, `
      {
        "errors": [
          {
            "status": "400",
            "title": "accomodationId is a required field",
          },
          {
            "status": "400",
            "title": "user.firstName is a required field",
          },
          {
            "status": "400",
            "title": "user.lastName is a required field",
          },
          {
            "status": "400",
            "title": "user.email is a required field",
          },
          {
            "status": "400",
            "title": "user.address.street is a required field",
          },
          {
            "status": "400",
            "title": "user.address.city is a required field",
          },
          {
            "status": "400",
            "title": "user.address.country is a required field",
          },
          {
            "status": "400",
            "title": "user.address.zipCode is a required field",
          },
          {
            "status": "400",
            "title": "user.address.number is a required field",
          },
          {
            "status": "400",
            "title": "bookingRange is a required field",
          },
          {
            "status": "400",
            "title": "guests is a required field",
          },
        ],
      }
    `);
});

it("It returns a booking ressource on success", async () => {
    const response = await fetch('http://localhost:3000/api/v1/accomodation/book-accomodation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: "booking",
            attributes: {
                user: {
                    firstName: "John",
                    lastName: "Doe",
                    email: "a@john.com",
                    address: {
                        number: "a",
                        street: "a",
                        city: "a",
                        country: "a",
                        zipCode: "a",
                    },
                },
                bookingRange: [new Date(), new Date()],
                guests: [],
            },
            relationships: {
                accomodation: {
                    data: {
                        id: "1",
                        type: "accomodation",
                    }
                }
            }
          }
        })
    }).then((response) => response.json());

    expect(response).toMatchInlineSnapshot({
      data: {
        id: expect.any(String),
        attributes: {
          end: expect.any(String),
          guests: [],
          start: expect.any(String),
          user: expect.any(Object),
        },
        links: expect.any(Object),
      }
    }, `
      {
        "data": {
          "attributes": {
            "end": Any<String>,
            "guests": [],
            "start": Any<String>,
            "user": Any<Object>,
          },
          "id": Any<String>,
          "links": Any<Object>,
          "type": "booking",
        },
        "jsonapi": {
          "version": "1.0",
        },
        "links": {
          "self": "/api/v1/accomodation/book-place",
        },
      }
    `);
});