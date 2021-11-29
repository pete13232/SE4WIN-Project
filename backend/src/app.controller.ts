import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';

export const storage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (_, file, cn) => {
      // console.log(file);
      const types = file.mimetype.split('/')[1];
      cn(null, uuidv4() + `.${types}`);
    },
  }),
};

@Controller()
export class AppController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return of({ imagePath: file.filename });
  }
}
