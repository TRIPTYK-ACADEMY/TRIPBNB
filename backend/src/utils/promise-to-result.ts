import { Result } from "true-myth";

export default function promiseToResult<T>(promise: Promise<T>): Promise<Result<T, Error>> {
  return promise
    .then((result) => Result.ok<T, Error>(result))
    .catch((error) => {
      if (error instanceof Error) {
        return Result.err(error);
      } else {
        return Result.err(new Error(error));
      }
    });
}
