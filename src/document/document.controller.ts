import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { RolesGuard } from '../role/guard/roles.guard';
import { Roles } from '../role/guard/roles.decorator';
import { Permission } from '../session/entities/permission.enum';
import { Response } from 'express';
import * as path from 'node:path';
import * as fs from 'fs';
import { fileInterceptor } from './file.interceptors';
import { FindDocumentDto } from './dto/find-document.dto';

@UseGuards(RolesGuard)
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UseInterceptors(fileInterceptor)
  @Roles({ permission: Permission.DOC_NEW })
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }
    return this.documentService.create(
      req.session.organizationId,
      createDocumentDto,
      file.filename,
      req.session.subjectId,
      req.session.roleId,
    );
  }

  @Get()
  @Roles({ permission: Permission.DOC_ACL })
  findByOrganization(
    @Req() req: any,
    @Body() findDocumentDto: FindDocumentDto,
  ) {
    return this.documentService.findAll(
      req.session.organizationId,
      findDocumentDto,
    );
  }

  @Get('metadata/:documentName')
  @Roles({ permission: Permission.DOC_READ })
  getMetadata(@Param('documentName') documentName: string, @Req() req: any) {
    return this.documentService.getMetadata(
      documentName,
      req.session.organizationId,
    );
  }

  @Get('byName/:documentName')
  @Roles({ permission: Permission.DOC_READ })
  getDocumentByName(
    @Param('documentName') documentName: string,
    @Req() req: any,
  ) {
    return this.documentService.getDocumentByName(
      documentName,
      req.session.organizationId,
    );
  }

  @Get(':fileHandle')
  async findOne(@Param('fileHandle') fileHandle: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '..', '..', 'uploads', fileHandle);
    if (!fs.existsSync(filePath)) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'File not found' });
    }
    return res.sendFile(filePath);
  }

  @Patch(':documentId')
  @Roles({ permission: Permission.DOC_ACL })
  update(
    @Param('documentId') documentId: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(+documentId, updateDocumentDto);
  }

  @Delete(':documentId')
  @Roles({ permission: Permission.DOC_DELETE })
  remove(@Param('documentId') documentId: string) {
    return this.documentService.remove(+documentId);
  }
}
