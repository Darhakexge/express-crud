import { NextFunction, Request, Response } from 'express';
import HttpException from 'src/common/exceptions/http.exception';

export default function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) {
    const status = error.status;
    const message = error.message || 'Someting went wrong';

    res.status(status).send({
        status,
        message,
    });
}
