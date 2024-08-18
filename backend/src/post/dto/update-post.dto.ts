import { IsEmpty, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';

export class UpdatePostDto {
    @IsNotEmpty()
    readonly title: string;
  
    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly old_image: string;
  
    readonly new_image: FileSystemStoredFile;
}
