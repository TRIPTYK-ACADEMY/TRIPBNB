import { Controller } from "@triptyk/nfw-http";
import UserBookAccomodationController from "../features/user-book-accomodation/controller.js";

@Controller({
    routeName: '/api/v1',
    controllers: [UserBookAccomodationController]
})
export default class MainAreaController {
    
}