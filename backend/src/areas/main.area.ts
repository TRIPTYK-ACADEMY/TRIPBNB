import { Controller } from "@triptyk/nfw-http";
import UserBookAccomodationController from "../features/user-book-accomodation/controller.js";
import SearchAccomodationController from "../features/user-search-accomodations/controller.js";

@Controller({
    routeName: '/api/v1',
    controllers: [UserBookAccomodationController, SearchAccomodationController]
})
export default class MainAreaController {
    
}