import { number, object, string } from "yup";

export const UserSearchAccomodationValidationSchema = object({
    page: number().required(),
    size: number().required(),
    q: string().optional(),
});