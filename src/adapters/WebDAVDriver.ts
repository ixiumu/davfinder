import type { DirEntry } from '..';
import { BaseAdapter } from './Adapter';
import type {
  WebDAVDriverConfig,
  DeleteParams,
  FileOperationResult,
  FsData,
  RenameParams,
  FileContentResult,
  SaveParams,
  TransferParams,
  UploaderContext,
  DeleteResult,
} from './types';
import { createClient } from 'webdav';
import type { WebDAVClient, FileStat } from 'webdav';

/**
 * Remote driver for handling file operations via HTTP requests
 * This driver makes WebDAV calls to backend endpoints
 */
export class WebDAVDriver extends BaseAdapter {
  private client: WebDAVClient;
  private storagePrefix: string;
  private storages: string[];
  private config: WebDAVDriverConfig;

  constructor(config: WebDAVDriverConfig) {
    super();
    this.config = config;
    this.client = createClient(config.url, {
      username: config.username,
      password: config.password,
    });
    this.storagePrefix = config.storagePrefix || 'dav';
    this.storages = [this.storagePrefix];
  }

  private getRealPath(vuefinderPath?: string): string {
    const { path } = this.parsePath(vuefinderPath);
    return path ? `/${path}` : '/';
  }

  private toVuefinderPath(realPath: string): string {
    const cleanPath = realPath.replace(/^\//, '');
    return cleanPath ? `${this.storagePrefix}://${cleanPath}` : `${this.storagePrefix}://`;
  }

  private toDirEntry(stat: FileStat, parentDir: string): DirEntry {
    return {
      storage: this.storagePrefix,
      dir: parentDir,
      basename: stat.basename,
      extension: stat.type === 'file' ? stat.basename.split('.').pop() || '' : '',
      path: this.toVuefinderPath(stat.filename),
      type: stat.type === 'directory' ? 'dir' : 'file',
      file_size: stat.size,
      last_modified: new Date(stat.lastmod).getTime(),
      mime_type: stat.mime || null,
      visibility: 'public',
    };
  }

  async list(params?: { path?: string }): Promise<FsData> {
    const realPath = this.getRealPath(params?.path);
    const contents = await this.client.getDirectoryContents(realPath) as FileStat[];

    const currentDir = params?.path || `${this.storagePrefix}://`;
    const files = contents.map(stat => this.toDirEntry(stat, currentDir));

    files.sort((a, b) => {
      if (a.type === 'dir' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'dir') return 1;
      return a.basename.localeCompare(b.basename, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });

    return {
      storages: this.storages,
      dirname: currentDir,
      files: files,
      read_only: false,
    };
  }

  async createFolder(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.name, 'name');
    const realPath = this.getRealPath(params.path);
    const targetPath = realPath.endsWith('/') ? `${realPath}${params.name}` : `${realPath}/${params.name}`;
    await this.client.createDirectory(targetPath);
    return (await this.list({ path: params.path })) as unknown as FileOperationResult;
  }

  async delete(params: DeleteParams): Promise<DeleteResult> {
    this.validateParam(params.items, 'items');
    this.validateParam(params.path, 'path');

    for (const item of params.items) {
      const realPath = this.getRealPath(item.path);
      await this.client.deleteFile(realPath);
    }
    const result = await this.list({ path: params.path });
    return {
      ...result,
      deleted: params.items as unknown as DirEntry[]
    } as unknown as DeleteResult;
  }

  async rename(params: RenameParams): Promise<FileOperationResult> {
    this.validateParam(params.item, 'item');
    this.validateParam(params.name, 'name');

    const oldPath = this.getRealPath(params.item);
    const dirPath = this.getRealPath(params.path);
    const newPath = dirPath.endsWith('/') ? `${dirPath}${params.name}` : `${dirPath}/${params.name}`;
    await this.client.moveFile(oldPath, newPath);
    return (await this.list({ path: params.path })) as unknown as FileOperationResult;
  }

  async getContent(params: { path: string }): Promise<FileContentResult> {
    this.validateParam(params.path, 'path');
    const realPath = this.getRealPath(params.path);
    const content = await this.client.getFileContents(realPath, { format: 'text' }) as string;
    return { content };
  }

  async save(params: SaveParams): Promise<string> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.content, 'content');
    const realPath = this.getRealPath(params.path);
    await this.client.putFileContents(realPath, params.content);
    return params.path;
  }

  getDownloadUrl(params: { path: string }): string {
    this.validateParam(params.path, 'path');
    const realPath = this.getRealPath(params.path);
    return this.client.getFileDownloadLink(realPath);
  }

  getPreviewUrl(params: { path: string }): string {
    return this.getDownloadUrl(params);
  }

  async copy(params: TransferParams): Promise<FileOperationResult> {
    this.validateParam(params.sources, 'sources');
    this.validateParam(params.destination, 'destination');

    const destDirPath = this.getRealPath(params.destination);
    for (const source of params.sources) {
      const sourcePath = this.getRealPath(source);
      const basename = sourcePath.split('/').pop() || '';
      const targetPath = destDirPath.endsWith('/') ? `${destDirPath}${basename}` : `${destDirPath}/${basename}`;

      await this.client.copyFile(sourcePath, targetPath);
    }
    return (await this.list({ path: params.path || params.destination })) as unknown as FileOperationResult;
  }

  async move(params: TransferParams): Promise<FileOperationResult> {
    this.validateParam(params.sources, 'sources');
    this.validateParam(params.destination, 'destination');

    const destDirPath = this.getRealPath(params.destination);
    for (const source of params.sources) {
      const sourcePath = this.getRealPath(source);
      const basename = sourcePath.split('/').pop() || '';
      const targetPath = destDirPath.endsWith('/') ? `${destDirPath}${basename}` : `${destDirPath}/${basename}`;

      await this.client.moveFile(sourcePath, targetPath);
    }
    return (await this.list({ path: params.path || params.destination })) as unknown as FileOperationResult;
  }

  async createFile(params: { path: string; name: string }): Promise<FileOperationResult> {
    this.validateParam(params.path, 'path');
    this.validateParam(params.name, 'name');

    const dirPath = this.getRealPath(params.path);
    const targetPath = dirPath.endsWith('/') ? `${dirPath}${params.name}` : `${dirPath}/${params.name}`;
    await this.client.putFileContents(targetPath, '');
    return (await this.list({ path: params.path })) as unknown as FileOperationResult;
  }

  async search(params: { path?: string; filter: string; deep?: boolean; size?: string }): Promise<DirEntry[]> {
    try {
      const realPath = this.getRealPath(params.path);
      const contents = await this.client.getDirectoryContents(realPath, { deep: params.deep }) as FileStat[];

      const currentDir = params.path || `${this.storagePrefix}://`;
      let files: DirEntry[] = contents.map(stat => {
        const parentPath = stat.filename.substring(0, stat.filename.lastIndexOf('/'));
        const mappedParent = parentPath ? `${this.storagePrefix}://${parentPath.replace(/^\//, '')}` : currentDir;
        return this.toDirEntry(stat, mappedParent);
      });

      const filterKw = (params.filter || '').toLowerCase();
      if (filterKw) {
        files = files.filter(f => f.basename.toLowerCase().includes(filterKw));
      }

      if (params.size && params.size !== 'all') {
        files = files.filter(f => {
          if (f.type === 'dir') return true;
          const size = f.file_size || 0;
          if (params.size === 'small') return size < 1024 * 1024;
          if (params.size === 'medium') return size >= 1024 * 1024 && size < 50 * 1024 * 1024;
          if (params.size === 'large') return size >= 50 * 1024 * 1024;
          return true;
        });
      }

      return files;
    } catch (e) {
      console.error('WebDAV Search Error:', e);
      return [];
    }
  }

  configureUploader(uppy: any, context: UploaderContext): void {
    uppy.setOptions({
      restrictions: {
        ...uppy.opts.restrictions,
        maxFileSize: 500 * 1024 * 1024
      }
    });
    uppy.on('complete', (result: any) => {
      if (result && Array.isArray(result.successful)) {
        result.successful = result.successful.map((f: any) => typeof f === 'string' ? f : f.id);
      }
    });
    uppy.addUploader(async (fileIDs: string[]) => {
      const targetVuePath = context.getTargetPath();
      const realDir = this.getRealPath(targetVuePath);

      const filesToUpload = fileIDs.map((id: string) => uppy.getFile(id));
      uppy.emit('upload-start', filesToUpload);

      const headers = this.client.getHeaders();
      const promises = fileIDs.map((fileID: string) => {
        return new Promise<void>((resolve) => {
          const file = uppy.getFile(fileID);
          uppy.emit('upload-started', file);

          const filePath = realDir.endsWith('/') ? `${realDir}${file.name}` : `${realDir}/${file.name}`;
          const encodedPath = filePath.split('/').map(encodeURIComponent).join('/');
          const fullUrl = this.config.url.replace(/\/+$/, '') + encodedPath;

          const xhr = new XMLHttpRequest();
          xhr.open('PUT', fullUrl, true);

          for (const [key, value] of Object.entries(headers)) {
            xhr.setRequestHeader(key, value as string);
          }
          xhr.setRequestHeader('Content-Type', 'application/octet-stream');

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              uppy.emit('upload-progress', file, {
                uploader: 'WebDAVDriver',
                bytesUploaded: event.loaded,
                bytesTotal: event.total
              });
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              uppy.emit('upload-success', file, { status: xhr.status, body: xhr.responseText });
            } else {
              uppy.emit('upload-error', file, new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
            }
            resolve();
          };

          xhr.onerror = () => {
            uppy.emit('upload-error', file, new Error('Network error during upload'));
            resolve();
          };

          xhr.send(file.data);
        });
      });
      await Promise.all(promises);
    });
  }

  async archive(_params: any): Promise<FileOperationResult> {
    throw new Error('Not implemented');
  }

  async unarchive(_params: any): Promise<FileOperationResult> {
    throw new Error('Not implemented');
  }
}