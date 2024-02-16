import { Request } from "express";

export class ModifiedRequestDto extends Request {
    user: Object;
}