
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { BadRequestException } from '@nestjs/common';

export const multerOptions = {
  storage: diskStorage({ // Use 'storage' instead of 'Storage'
    destination: (req, file, cb) => {
      const uploadDir = './uploads'; // Folder to save uploaded files
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true }); // Create the folder if it doesn't exist
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0];
      const extension = extname(file.originalname);
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');

      cb(null, `${name}-${randomName}${extension}`); // Generate a unique filename
    },
  }),

  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|svg\+xml)$/)) {
      cb(null, true); // Allow only specific file types
    } else {
 
      cb(new BadRequestException('Unsupported file type'), false);
    }
  },
};

 
export const multerOptionsPdf = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = './uploads';
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });  
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0];
      const extension = extname(file.originalname);
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');

      cb(null, `${randomName}${extension}`);
    },
  }),

  fileFilter: (req, file, cb) => {
      cb(null, true); 
  },
};
