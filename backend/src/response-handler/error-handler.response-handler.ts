import type { RouterContext } from "@koa/router";
import { singleton } from "@triptyk/nfw-core";
import { Ctx, type ResponseHandlerInterface } from "@triptyk/nfw-http";
import { Result } from "true-myth";
import { isErr } from "true-myth/result";
import { ValidationError } from "yup";

@singleton()
export default class ErrorHandlerResponseHandler implements ResponseHandlerInterface {
    handle(lastResult: Result<unknown, Error>, @Ctx() ctx: RouterContext): void {
        if (isErr(lastResult)) {
            const unwrapped = lastResult.error;
            console.log(lastResult.error);
            if (unwrapped instanceof ValidationError) {
                ctx.status = 400;
                ctx.body = {
                    errors: unwrapped.inner.map(err => ({
                        status: "400",
                        title: err.message
                    }))
                };
                return;
            }
            ctx.status = 500;
            throw lastResult.error;
        }
        
        ctx.body = lastResult.value;
    }
}