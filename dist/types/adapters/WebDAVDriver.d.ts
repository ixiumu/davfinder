import type { DirEntry } from '..';
import { BaseAdapter } from './Adapter';
import type { WebDAVDriverConfig, DeleteParams, FileOperationResult, FsData, RenameParams, FileContentResult, SaveParams, TransferParams, UploaderContext, DeleteResult } from './types';
/**
 * Remote driver for handling file operations via HTTP requests
 * This driver makes WebDAV calls to backend endpoints
 */
export declare class WebDAVDriver extends BaseAdapter {
    private client;
    private storagePrefix;
    private storages;
    private config;
    constructor(config: WebDAVDriverConfig);
    private getRealPath;
    private toVuefinderPath;
    private toDirEntry;
    list(params?: {
        path?: string;
    }): Promise<FsData>;
    createFolder(params: {
        path: string;
        name: string;
    }): Promise<FileOperationResult>;
    delete(params: DeleteParams): Promise<DeleteResult>;
    rename(params: RenameParams): Promise<FileOperationResult>;
    getContent(params: {
        path: string;
    }): Promise<FileContentResult>;
    save(params: SaveParams): Promise<string>;
    getDownloadUrl(params: {
        path: string;
    }): string;
    getPreviewUrl(params: {
        path: string;
    }): string;
    copy(params: TransferParams): Promise<FileOperationResult>;
    move(params: TransferParams): Promise<FileOperationResult>;
    createFile(params: {
        path: string;
        name: string;
    }): Promise<FileOperationResult>;
    search(params: {
        path?: string;
        filter: string;
        deep?: boolean;
        size?: string;
    }): Promise<DirEntry[]>;
    configureUploader(uppy: any, context: UploaderContext): void;
    archive(_params: any): Promise<FileOperationResult>;
    unarchive(_params: any): Promise<FileOperationResult>;
}
