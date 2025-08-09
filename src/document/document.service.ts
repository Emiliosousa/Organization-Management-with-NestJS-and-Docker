import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { FindDocumentDto } from './dto/find-document.dto';
import { tryDeleteFile } from './file.interceptors';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}
  create(
    organizationId: number,
    createDocumentDto: CreateDocumentDto,
    fileName: string,
    creatorId: number,
    roleId: number,
  ) {
    return this.documentRepository.save({
      ...createDocumentDto,
      organizationId,
      name: createDocumentDto.name,
      filename: fileName,
      creatorId,
      roleId,
    });
  }

  /**
   * Find all documents, optionally filtering by creatorId and createdAt, newerThan, olderThan
   * @param organizationId
   * @param findDocumentDto
   */
  async findAll(organizationId: number, findDocumentDto: FindDocumentDto) {
    // Process the query parameters
    let createdAtQuery = undefined;
    if (findDocumentDto.newerThan && findDocumentDto.olderThan) {
      createdAtQuery = {
        ...MoreThan(findDocumentDto.newerThan),
        ...LessThan(findDocumentDto.olderThan),
      };
    } else if (findDocumentDto.newerThan) {
      createdAtQuery = MoreThan(findDocumentDto.newerThan);
    } else if (findDocumentDto.olderThan) {
      createdAtQuery = LessThan(findDocumentDto.olderThan);
    } else if (findDocumentDto.createdAt) {
      createdAtQuery = findDocumentDto.createdAt;
    }
    const documents = await this.documentRepository.find({
      where: {
        organizationId,
        creatorId: findDocumentDto.creatorId || undefined,
        createdAt: createdAtQuery,
      },
      relations: ['creator', 'role'],
    });
    let documentList = '';
    for (const document of documents) {
      const formattedDate = new Date(document.createdAt).toLocaleDateString(
        'es-ES',
      );
      documentList += `- ${document.name} - ${formattedDate} - ${document.creator.username} - ${document.role.name} \n`;
    }
    return documentList;
  }

  findOne(documentId: number) {
    return this.documentRepository.findOne({ where: { documentId } });
  }

  update(documentId: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${documentId} document`;
  }

  async remove(documentId: number) {
    const document = await this.findOne(documentId);
    if (!document) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }
    await tryDeleteFile(Promise.resolve({ file: document.name }));
    return this.documentRepository.remove(document);
  }

  getDocumentByName(documentName: string, organizationId: number) {
    return this.documentRepository.findOne({
      where: { name: documentName, organizationId },
    });
  }

  async getMetadata(documentName: string, organizationId: number) {
    const document = await this.getDocumentByName(documentName, organizationId);
    if (!document) {
      throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
    }
    return {
      name: document.name,
      createdAt: document.createdAt,
      creatorId: document.creator,
    };
  }
}
