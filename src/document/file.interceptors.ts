import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as crypto from 'crypto';
import { extname } from 'path';
import * as path from 'path';
import fs from 'fs/promises';

export const fileInterceptor = FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const hash = crypto.createHash('sha256');
      hash.update(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      hash.update(uniqueSuffix);
      const hashedFileName = hash.digest('hex').substring(0, 64);
      const filename = `${hashedFileName}${extname(file.originalname)}`;
      cb(null, filename);
    },
  }),
});

export async function tryDeleteFile(
  promiseObj: Promise<{ file?: string }>,
): Promise<boolean> {
  try {
    const obj = await promiseObj;
    if (obj.file) {
      const filePath = path.join('./uploads', obj.file);
      await fs.unlink(filePath);
      return true;
    }
  } catch (error) {
    console.error('Error at deleting the file:', error);
  }
  return false;
}
