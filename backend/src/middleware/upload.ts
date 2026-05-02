import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { MAX_FILE_SIZE_BYTES } from "../lib/cloudinary";

const MAX_SIZE_LABEL = `${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB`;

const PROFILE_PIC_MAX_BYTES = 1 * 1024 * 1024; // 1 MB
const PROFILE_PIC_SIZE_LABEL = "1MB";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const PDF_TYPE = "application/pdf";

const fileFilter = (allowed: string[]) => {
  return (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed: ${allowed.join(", ")}`));
    }
  };
};

const memoryStorage = multer.memoryStorage();

export const profilePicUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: PROFILE_PIC_MAX_BYTES },
  fileFilter: fileFilter(IMAGE_TYPES),
});

export const imageUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: fileFilter(IMAGE_TYPES),
});

export const pdfUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: fileFilter([PDF_TYPE]),
});

export const documentUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: fileFilter([PDF_TYPE, ...IMAGE_TYPES]),
});

/**
 * Route-level error handler to translate Multer errors into clean JSON
 * responses — especially the file size limit.
 */
export const handleUploadError = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      // Distinguish profile pic (1MB) from general (2MB) based on the limit that fired
      const label = (err as multer.MulterError & { limit?: number }).limit === PROFILE_PIC_MAX_BYTES
        ? PROFILE_PIC_SIZE_LABEL
        : MAX_SIZE_LABEL;
      return res.status(413).json({
        message: `File is too large. Maximum allowed size is ${label}.`,
      });
    }
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }
  return next(err);
};
