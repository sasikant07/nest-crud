import { IsEmpty, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';

export class CreatePostDto {
  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user_id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  @IsFile()
  @MaxFileSize(1e6, { message: 'File size exceeded 1mb' })
  @HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/*'])
  image: FileSystemStoredFile;
}
