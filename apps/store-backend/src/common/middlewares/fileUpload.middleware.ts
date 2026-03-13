import multer from "multer";
import path from "path";
import Environment from "@/configs/env";
import type { Request } from "express";

const imagesStorage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, path.join(Environment.get("ROOT_DIR") || process.cwd(), "images"));
    },
    filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

export const imagesUpload = multer({ storage: imagesStorage });

const iconStorage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, path.join(Environment.get("ROOT_DIR") || process.cwd(), "categoryIcons"));
    },
    filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

export const iconUpload = multer({
    storage: iconStorage,
    fileFilter: (_req, file, cb) => {
        const allowedExtensions = [".jpg", ".png", ".jpeg"];
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(fileExtension)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    },
});
