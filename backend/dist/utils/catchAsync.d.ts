import type { NextFunction, Request, Response } from "express";
export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const catchAsync: (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => void;
